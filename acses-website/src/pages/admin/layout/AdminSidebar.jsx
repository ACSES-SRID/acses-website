import AdminNavLinks from "./AdminNavLinks";

/**
 * Persistent desktop sidebar: same links as the mobile drawer (see AdminNavLinks).
 */
export default function AdminSidebar({ currentUser, hasAccess, onLogout }) {
  return (
    <aside className="hidden lg:flex lg:w-72 xl:w-80 flex-col border-r border-acses-green-800 bg-acses-green-900 p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-2xl bg-acses-yellow-400 flex items-center justify-center text-acses-green-900 font-bold">A</div>
          <div>
            <p className="text-sm text-acses-yellow-100">ACSES Admin</p>
            <p className="text-lg font-semibold text-white">{currentUser?.name || "Administrator"}</p>
          </div>
        </div>
        <p className="text-xs uppercase tracking-[.2em] text-acses-yellow-200">Role</p>
        <p className="text-sm font-medium text-acses-yellow-300 capitalize">{currentUser?.role}</p>
      </div>

      <nav className="flex-1 space-y-2">
        <AdminNavLinks hasAccess={hasAccess} variant="desktop" />
      </nav>

      <div className="mt-auto pt-6 border-t border-acses-green-800">
        <button
          type="button"
          onClick={onLogout}
          className="w-full rounded-xl bg-acses-green-800 px-4 py-3 text-left text-sm font-medium text-white/80 transition hover:bg-acses-green-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
