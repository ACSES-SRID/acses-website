import React, { useState } from "react";
import { AdminProvider, useAdmin } from "./AdminContext";
import AdminShell from "./AdminShell";

const AdminContent = () => {
  const { currentUser, login } = useAdmin();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    // Delegates credential checking to AdminContext so the shell only manages UI state.
    const result = await login(credentials.username.trim(), credentials.password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    setError("");
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-acses-green-900 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-acses-green-800 bg-acses-green-900 p-8 shadow-2xl shadow-acses-green-900/40">
          <h2 className="text-3xl font-semibold text-white">ACSES Admin Login</h2>
          <p className="mt-2 text-sm text-acses-yellow-100">Sign in with your admin credentials to access the dashboard.</p>
          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-white/70">Username</label>
              <input
                value={credentials.username}
                onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none"
                placeholder="superadmin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="w-full rounded-2xl bg-acses-yellow-400 px-4 py-3 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">
              Sign in
            </button>
          </form>
          <div className="mt-6 rounded-2xl bg-acses-green-900 p-4 text-sm text-acses-yellow-100">
            <p>Use the following test accounts:</p>
            <p className="mt-2">superadmin / AcseS2026!</p>
            <p>editor / Editor123!</p>
          </div>
        </div>
      </div>
    );
  }

  return <AdminShell />;
};

const Admin = () => (
  <AdminProvider>
    <AdminContent />
  </AdminProvider>
);

export default Admin;

