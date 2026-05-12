import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS } from "../lib/adminData";
import { fetchApi, setAdminToken, clearAdminToken, getAdminToken } from "../../../utils/api";

const AdminContext = createContext(null);

const editorPermissions = [
  "overview",
  "events",
  "executives",
  "announcements",
  "student-projects",
  "gallery",
  "resources",
  "store",
];

const mapApiUser = (u) => ({
  id: u._id || u.id,
  username: u.username,
  name: u.name,
  email: u.email,
  role: u.role,
  status: u.status,
});

// eslint-disable-next-line react/prop-types -- provider shell
export const AdminProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.adminUser);
      if (!stored) return null;
      if (!getAdminToken()) {
        localStorage.removeItem(STORAGE_KEYS.adminUser);
        return null;
      }
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchApi("/api/announcements");
        const list = Array.isArray(data) ? data : [];
        const alerts = list.filter((item) => item.status === "published" && item.visibility === "public");
        setNotifications(alerts.slice(0, 3));
      } catch (error) {
        console.error("Failed to load notifications from API:", error);
        setNotifications([]);
      }
    };
    loadNotifications();
  }, []);

  useEffect(() => {
    const onSessionExpired = () => {
      localStorage.removeItem(STORAGE_KEYS.adminUser);
      setCurrentUser(null);
    };
    window.addEventListener("acses-admin-session-expired", onSessionExpired);
    return () => window.removeEventListener("acses-admin-session-expired", onSessionExpired);
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.adminUser, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.adminUser);
    }
  }, [currentUser]);

  const login = async (username, password) => {
    try {
      const data = await fetchApi("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      if (!data?.token || !data?.user) {
        return { success: false, message: "Unexpected response from server." };
      }
      setAdminToken(data.token);
      setCurrentUser(mapApiUser(data.user));
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed.";
      if (message.includes("401") || /invalid|unauthorized|credentials/i.test(message)) {
        return { success: false, message: "Invalid username or password." };
      }
      return { success: false, message };
    }
  };

  const logout = () => {
    clearAdminToken();
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
