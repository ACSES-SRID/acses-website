import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS, DEFAULT_USERS } from "./adminData";
import { fetchApi } from "../../utils/api";

const AdminContext = createContext(null);

const editorPermissions = ["overview", "events", "executives", "announcements", "student-projects", "gallery"];

export const AdminProvider = ({ children }) => {
  // Store the selected admin user locally so refreshing the dashboard keeps the session.
  // This is client-side only; backend route protection still needs to be added.
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.adminUser);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load public announcements as lightweight admin notifications.
    const loadNotifications = async () => {
      try {
        const data = await fetchApi("/api/announcements");
        const alerts = data.filter((item) => item.status === "published" && item.visibility === "public");
        setNotifications(alerts.slice(0, 3));
      } catch (error) {
        console.error("Failed to load notifications from API:", error);
        setNotifications([]);
      }
    };
    loadNotifications();
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.adminUser, JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const login = async (username, password) => {
    let users = [];
    try {
      // Current login flow checks active users from the API. Password hashing and
      // token/session auth should replace this before production.
      const data = await fetchApi("/api/users");
      users = data.map((item) => ({ id: item._id || item.id, ...item }));
    } catch (error) {
      console.error("Failed to fetch users for login:", error);
      users = DEFAULT_USERS;
    }

    const matched = users.find((user) => user.username === username && user.password === password && user.status === "active");
    if (!matched) {
      return { success: false, message: "Invalid username or password." };
    }

    // Save last-login metadata without blocking successful login if the update fails.
    try {
      if (matched.id) {
        await fetchApi("/api/users", {
          method: "PUT",
          body: JSON.stringify({ id: matched.id, lastLogin: new Date().toISOString() }),
        });
      }
    } catch (error) {
      console.error("Failed to update last login:", error);
    }

    setCurrentUser({
      id: matched.id,
      username: matched.username,
      name: matched.name,
      email: matched.email,
      role: matched.role,
      status: matched.status,
    });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.adminUser);
    setCurrentUser(null);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 2800);
  };

  const openConfirm = ({ message, onConfirm }) => {
    setConfirm({ message, onConfirm });
  };

  const confirmAction = () => {
    if (confirm?.onConfirm) confirm.onConfirm();
    setConfirm(null);
  };

  const denyConfirm = () => setConfirm(null);

  const hasAccess = (moduleKey) => {
    // UI-level permission check. The API must also enforce these permissions.
    if (!currentUser) return false;
    if (currentUser.role === "super admin") return true;
    return editorPermissions.includes(moduleKey);
  };

  const value = useMemo(
    () => ({
      currentUser,
      login,
      logout,
      toast,
      showToast,
      confirm,
      openConfirm,
      confirmAction,
      denyConfirm,
      searchQuery,
      setSearchQuery,
      notifications,
      hasAccess,
    }),
    [currentUser, toast, confirm, searchQuery, notifications]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
