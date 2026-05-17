import AdminNavLinks from "./AdminNavLinks";

export default function AdminSidebar({ currentUser, hasAccess, onLogout, isCollapsed, setIsCollapsed }) {
  return (
    <aside 
      className={`hidden lg:flex flex-col border-r border-acses-green-800 bg-acses-green-900 transition-all duration-300 ease-in-out fixed top-0 left-0 h-screen z-40 ${
        isCollapsed ? "w-20" : "w-72 xl:w-80"
      }`}
    >
      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-12 flex h-6 w-6 items-center justify-center rounded-full bg-acses-yellow-400 text-acses-green-900 shadow-md hover:scale-110 transition-transform"
      >
        {isCollapsed ? "❯" : "❮"}
      </button>

      <div className={`p-6 mb-6 transition-all duration-300 ${isCollapsed ? "px-4" : ""}`}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-acses-yellow-400 flex items-center justify-center text-acses-green-900 font-bold text-lg">
            A
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-[10px] uppercase tracking-widest text-acses-yellow-200 leading-none mb-1">Portal</p>
              <p className="text-sm font-bold text-white truncate">{currentUser?.name || "Admin"}</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 custom-scrollbar">
        <AdminNavLinks hasAccess={hasAccess} variant="desktop" isCollapsed={isCollapsed} />
      </nav>

      <div className="p-4 border-t border-acses-green-800">
        <button
          type="button"
          onClick={onLogout}
          className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-red-900/20 hover:text-red-400 ${isCollapsed ? "justify-center px-0" : ""}`}
        >
          <span className="text-xl">🚪</span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}