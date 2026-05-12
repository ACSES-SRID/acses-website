import React, { useEffect, useState } from "react";
import { useAdmin } from "./AdminContext";
import { fetchApi, unwrapList } from "../../utils/api";

const BlockedAccess = () => (
  <div className="rounded-3xl border border-red-700 bg-acses-green-900 p-6 text-white/80">
    <p className="text-lg font-semibold">Access denied</p>
    <p className="mt-2 text-sm text-acses-yellow-100">Your role does not have permission to manage the store.</p>
  </div>
);

const AdminStore = () => {
  const { hasAccess, showToast } = useAdmin();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "apparel",
    badge: "",
    badgeColor: "",
    image: "",
  });

  const load = async () => {
    try {
      const data = await fetchApi("/api/store?limit=100");
      const list = unwrapList(data);
      setProducts(list);
    } catch (e) {
      console.error(e);
      setProducts([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toPayload = () => ({
    name: form.name,
    description: form.description || undefined,
    price: Number(form.price),
    originalPrice: form.originalPrice === "" ? undefined : Number(form.originalPrice),
    category: form.category,
    badge: form.badge || undefined,
    badgeColor: form.badgeColor || undefined,
    image: form.image || undefined,
  });

  const reset = () => {
    setEditingId(null);
    setForm({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "apparel",
      badge: "",
      badgeColor: "",
      image: "",
    });
  };

  const handleEdit = (prod) => {
    setEditingId(prod._id);
    setForm({
      name: prod.name || "",
      description: prod.description || "",
      price: prod.price != null ? String(prod.price) : "",
      originalPrice: prod.originalPrice != null ? String(prod.originalPrice) : "",
      category: prod.category || "apparel",
      badge: prod.badge || "",
      badgeColor: prod.badgeColor || "",
      image: prod.image || "",
    });
  };

  const handleSave = async () => {
    if (!form.name || form.price === "") {
      showToast("Name and price are required.", "error");
      return;
    }
    try {
      if (editingId) {
        await fetchApi(`/api/store/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(toPayload()),
          auth: true,
        });
        showToast("Product updated.");
      } else {
        await fetchApi("/api/store", {
          method: "POST",
          body: JSON.stringify(toPayload()),
          auth: true,
        });
        showToast("Product added.");
      }
      reset();
      load();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Save failed.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetchApi(`/api/store/${id}`, { method: "DELETE", auth: true });
      showToast("Deleted.");
      load();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Delete failed.", "error");
    }
  };

  if (!hasAccess("store")) {
    return <BlockedAccess />;
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 text-white shadow-xl">
        <h2 className="text-2xl font-bold">Manage Store Products</h2>
      </div>

      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">{editingId ? "Edit product" : "Add product"}</h3>
        <div className="grid gap-2 md:grid-cols-2">
          <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" type="number" step="0.01" placeholder="Original price (optional)" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} />
          <select className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="apparel">apparel</option>
            <option value="accessories">accessories</option>
            <option value="tech">tech</option>
          </select>
          <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" placeholder="Badge (optional)" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
          <input className="rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" placeholder="Badge color" value={form.badgeColor} onChange={(e) => setForm({ ...form, badgeColor: e.target.value })} />
          <input className="md:col-span-2 rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <textarea className="md:col-span-2 rounded-xl border border-acses-green-800 bg-acses-green-950 px-3 py-2" placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="mt-3 flex gap-2">
          <button type="button" onClick={handleSave} className="rounded-xl bg-acses-yellow-400 px-4 py-2 text-sm font-semibold text-acses-green-900">
            {editingId ? "Save" : "Add"}
          </button>
          {editingId && (
            <button type="button" onClick={reset} className="rounded-xl border border-acses-green-700 px-4 py-2 text-sm">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {products.map((prod) => (
          <div key={prod._id} className="flex flex-col gap-2 rounded-2xl border border-acses-green-800 bg-acses-green-900 p-4 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <strong>{prod.name}</strong> <span className="text-white/70">— GHS {prod.price}</span> <span className="text-xs text-acses-yellow-200">({prod.category})</span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleEdit(prod)} className="rounded-xl bg-acses-green-800 px-3 py-2 text-sm text-acses-yellow-200">
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(prod._id)} className="rounded-xl bg-red-600 px-3 py-2 text-sm text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStore;
