import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { exportToCsv } from "../lib/adminUtils";
import { fetchApi } from "../../../utils/api";

const AdminExecutives = () => {
  const { searchQuery, showToast, openConfirm, hasAccess } = useAdmin();
  const [leaders, setLeaders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", position: "", termYear: "", photo: "", bio: "", linkedin: "", twitter: "", instagram: "" });

  useEffect(() => {
    const loadExecutives = async () => {
      try {
        const data = await fetchApi("/api/executives");
        const normalized = data.map((item) => ({
          id: item._id || item.id,
          ...item,
        }));
        setLeaders(normalized);
      } catch (error) {
        console.error("Failed to load executives from API:", error);
        setLeaders([]);
      }
    };
    loadExecutives();
  }, []);

  const saveLeaders = (updated) => {
    setLeaders(updated);
  };

  const filtered = leaders.filter((leader) => {
    return (
      leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.termYear.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (!hasAccess("executives")) {
    return <BlockedAccess />;
  }

  const handleSubmit = async () => {
    if (!form.name || !form.position || !form.termYear) {
      showToast("Name, position and term year are required.", "error");
      return;
    }
    const payload = {
      name: form.name,
      position: form.position,
      termYear: form.termYear,
      photo: form.photo,
      bio: form.bio,
      social: { linkedin: form.linkedin, twitter: form.twitter, instagram: form.instagram },
    };
    
    try {
      if (editingId) {
        await fetchApi("/api/executives", {
          method: "PUT",
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        saveLeaders(leaders.map((item) => (item.id === editingId ? { ...item, ...payload, id: editingId } : item)));
        showToast("Executive updated.");
      } else {
        const result = await fetchApi("/api/executives", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        saveLeaders([...leaders, { ...payload, id: result.id || `exec-${Date.now()}` }]);
        showToast("Executive added.");
      }
    } catch (error) {
      console.error("API save failed:", error);
      showToast("Saved locally (offline mode).", "warning");
      if (editingId) {
        saveLeaders(leaders.map((item) => (item.id === editingId ? payload : item)));
      } else {
        saveLeaders([...leaders, { ...payload, id: `exec-${Date.now()}` }]);
      }
    }
    
    setEditingId(null);
    setForm({ name: "", position: "", termYear: "", photo: "", bio: "", linkedin: "", twitter: "", instagram: "" });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      position: item.position,
      termYear: item.termYear,
      photo: item.photo,
      bio: item.bio,
      linkedin: item.social.linkedin || "",
      twitter: item.social.twitter || "",
      instagram: item.social.instagram || "",
    });
  };

  const handleDelete = (id) => {
    openConfirm({
      message: "Delete this executive profile?",
      onConfirm: async () => {
        try {
          await fetchApi("/api/executives", {
            method: "DELETE",
            body: JSON.stringify({ id }),
          });
        } catch (error) {
          console.error("API delete failed:", error);
        }
        saveLeaders(leaders.filter((item) => item.id !== id));
        showToast("Executive removed.");
      },
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Executives / Officers" subtitle="Manage association leadership, photos, bios, and term years." />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <button onClick={() => exportToCsv("acses-executives.csv", leaders)} className="rounded-2xl bg-acses-yellow-400 px-4 py-2 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-acses-green-800 bg-acses-green-900">
            <table className="min-w-full border-collapse text-left text-sm text-white/70">
              <thead className="bg-acses-green-900 text-acses-yellow-100">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Position</th>
                  <th className="px-4 py-3">Term</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((leader) => (
                  <tr key={leader.id} className="border-t border-acses-green-800 last:border-b last:border-acses-green-800 hover:bg-acses-green-900/60">
                    <td className="px-4 py-3 text-white">{leader.name}</td>
                    <td className="px-4 py-3">{leader.position}</td>
                    <td className="px-4 py-3">{leader.termYear}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button onClick={() => handleEdit(leader)} className="rounded-2xl bg-acses-green-800 px-3 py-2 text-xs text-acses-yellow-300 hover:bg-acses-green-700">Edit</button>
                      <button onClick={() => handleDelete(leader.id)} className="rounded-2xl bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-acses-yellow-200">No executives match your search yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <h2 className="text-lg font-semibold text-white">{editingId ? "Edit officer" : "Add new officer"}</h2>
          <div className="mt-5 space-y-4">
            <Field label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
            <Field label="Position" value={form.position} onChange={(value) => setForm({ ...form, position: value })} />
            <Field label="Term year" value={form.termYear} onChange={(value) => setForm({ ...form, termYear: value })} />
            <Field label="Photo URL" value={form.photo} onChange={(value) => setForm({ ...form, photo: value })} />
            <TextArea label="Bio" value={form.bio} onChange={(value) => setForm({ ...form, bio: value })} />
            <Field label="LinkedIn" value={form.linkedin} onChange={(value) => setForm({ ...form, linkedin: value })} />
            <Field label="Twitter" value={form.twitter} onChange={(value) => setForm({ ...form, twitter: value })} />
            <Field label="Instagram" value={form.instagram} onChange={(value) => setForm({ ...form, instagram: value })} />
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              {editingId && <button onClick={() => { setEditingId(null); setForm({ name: "", position: "", termYear: "", photo: "", bio: "", linkedin: "", twitter: "", instagram: "" }); }} className="rounded-2xl border border-acses-green-800 px-4 py-3 text-sm text-white/80 hover:bg-acses-green-800">Cancel</button>}
              <button onClick={handleSubmit} className="rounded-2xl bg-acses-yellow-400 px-4 py-3 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">{editingId ? "Save changes" : "Add executive"}</button>
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
    <p className="mt-2 text-sm text-acses-yellow-100">Your role does not have permission to manage executives.</p>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 shadow-xl shadow-acses-green-900/20">
    <h1 className="text-2xl font-semibold text-white">{title}</h1>
    <p className="mt-2 text-sm text-acses-yellow-100">{subtitle}</p>
  </div>
);

const Field = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none" />
  </div>
);

const TextArea = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <textarea rows="4" value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none" />
  </div>
);

export default AdminExecutives;


