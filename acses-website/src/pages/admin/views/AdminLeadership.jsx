import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { fetchApi } from "../../../utils/api";

const BlockedAccess = () => (
  <div className="rounded-3xl border border-red-700 bg-acses-green-900 p-6 text-white/80">
    <p className="text-lg font-semibold">Access denied</p>
    <p className="mt-2 text-sm text-acses-yellow-100">Your role does not have permission to manage leadership.</p>
  </div>
);

const AdminLeadership = () => {
  const { hasAccess, showToast } = useAdmin();
  const [executives, setExecutives] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", role: "", image: "", icon: "", description: "", order: 0 });

  const load = async () => {
    try {
      const data = await fetchApi("/api/leadership");
      const list = Array.isArray(data) ? data : [];
      setExecutives(list);
    } catch (e) {
      console.error(e);
      setExecutives([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm({ name: "", role: "", image: "", icon: "", description: "", order: 0 });
    setEditingId(null);
  };

  const handleEdit = (exec) => {
    setEditingId(exec._id);
    setForm({
      name: exec.name || "",
      role: exec.role || "",
      image: exec.image || "",
      icon: exec.icon || "",
      description: exec.description || "",
      order: typeof exec.order === "number" ? exec.order : 0,
    });
  };

  const handleSave = async () => {
    if (!form.name || !form.role) {
      showToast("Name and role are required.", "error");
      return;
    }
    const payload = {
      name: form.name,
      role: form.role,
      image: form.image || undefined,
      icon: form.icon || undefined,
      description: form.description || undefined,
      order: Number(form.order) || 0,
    };
    try {
      if (editingId) {
        await fetchApi(`/api/leadership/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          auth: true,
        });
        showToast("Leadership profile updated.");
      } else {
        await fetchApi("/api/leadership", {
          method: "POST",
          body: JSON.stringify(payload),
          auth: true,
        });
        showToast("Leadership member added.");
      }
      resetForm();
      load();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Save failed.", "error");
    }
  };

  const handleDelete = (id) => {
    (async () => {
      try {
        await fetchApi(`/api/leadership/${id}`, { method: "DELETE", auth: true });
        showToast("Removed.");
        load();
      } catch (e) {
        showToast(e instanceof Error ? e.message : "Delete failed.", "error");
      }
    })();
  };

  if (!hasAccess("executives")) {
    return <BlockedAccess />;
  }

  return (
    <div className="mt-8 space-y-6 text-acses-green-900">
      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 text-white shadow-xl">
        <h2 className="text-2xl font-bold">Manage Leadership</h2>
        <p className="mt-1 text-sm text-acses-yellow-100">Profiles are stored on the API and shown on the public leadership page.</p>
      </div>

      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">{editingId ? "Edit member" : "Add member"}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2 text-white" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2 text-white" placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2 text-white" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2 text-white" placeholder="Icon (optional URL or key)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          <input type="number" className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2 text-white" placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
          <textarea className="md:col-span-2 rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2 text-white" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={handleSave} className="rounded-xl bg-acses-yellow-400 px-4 py-2 text-sm font-semibold text-acses-green-900">
            {editingId ? "Save" : "Add"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-xl border border-acses-green-700 px-4 py-2 text-sm text-white/80">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {executives.map((exec) => (
          <div key={exec._id} className="flex flex-col gap-3 rounded-2xl border border-acses-green-800 bg-acses-green-900 p-4 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <strong>{exec.name}</strong> <span className="text-white/70">— {exec.role}</span>
              {typeof exec.order === "number" && <span className="ml-2 text-xs text-acses-yellow-200">order: {exec.order}</span>}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleEdit(exec)} className="rounded-xl bg-acses-green-800 px-3 py-2 text-sm text-acses-yellow-200">
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(exec._id)} className="rounded-xl bg-red-600 px-3 py-2 text-sm text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLeadership;
