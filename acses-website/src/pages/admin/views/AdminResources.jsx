import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { fetchApi } from "../../../utils/api";

const emptyGrouped = { academic: [], tools: [], career: [] };

const AdminResources = () => {
  const { hasAccess, showToast } = useAdmin();
  const [resources, setResources] = useState(emptyGrouped);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ type: "academic", title: "", description: "", url: "", icon: "" });

  const load = async () => {
    try {
      const data = await fetchApi("/api/resources");
      setResources({
        academic: Array.isArray(data?.academic) ? data.academic : [],
        tools: Array.isArray(data?.tools) ? data.tools : [],
        career: Array.isArray(data?.career) ? data.career : [],
      });
    } catch (e) {
      setResources(emptyGrouped);
    }
  };

  useEffect(() => { load(); }, []);

  const inputClass = "rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-black outline-none focus:ring-2 focus:ring-acses-yellow-400 block w-full transition-all font-medium";

  const handleAdd = async () => {
    if (!form.title) return showToast("Title required", "error");
    try {
      await fetchApi("/api/resources", { method: "POST", body: JSON.stringify(form), auth: true });
      setForm({ type: form.type, title: "", description: "", url: "", icon: "" });
      showToast("Added");
      load();
    } catch (e) { showToast("Error adding", "error"); }
  };

  if (!hasAccess("resources")) return <div className="text-white">Access Denied</div>;

  return (
    <div className="mt-8 space-y-10">
      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 text-white shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Add New Resource</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <select className={inputClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="academic">Academic</option>
            <option value="tools">Tools</option>
            <option value="career">Career</option>
          </select>
          <input className={inputClass} placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className={inputClass} placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <input className={inputClass} placeholder="Icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          <textarea className={`${inputClass} md:col-span-2`} placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button onClick={handleAdd} className="mt-5 rounded-xl bg-acses-yellow-400 px-8 py-3 font-bold text-acses-green-950">Add Resource</button>
      </div>
      {/* ... Lists render here similar to store ... */}
    </div>
  );
};

export default AdminResources;