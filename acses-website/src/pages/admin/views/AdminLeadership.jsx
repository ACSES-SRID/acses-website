import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { fetchApi } from "../../../utils/api";

const AdminLeadership = () => {
  const { hasAccess, showToast } = useAdmin();
  const [executives, setExecutives] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", role: "", image: "", icon: "", description: "", order: 0 });

  const load = async () => {
    try {
      const data = await fetchApi("/api/leadership");
      setExecutives(Array.isArray(data) ? data : []);
    } catch (e) { setExecutives([]); }
  };

  useEffect(() => { load(); }, []);

  const inputClass = "rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-black outline-none focus:ring-2 focus:ring-acses-yellow-400 block w-full transition-all font-medium";

  const handleSave = async () => {
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/leadership/${editingId}` : "/api/leadership";
      await fetchApi(url, { method, body: JSON.stringify(form), auth: true });
      showToast("Success");
      setEditingId(null);
      setForm({ name: "", role: "", image: "", icon: "", description: "", order: 0 });
      load();
    } catch (e) { showToast("Error", "error"); }
  };

  if (!hasAccess("executives")) return <div className="text-white">Access Denied</div>;

  return (
    <div className="mt-8 space-y-8">
      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 text-white shadow-lg">
        <h3 className="text-lg font-semibold mb-5 text-acses-yellow-400">{editingId ? "Edit Executive" : "Add Executive"}</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input className={inputClass} placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className={inputClass} placeholder="Position" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <input className={inputClass} placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <input className={inputClass} placeholder="Icon Key" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          <input type="number" className={inputClass} placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
          <textarea className={`${inputClass} md:col-span-2`} rows={4} placeholder="Description/Bio" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button onClick={handleSave} className="mt-6 rounded-xl bg-acses-yellow-400 px-8 py-3 font-bold text-acses-green-950 shadow-md">
          {editingId ? "Update Member" : "Add Member"}
        </button>
      </div>
    </div>
  );
};

export default AdminLeadership;