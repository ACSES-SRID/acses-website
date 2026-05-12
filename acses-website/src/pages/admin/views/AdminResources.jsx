import React, { useEffect, useState } from "react";
import { useAdmin } from "./AdminContext";
import { fetchApi } from "../../utils/api";

const emptyGrouped = { academic: [], tools: [], career: [] };

const BlockedAccess = () => (
  <div className="rounded-3xl border border-red-700 bg-acses-green-900 p-6 text-white/80">
    <p className="text-lg font-semibold">Access denied</p>
    <p className="mt-2 text-sm text-acses-yellow-100">Your role does not have permission to manage resources.</p>
  </div>
);

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
      console.error(e);
      setResources(emptyGrouped);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const payloadFromForm = () => ({
    type: form.type,
    title: form.title,
    description: form.description || undefined,
    url: form.url || undefined,
    icon: form.icon || undefined,
  });

  const handleEdit = (res, type) => {
    setEditing({ _id: res._id, type });
    setForm({
      type,
      title: res.title || res.name || "",
      description: res.description || "",
      url: res.url || "",
      icon: res.icon || res.Icon || "",
    });
  };

  const handleSave = async () => {
    if (!form.title) {
      showToast("Title is required.", "error");
      return;
    }
    const body = payloadFromForm();
    try {
      await fetchApi(`/api/resources/${editing._id}`, {
        method: "PUT",
        body: JSON.stringify({ ...body, type: editing.type }),
        auth: true,
      });
      setEditing(null);
      setForm({ type: "academic", title: "", description: "", url: "", icon: "" });
      showToast("Resource updated.");
      load();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Save failed.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetchApi(`/api/resources/${id}`, { method: "DELETE", auth: true });
      showToast("Deleted.");
      load();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Delete failed.", "error");
    }
  };

  const handleAdd = async () => {
    if (!form.title) {
      showToast("Title is required.", "error");
      return;
    }
    try {
      await fetchApi("/api/resources", {
        method: "POST",
        body: JSON.stringify(payloadFromForm()),
        auth: true,
      });
      setForm({ type: form.type, title: "", description: "", url: "", icon: "" });
      showToast("Resource added.");
      load();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Add failed.", "error");
    }
  };

  if (!hasAccess("resources")) {
    return <BlockedAccess />;
  }

  const renderList = (list, type) =>
    list.map((res) => (
      <div key={res._id} className="rounded-2xl border border-acses-green-800 bg-acses-green-900 p-4 text-white mb-2">
        {editing && editing._id === res._id ? (
          <div className="grid gap-2">
            <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" />
            <textarea className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={2} />
            <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="URL" />
            <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Icon (optional)" />
            <div className="flex gap-2">
              <button type="button" onClick={handleSave} className="rounded-xl bg-acses-yellow-400 px-3 py-2 text-sm font-semibold text-acses-green-900">
                Save
              </button>
              <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-acses-green-700 px-3 py-2 text-sm">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between gap-3 flex-wrap">
            <div>
              <strong>{res.title || res.name}</strong>
              {res.description && <p className="text-sm text-white/70 mt-1">{res.description}</p>}
              {res.url && (
                <a href={res.url} className="text-xs text-acses-yellow-200 underline" target="_blank" rel="noreferrer">
                  Link
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleEdit(res, type)} className="rounded-xl bg-acses-green-800 px-3 py-2 text-sm text-acses-yellow-200">
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(res._id)} className="rounded-xl bg-red-600 px-3 py-2 text-sm text-white">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    ));

  return (
    <div className="mt-8 space-y-8">
      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 text-white shadow-xl">
        <h2 className="text-2xl font-bold">Manage Resources</h2>
        <p className="mt-1 text-sm text-acses-yellow-100">API shape: title, description, url, icon, type (academic | tools | career).</p>
      </div>

      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Add resource</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <select className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="academic">Academic</option>
            <option value="tools">Tools</option>
            <option value="career">Career</option>
          </select>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" placeholder="Icon (optional)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          <textarea className="md:col-span-2 rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button type="button" onClick={handleAdd} className="mt-3 rounded-xl bg-acses-yellow-400 px-4 py-2 text-sm font-semibold text-acses-green-900">
          Add
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2 text-white">Academic</h3>
        {renderList(resources.academic, "academic")}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white">Tools</h3>
        {renderList(resources.tools, "tools")}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white">Career</h3>
        {renderList(resources.career, "career")}
      </div>
    </div>
  );
};

export default AdminResources;
