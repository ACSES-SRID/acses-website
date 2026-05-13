/**
 * adminUI.jsx — Shared design-system primitives for all Admin pages.
 * Import from this file to keep every page visually consistent.
 */

// ─── Layout ───────────────────────────────────────────────────────────────────

export const PageShell = ({ children }) => (
    <div className="space-y-5 max-w-[1600px] mx-auto">{children}</div>
  );
  
  export const PageHeader = ({ title, subtitle, badge, action }) => (
    <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 shadow-xl shadow-acses-green-900/20 flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-acses-yellow-100/70">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {badge !== undefined && (
          <div className="rounded-2xl bg-acses-green-800 border border-acses-green-700 px-4 py-2 text-center">
            <p className="text-xl font-bold text-acses-yellow-400 leading-none">{badge}</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-medium mt-0.5">Total</p>
          </div>
        )}
        {action}
      </div>
    </div>
  );
  
  export const TwoColLayout = ({ children }) => (
    <div className="grid gap-5 xl:grid-cols-[1fr_380px]">{children}</div>
  );
  
  // ─── Panel (left list panel) ───────────────────────────────────────────────────
  
  export const Panel = ({ children, toolbar }) => (
    <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 overflow-hidden shadow-xl shadow-acses-green-900/20">
      {toolbar && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-acses-green-800">
          {toolbar}
        </div>
      )}
      {children}
    </div>
  );
  
  export const PanelEmpty = ({ message = "No items found.", hint }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-3 w-10 h-10 rounded-full bg-acses-green-800 flex items-center justify-center">
        <svg className="w-5 h-5 text-acses-yellow-200" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M4.5 19.5l15-15" />
        </svg>
      </div>
      <p className="text-sm font-medium text-acses-yellow-100">{message}</p>
      {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
    </div>
  );
  
  // ─── Form Panel (right sticky form) ──────────────────────────────────────────
  
  export const FormPanel = ({ title, icon, children }) => (
    <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 shadow-xl shadow-acses-green-900/20 overflow-hidden h-fit xl:sticky xl:top-6">
      <div className="px-6 py-4 border-b border-acses-green-800 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-acses-yellow-400 flex-shrink-0" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-acses-yellow-300">{title}</h2>
        {icon && <div className="ml-auto p-1.5 rounded-xl bg-acses-yellow-400 text-acses-green-900">{icon}</div>}
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
  
  export const FormActions = ({ editingId, onCancel, onSubmit, submitLabel, cancelLabel = "Cancel" }) => (
    <div className="pt-1 flex gap-3">
      {editingId && (
        <button
          onClick={onCancel}
          className="flex-1 rounded-2xl border border-acses-green-700 px-4 py-3 text-sm font-medium text-white/70 hover:bg-acses-green-800 transition-colors"
        >
          {cancelLabel}
        </button>
      )}
      <button
        onClick={onSubmit}
        className="flex-1 rounded-2xl bg-acses-yellow-400 px-4 py-3 text-sm font-bold text-acses-green-900 hover:bg-acses-yellow-300 transition-colors"
      >
        {submitLabel}
      </button>
    </div>
  );
  
  // ─── Row card (list items) ─────────────────────────────────────────────────────
  
  export const CardRow = ({ isActive, children }) => (
    <div className={`group px-6 py-5 border-b border-acses-green-800 last:border-b-0 transition-colors ${isActive ? "bg-acses-green-800/50" : "hover:bg-acses-green-800/30"}`}>
      {children}
    </div>
  );
  
  export const RowActions = ({ onEdit, onDelete, editLabel = "Edit", deleteLabel = "Delete" }) => (
    <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={onEdit}
        className="rounded-xl bg-acses-green-800 border border-acses-green-700 px-3 py-1.5 text-xs font-semibold text-acses-yellow-300 hover:bg-acses-green-700 transition-colors"
      >
        {editLabel}
      </button>
      <button
        onClick={onDelete}
        className="rounded-xl bg-red-900/40 border border-red-800/50 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-800/60 transition-colors"
      >
        {deleteLabel}
      </button>
    </div>
  );
  
  // ─── Status / tag pills ────────────────────────────────────────────────────────
  
  export const Pill = ({ label, variant = "muted" }) => {
    const variants = {
      active: "bg-acses-yellow-400/20 text-acses-yellow-300 border-acses-yellow-400/30",
      muted: "bg-white/10 text-white/40 border-white/10",
      green: "bg-acses-green-800 text-acses-yellow-200 border-acses-green-700",
      red: "bg-red-900/40 text-red-300 border-red-800/40",
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${variants[variant]}`}>
        {label}
      </span>
    );
  };
  
  // ─── Form inputs ───────────────────────────────────────────────────────────────
  
  const inputBase = "w-full rounded-2xl border border-acses-green-700 bg-acses-green-800/50 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-acses-yellow-400/50 focus:ring-1 focus:ring-acses-yellow-400/20 transition-colors";
  
  const FieldLabel = ({ label }) => (
    <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">{label}</label>
  );
  
  export const Field = ({ label, value, onChange, type = "text", placeholder }) => (
    <div>
      <FieldLabel label={label} />
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputBase} />
    </div>
  );
  
  export const TextArea = ({ label, value, onChange, placeholder, rows = 4 }) => (
    <div>
      <FieldLabel label={label} />
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${inputBase} resize-none`} />
    </div>
  );
  
  export const Select = ({ label, value, options, onChange }) => (
    <div>
      <FieldLabel label={label} />
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`${inputBase} capitalize`}>
        {options.map((o) => {
          const val = typeof o === "object" ? o.value : o;
          const lbl = typeof o === "object" ? o.label : o;
          return <option key={val} value={val} className="bg-acses-green-900 capitalize">{lbl}</option>;
        })}
      </select>
    </div>
  );
  
  // ─── Export button ─────────────────────────────────────────────────────────────
  
  export const ExportBtn = ({ onClick }) => (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-2xl bg-acses-yellow-400 px-4 py-2 text-xs font-bold text-acses-green-900 hover:bg-acses-yellow-300 transition-colors"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
      </svg>
      Export CSV
    </button>
  );
  
  // ─── Blocked access ────────────────────────────────────────────────────────────
  
  export const BlockedAccess = ({ message = "Your role does not have permission to access this section." }) => (
    <div className="rounded-3xl border border-red-800 bg-acses-green-900 p-8 text-center">
      <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-900/40 flex items-center justify-center">
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
      <p className="text-base font-semibold text-white">Access Denied</p>
      <p className="mt-1.5 text-sm text-acses-yellow-100/60">{message}</p>
    </div>
  );
  
  // ─── Pagination ────────────────────────────────────────────────────────────────
  
  export const Pagination = ({ count, pageIndex, setPageIndex }) => {
    if (count <= 1) return null;
    return (
      <div className="flex items-center justify-center gap-3 px-6 py-4 border-t border-acses-green-800">
        <button
          disabled={pageIndex === 0}
          onClick={() => setPageIndex((p) => p - 1)}
          className="p-2 rounded-xl bg-acses-green-800 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-xs font-medium text-white/40">Page {pageIndex + 1} of {count}</span>
        <button
          disabled={pageIndex === count - 1}
          onClick={() => setPageIndex((p) => p + 1)}
          className="p-2 rounded-xl bg-acses-green-800 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    );
  };
  
  // ─── Tab bar ───────────────────────────────────────────────────────────────────
  
  export const TabBar = ({ tabs, active, onChange }) => (
    <div className="flex p-1.5 bg-acses-green-900 border border-acses-green-800 rounded-2xl w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${active === tab.value ? "bg-acses-yellow-400 text-acses-green-950 shadow-md" : "text-white/50 hover:text-white"}`}
        >
          {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );