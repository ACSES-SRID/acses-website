import { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { fetchApi, unwrapList } from "../../../utils/api";
import {
  PageShell, PageHeader, TwoColLayout,
  Panel, PanelEmpty, FormPanel, FormActions,
  CardRow, RowActions, Pill,
  Field, TextArea, Select, BlockedAccess,
} from "../layout/adminUI";

const categories = ["apparel", "accessories", "tech"];

const AdminStore = () => {
  const { hasAccess, showToast } = useAdmin();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", originalPrice: "",
    category: "apparel", badge: "", badgeColor: "", image: "",
  });

  const load = async () => {
    try {
      const data = await fetchApi("/api/store?limit=100");
      setProducts(unwrapList(data));
    } catch (e) {
      console.error(e);
      setProducts([]);
    }
  };

  useEffect(() => { load(); }, []);

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

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", description: "", price: "", originalPrice: "", category: "apparel", badge: "", badgeColor: "", image: "" });
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
        await fetchApi(`/api/store/${editingId}`, { method: "PUT", body: JSON.stringify(toPayload()), auth: true });
        showToast("Product updated.");
      } else {
        await fetchApi("/api/store", { method: "POST", body: JSON.stringify(toPayload()), auth: true });
        showToast("Product added.");
      }
      resetForm();
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

  if (!hasAccess("store")) return <BlockedAccess message="Your role does not have permission to manage the store." />;

  return (
    <PageShell>
      <PageHeader
        title="Store Products"
        subtitle="Manage merchandise, pricing, and product listings."
        badge={products.length}
      />

      <TwoColLayout>
        {/* ── Product list ── */}
        <Panel
          toolbar={
            <p className="text-sm font-medium text-acses-yellow-100/60">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>
          }
        >
          <div className="divide-y divide-acses-green-800">
            {products.length === 0 ? (
              <PanelEmpty message="No products yet." hint="Add the first product using the form on the right." />
            ) : (
              products.map((prod) => (
                <CardRow key={prod._id} isActive={editingId === prod._id}>
                  <div className="flex items-center gap-4 justify-between">
                    {/* Product image */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-acses-green-800 border border-acses-green-700 flex-shrink-0">
                      {prod.image ? (
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-acses-yellow-400/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Pill label={prod.category} variant="green" />
                        {prod.badge && <Pill label={prod.badge} variant="active" />}
                      </div>
                      <p className="text-sm font-semibold text-white truncate">{prod.name}</p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="text-sm font-bold text-acses-yellow-400">GHS {prod.price}</span>
                        {prod.originalPrice && (
                          <span className="text-xs text-white/30 line-through">GHS {prod.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <RowActions
                      onEdit={() => handleEdit(prod)}
                      onDelete={() => handleDelete(prod._id)}
                    />
                  </div>
                </CardRow>
              ))
            )}
          </div>
        </Panel>

        {/* ── Form ── */}
        <FormPanel title={editingId ? "Edit Product" : "Add Product"}>
          <Field label="Product Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="e.g. ACSES Hoodie" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Price (GHS)" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} placeholder="0.00" />
            <Field label="Original Price" type="number" value={form.originalPrice} onChange={(v) => setForm({ ...form, originalPrice: v })} placeholder="Optional" />
          </div>
          <Select label="Category" value={form.category} options={categories} onChange={(v) => setForm({ ...form, category: v })} />
          <Field label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} placeholder="https://…" />

          {/* Image preview */}
          {form.image && (
            <div className="w-full h-32 rounded-2xl overflow-hidden border border-acses-green-700 bg-acses-green-800">
              <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={(e) => (e.target.style.display = "none")} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="Badge Label" value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} placeholder="e.g. New" />
            <Field label="Badge Color" value={form.badgeColor} onChange={(v) => setForm({ ...form, badgeColor: v })} placeholder="e.g. yellow" />
          </div>
          <TextArea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Describe the product…" rows={3} />
          <FormActions
            editingId={editingId}
            onCancel={resetForm}
            onSubmit={handleSave}
            submitLabel={editingId ? "Save Changes" : "Add Product"}
          />
        </FormPanel>
      </TwoColLayout>
    </PageShell>
  );
};

export default AdminStore;