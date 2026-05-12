import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import AdminSidebar from "./AdminSidebar";
import AdminNavLinks from "./AdminNavLinks";

const AdminShell = () => {
  const { currentUser, logout, searchQuery, setSearchQuery, notifications, toast, confirm, confirmAction, denyConfirm, hasAccess } = useAdmin();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="admin-shell flex flex-col lg:flex-row min-h-screen bg-acses-green-900 text-white">
      <AdminSidebar currentUser={currentUser} hasAccess={hasAccess} onLogout={logout} />

      <div className="flex-1 lg:ml-72 xl:ml-80">
        <header className="sticky top-0 z-30 border-b border-acses-green-800 bg-acses-green-900/95 backdrop-blur px-4 py-4 shadow-sm shadow-acses-green-900/20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center justify-center rounded-xl border border-acses-green-800 bg-acses-green-900 px-3 py-2 text-white/80 lg:hidden"
                onClick={() => setMobileMenu((open) => !open)}
                aria-label="Toggle navigation"
              >
                ☰
              </button>
              <div>
                <p className="text-xs uppercase tracking-[.25em] text-acses-yellow-200">Admin Dashboard</p>
                <h1 className="text-2xl font-semibold text-white">Welcome back, {currentUser?.name.split(" ")[0]}.</h1>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-[320px]">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, news, projects..."
                  className="w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 py-3 pl-4 pr-12 text-sm text-white outline-none focus:border-amber-400"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-acses-yellow-200">🔎</span>
              </div>

              <div className="flex items-center gap-3">
                <button type="button" className="relative rounded-2xl bg-acses-green-900 px-4 py-3 text-white/80 hover:bg-acses-green-800">
                  🔔
                  {notifications.length > 0 && (
                    <div className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-acses-yellow-400 px-1.5 text-[0.65rem] font-semibold text-acses-green-950">
                      {notifications.length}
                    </div>
                  )}
                </button>
                <div className="flex items-center gap-3 rounded-2xl bg-acses-green-900 px-4 py-3 text-white/80">
                  <div className="h-10 w-10 rounded-full bg-acses-yellow-400 text-acses-green-950 flex items-center justify-center font-bold">{currentUser?.name.charAt(0)}</div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-white">{currentUser?.name}</p>
                    <p className="text-xs text-acses-yellow-200">{currentUser?.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {mobileMenu && (
            <div className="mt-4 rounded-2xl border border-acses-green-800 bg-acses-green-900 p-4 lg:hidden">
              <nav className="space-y-2">
                <AdminNavLinks hasAccess={hasAccess} variant="mobile" onItemClick={() => setMobileMenu(false)} />
              </nav>
            </div>
          )}
        </header>

        <main className="px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-acses-green-800 bg-acses-green-900 px-5 py-4 shadow-xl shadow-acses-green-900/50">
          <p className="mt-1 text-sm text-white/70">{toast.message}</p>
        </div>
      )}

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-acses-green-900/80 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-white">Confirm delete</h2>
            <p className="mt-3 text-sm text-white/70">{confirm.message}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button onClick={denyConfirm} className="rounded-2xl border border-acses-green-800 bg-acses-green-800 px-5 py-3 text-sm text-white/80 hover:bg-acses-green-700">
                Cancel
              </button>
              <button onClick={confirmAction} className="rounded-2xl bg-acses-yellow-400 px-5 py-3 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminShell;