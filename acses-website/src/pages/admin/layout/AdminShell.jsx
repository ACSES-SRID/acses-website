import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import AdminSidebar from "./AdminSidebar";
import AdminNavLinks from "./AdminNavLinks";

const AdminShell = () => {
  const { currentUser, logout, searchQuery, setSearchQuery, toast, confirm, confirmAction, denyConfirm, hasAccess } = useAdmin();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Local state for instant UI feedback, while the Context updates on debounce
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 400); // 400ms debounce
    return () => clearTimeout(handler);
  }, [localSearch, setSearchQuery]);

  return (
    <div className="admin-shell flex flex-col lg:flex-row min-h-screen bg-acses-green-900 text-white">
      <AdminSidebar 
        currentUser={currentUser} 
        hasAccess={hasAccess} 
        onLogout={logout} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? "lg:ml-20" : "lg:ml-72 xl:ml-80"}`}>
        <header className="sticky top-0 z-30 border-b border-acses-green-800 bg-acses-green-900/80 backdrop-blur-md px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-acses-green-800 bg-acses-green-900 text-white lg:hidden"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                {mobileMenu ? "✕" : "☰"}
              </button>
              <div>
                <h1 className="text-lg font-bold text-white hidden sm:block">
                  Welcome {currentUser?.name} to the <br />ACSES Admin Dashboard Portal
                </h1>
              </div>
            </div>

            <div className="relative w-full max-w-md ml-4">
              <input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search resources, users, projects..."
                className="w-full rounded-2xl border border-acses-green-800 bg-acses-green-950/50 py-2.5 pl-4 pr-10 text-sm text-white placeholder:text-white/20 outline-none focus:border-acses-yellow-400/50 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg grayscale opacity-50">🔍</span>
            </div>
          </div>

          {mobileMenu && (
            <div className="mt-4 space-y-2 rounded-2xl border border-acses-green-800 bg-acses-green-900 p-3 lg:hidden shadow-2xl">
              <AdminNavLinks hasAccess={hasAccess} variant="mobile" onItemClick={() => setMobileMenu(false)} />
            </div>
          )}
        </header>

        <main className="flex-1 px-4 py-8 lg:px-10">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>

      {/* Shared Overlays */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[100] animate-slide-up">
          <div className="rounded-2xl border border-acses-green-700 bg-acses-green-900 px-6 py-4 shadow-2xl flex items-center gap-3">
            <div className={`h-2 w-2 rounded-full ${toast.type === 'error' ? 'bg-red-500' : 'bg-acses-yellow-400'}`} />
            <p className="text-sm font-medium text-white">{toast.message}</p>
          </div>
        </div>
      )}

      {confirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-acses-green-950/90 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-acses-green-800 bg-acses-green-900 p-8 shadow-2xl scale-in">
            <h2 className="text-2xl font-bold text-white">Are you sure?</h2>
            <p className="mt-3 text-white/60 leading-relaxed">{confirm.message}</p>
            <div className="mt-8 flex gap-3">
              <button onClick={denyConfirm} className="flex-1 rounded-2xl border border-acses-green-800 py-3 font-semibold hover:bg-white/5 transition-colors">Cancel</button>
              <button onClick={confirmAction} className="flex-1 rounded-2xl bg-red-600 py-3 font-semibold text-white hover:bg-red-500 transition-colors">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminShell;