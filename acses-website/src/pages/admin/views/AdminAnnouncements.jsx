import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { exportToCsv, formatDate } from "../lib/adminUtils";
import { fetchApi } from "../../../utils/api";

const AdminAnnouncements = () => {
  const { searchQuery, showToast, openConfirm, currentUser, hasAccess } = useAdmin();
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", body: "", date: "", visibility: "public", status: "draft" });

  const loadAnnouncements = async () => {
    try {
      const data = await fetchApi("/api/announcements");
      const list = Array.isArray(data) ? data : [];
      const normalized = list.map((item) => ({
        id: item._id || item.id,
        ...item,
      }));
      setAnnouncements(normalized);
    } catch (error) {
      console.error("Failed to load announcements from API:", error);
      setAnnouncements([]);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const saveAnnouncements = (updated) => setAnnouncements(updated);

  const filtered = announcements.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.author || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!hasAccess("announcements")) return <BlockedAccess />;

  const handleSubmit = async () => {
    if (!form.title || !form.body || !form.date) {
      showToast("Title, date and body are required.", "error");
      return;
    }
    const payload = {
      title: form.title,
      body: form.body,
      date: form.date,
      author: currentUser?.name || "Admin",
      visibility: form.visibility,
      status: form.status,
    };

    try {
      if (editingId) {
        await fetchApi(`/api/announcements/${editingId}`, { method: "PUT", body: JSON.stringify(payload), auth: true });
        saveAnnouncements(announcements.map((item) => (item.id === editingId ? { ...item, ...payload, id: editingId } : item)));
        showToast("Announcement updated.");
      } else {
        const result = await fetchApi("/api/announcements", { method: "POST", body: JSON.stringify(payload), auth: true });
        const newId = result?.id || result?._id;
        saveAnnouncements([...announcements, { ...payload, id: newId || `news-${Date.now()}` }]);
        showToast("Announcement posted.");
      }
    } catch (error) {
      console.error("API save failed:", error);
      showToast(error instanceof Error ? error.message : "Failed to save announcement.", "error");
    }

    setEditingId(null);
    setForm({ title: "", body: "", date: "", visibility: "public", status: "draft" });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({ title: item.title, body: item.body, date: item.date, visibility: item.visibility, status: item.status });
  };

  const handleDelete = (id) => {
    openConfirm({
      message: "Remove this announcement?",
      onConfirm: async () => {
        try {
          await fetchApi(`/api/announcements/${id}`, { method: "DELETE", auth: true });
          saveAnnouncements(announcements.filter((item) => item.id !== id));
          showToast("Announcement deleted.");
        } catch (error) {
          showToast(error instanceof Error ? error.message : "Delete failed.", "error");
        }
      },
    });
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <SectionHeader
        title="Announcements"
        subtitle="Post and manage news, draft announcements, and member visibility."
        count={announcements.length}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        {/* ── Left: Announcement Cards ── */}
        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 overflow-hidden shadow-xl shadow-acses-green-900/20">
          {/* Card toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-acses-green-800">
            <p className="text-sm font-medium text-acses-yellow-100">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </p>
            <button
              onClick={() => exportToCsv("acses-announcements.csv", announcements)}
              className="inline-flex items-center gap-2 rounded-2xl bg-acses-yellow-400 px-4 py-2 text-xs font-bold text-acses-green-900 hover:bg-acses-yellow-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export CSV
            </button>
          </div>

          {/* Announcement card list */}
          <div className="divide-y divide-acses-green-800">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-3 w-10 h-10 rounded-full bg-acses-green-800 flex items-center justify-center">
                  <svg className="w-5 h-5 text-acses-yellow-200" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-acses-yellow-100">No announcements found</p>
                <p className="mt-1 text-xs text-white/40">Add one using the form on the right.</p>
              </div>
            ) : (
              filtered.map((item) => (
                <AnnouncementCard
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isEditing={editingId === item.id}
                />
              ))
            )}
          </div>
        </div>

        {/* ── Right: Form Panel ── */}
        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 shadow-xl shadow-acses-green-900/20 overflow-hidden">
          {/* Form header stripe */}
          <div className="px-6 py-4 border-b border-acses-green-800 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-acses-yellow-400" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-acses-yellow-300">
              {editingId ? "Edit Announcement" : "New Announcement"}
            </h2>
          </div>

          <div className="p-6 space-y-4">
            <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="Enter announcement title…" />
            <TextArea label="Body" value={form.body} onChange={(v) => setForm({ ...form, body: v })} placeholder="Write the full announcement here…" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
              <Select label="Visibility" value={form.visibility} options={["public", "members-only"]} onChange={(v) => setForm({ ...form, visibility: v })} />
            </div>
            <Select label="Status" value={form.status} options={["draft", "published"]} onChange={(v) => setForm({ ...form, status: v })} />

            {/* Status hint */}
            <div className="rounded-2xl bg-acses-green-800/60 border border-acses-green-700 px-4 py-3 flex items-start gap-3">
              <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${form.status === "published" ? "bg-acses-yellow-400" : "bg-white/30"}`} />
              <p className="text-xs text-white/50 leading-relaxed">
                {form.status === "published"
                  ? `Visible to ${form.visibility === "public" ? "everyone" : "members only"} once saved.`
                  : "This announcement is saved as a draft and won't be shown publicly."}
              </p>
            </div>

            <div className="pt-1 flex gap-3">
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setForm({ title: "", body: "", date: "", visibility: "public", status: "draft" });
                  }}
                  className="flex-1 rounded-2xl border border-acses-green-700 px-4 py-3 text-sm font-medium text-white/70 hover:bg-acses-green-800 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-2xl bg-acses-yellow-400 px-4 py-3 text-sm font-bold text-acses-green-900 hover:bg-acses-yellow-300 transition-colors"
              >
                {editingId ? "Save Changes" : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Announcement Card ── */
const AnnouncementCard = ({ item, onEdit, onDelete, isEditing }) => (
  <div className={`group px-6 py-5 transition-colors ${isEditing ? "bg-acses-green-800/50" : "hover:bg-acses-green-800/30"}`}>
    <div className="flex items-start justify-between gap-4">
      {/* Left: content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            item.status === "published"
              ? "bg-acses-yellow-400/20 text-acses-yellow-300 border border-acses-yellow-400/30"
              : "bg-white/10 text-white/40 border border-white/10"
          }`}>
            {item.status}
          </span>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-acses-green-800 text-white/50 border border-acses-green-700 capitalize">
            {item.visibility}
          </span>
        </div>
        <p className="text-sm font-semibold text-white truncate">{item.title}</p>
        <p className="mt-0.5 text-xs text-white/40 line-clamp-1">{item.body}</p>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-white/30">
          <span>{formatDate(item.date)}</span>
          {item.author && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/20 inline-block" />
              <span>{item.author}</span>
            </>
          )}
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(item)}
          className="rounded-xl bg-acses-green-800 border border-acses-green-700 px-3 py-1.5 text-xs font-semibold text-acses-yellow-300 hover:bg-acses-green-700 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="rounded-xl bg-red-900/40 border border-red-800/50 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-800/60 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

