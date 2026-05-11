import React, { useEffect, useState } from "react";
import { useAdmin } from "./AdminContext";
import { exportToCsv, formatDate } from "./adminUtils";
import { fetchApi } from "../../utils/api";

const AdminAnnouncements = () => {
  const { searchQuery, showToast, openConfirm, currentUser, hasAccess } = useAdmin();
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", body: "", date: "", visibility: "public", status: "draft" });

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const data = await fetchApi("/api/announcements");
        const normalized = data.map((item) => ({
          id: item._id || item.id,
          ...item,
        }));
        setAnnouncements(normalized);
      } catch (error) {
        console.error("Failed to load announcements from API:", error);
        setAnnouncements([]);
      }
    };
    loadAnnouncements();
  }, []);

  const saveAnnouncements = (updated) => {
    setAnnouncements(updated);
  };

  const filtered = announcements.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (!hasAccess("announcements")) {
    return <BlockedAccess />;
  }

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
        await fetchApi("/api/announcements", {
          method: "PUT",
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        saveAnnouncements(announcements.map((item) => (item.id === editingId ? { ...item, ...payload, id: editingId } : item)));
        showToast("Announcement updated.");
      } else {
        const result = await fetchApi("/api/announcements", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        saveAnnouncements([...announcements, { ...payload, id: result.id || `news-${Date.now()}` }]);
        showToast("Announcement posted.");
      }
    } catch (error) {
      console.error("API save failed:", error);
      showToast("Saved locally (offline mode).", "warning");
      if (editingId) {
        saveAnnouncements(announcements.map((item) => (item.id === editingId ? payload : item)));
      } else {
        saveAnnouncements([...announcements, { ...payload, id: `news-${Date.now()}` }]);
      }
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
          await fetchApi("/api/announcements", {
            method: "DELETE",
            body: JSON.stringify({ id }),
          });
        } catch (error) {
          console.error("API delete failed:", error);
        }
        saveAnnouncements(announcements.filter((item) => item.id !== id));
        showToast("Announcement deleted.");
      },
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Announcements / News" subtitle="Post and manage news, draft announcements, and member visibility." />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <button onClick={() => exportToCsv("acses-announcements.csv", announcements)} className="rounded-2xl bg-acses-yellow-400 px-4 py-2 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-acses-green-800 bg-acses-green-900">
            <table className="min-w-full border-collapse text-left text-sm text-white/70">
              <thead className="bg-acses-green-900 text-acses-yellow-100">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Visibility</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-t border-acses-green-800 last:border-b last:border-acses-green-800 hover:bg-acses-green-900/60">
                    <td className="px-4 py-3 text-white">{item.title}</td>
                    <td className="px-4 py-3">{formatDate(item.date)}</td>
                    <td className="px-4 py-3 capitalize">{item.visibility}</td>
                    <td className="px-4 py-3 capitalize">{item.status}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button onClick={() => handleEdit(item)} className="rounded-2xl bg-acses-green-800 px-3 py-2 text-xs text-acses-yellow-300 hover:bg-acses-green-700">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="rounded-2xl bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-acses-yellow-200">No announcements found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <h2 className="text-lg font-semibold text-white">{editingId ? "Edit announcement" : "Add announcement"}</h2>
          <div className="mt-5 space-y-4">
            <Field label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
            <TextArea label="Body" value={form.body} onChange={(value) => setForm({ ...form, body: value })} />
            <Field label="Date" type="date" value={form.date} onChange={(value) => setForm({ ...form, date: value })} />
            <Select label="Visibility" value={form.visibility} options={["public", "members-only"]} onChange={(value) => setForm({ ...form, visibility: value })} />
            <Select label="Status" value={form.status} options={["draft", "published"]} onChange={(value) => setForm({ ...form, status: value })} />
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              {editingId && <button onClick={() => { setEditingId(null); setForm({ title: "", body: "", date: "", visibility: "public", status: "draft" }); }} className="rounded-2xl border border-acses-green-800 px-4 py-3 text-sm text-white/80 hover:bg-acses-green-800">Cancel</button>}
              <button onClick={handleSubmit} className="rounded-2xl bg-acses-yellow-400 px-4 py-3 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">{editingId ? "Save" : "Publish"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlockedAccess = () => (
  <div className="rounded-3xl border border-red-700 bg-acses-green-900 p-6 text-white/80">
    <p className="text-lg font-semibold">Access denied</p>
    <p className="mt-2 text-sm text-acses-yellow-100">Your role does not have permission to manage announcements.</p>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 shadow-xl shadow-acses-green-900/20">
    <h1 className="text-2xl font-semibold text-white">{title}</h1>
    <p className="mt-2 text-sm text-acses-yellow-100">{subtitle}</p>
  </div>
);

const Field = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none" />
  </div>
);

const TextArea = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <textarea rows="5" value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none" />
  </div>
);

const Select = ({ label, value, options, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none">
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default AdminAnnouncements;


