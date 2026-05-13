import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS } from "../lib/adminData";
import { fetchApi, setAdminToken, clearAdminToken, getAdminToken } from "../../../utils/api";

const AdminContext = createContext(null);

const editorPermissions = ["overview", "events", "executives", "announcements", "student-projects", "gallery", "resources", "store", "users", "home-editor"];

export const AdminProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.adminUser);
    return (stored && getAdminToken()) ? JSON.parse(stored) : null;
  });

  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const login = async (username, password) => {
    try {
      const data = await fetchApi("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      setAdminToken(data.token);
      const user = { id: data.user._id, name: data.user.name, role: data.user.role };
      setCurrentUser(user);
      localStorage.setItem(STORAGE_KEYS.adminUser, JSON.stringify(user));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    clearAdminToken();
    localStorage.removeItem(STORAGE_KEYS.adminUser);
    setCurrentUser(null);
  };

  const hasAccess = (moduleKey) => {
    if (currentUser?.role === "super admin") return true;
    return editorPermissions.includes(moduleKey);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const value = useMemo(() => ({
    currentUser, login, logout, toast, showToast, confirm, 
    openConfirm: setConfirm, confirmAction: () => { confirm?.onConfirm(); setConfirm(null); },
    denyConfirm: () => setConfirm(null), searchQuery, setSearchQuery, hasAccess
  }), [currentUser, toast, confirm, searchQuery]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => useContext(AdminContext);