/* ── Supporting Components ── */

const BlockedAccess = () => (
  <div className="rounded-3xl border border-red-800 bg-acses-green-900 p-8 text-center">
    <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-900/40 flex items-center justify-center">
      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    </div>
    <p className="text-base font-semibold text-white">Access Denied</p>
    <p className="mt-1.5 text-sm text-acses-yellow-100/60">Your role does not have permission to manage announcements.</p>
  </div>
);

const SectionHeader = ({ title, subtitle, count }) => (
  <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 shadow-xl shadow-acses-green-900/20 flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="mt-1 text-sm text-acses-yellow-100/70">{subtitle}</p>
    </div>
    {count !== undefined && (
      <div className="flex-shrink-0 rounded-2xl bg-acses-green-800 border border-acses-green-700 px-4 py-2 text-center">
        <p className="text-xl font-bold text-acses-yellow-400">{count}</p>
        <p className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Total</p>
      </div>
    )}
  </div>
);

const Field = ({ label, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-acses-green-700 bg-acses-green-800/50 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-acses-yellow-400/50 focus:ring-1 focus:ring-acses-yellow-400/20 transition-colors"
    />
  </div>
);

const TextArea = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">{label}</label>
    <textarea
      rows="5"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-acses-green-700 bg-acses-green-800/50 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-acses-yellow-400/50 focus:ring-1 focus:ring-acses-yellow-400/20 transition-colors resize-none"
    />
  </div>
);

const Select = ({ label, value, options, onChange }) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-acses-green-700 bg-acses-green-800/50 px-4 py-3 text-sm text-white outline-none focus:border-acses-yellow-400/50 focus:ring-1 focus:ring-acses-yellow-400/20 transition-colors capitalize"
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-acses-green-900 capitalize">
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default AdminAnnouncements;