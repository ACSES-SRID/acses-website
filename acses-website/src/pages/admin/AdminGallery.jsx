import { useEffect, useMemo, useState } from "react";
import { useAdmin } from "./AdminContext";
import { exportToCsv, formatDate } from "./adminUtils";
import { fetchApi, unwrapList } from "../../utils/api";

const AdminGallery = () => {
  const { searchQuery, showToast, openConfirm, hasAccess } = useAdmin();
  const [gallery, setGallery] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ image: "", caption: "", eventTag: "", uploadedAt: "", dateUploaded: "" });

  const loadGallery = async () => {
    try {
      const data = await fetchApi("/api/gallery?limit=100");
      const list = unwrapList(data);
      const normalized = list.map((item) => ({
        id: item._id || item.id,
        image: item.src || item.image || "",
        caption: item.alt || item.caption || "",
        eventTag: item.category || item.description || "",
        uploadedAt: item.createdAt || item.uploadedAt || "",
        dateUploaded: item.dateUploaded || item.createdAt || "",
        ...item,
      }));
      setGallery(normalized);
    } catch (error) {
      console.error("Failed to load gallery from API:", error);
      setGallery([]);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const saveGallery = (items) => {
    setGallery(items);
  };

  const filteredGallery = useMemo(
    () =>
      gallery.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          (item.caption || "").toLowerCase().includes(query) ||
          (item.eventTag || "").toLowerCase().includes(query) ||
          String(item.uploadedAt || "").toLowerCase().includes(query)
        );
      }),
    [gallery, searchQuery]
  );

  if (!hasAccess("gallery")) {
    return (
      <div className="rounded-3xl border border-red-700 bg-acses-green-900 p-6 text-white/80">
        <p className="text-lg font-semibold">Access denied</p>
        <p className="mt-2 text-sm text-acses-yellow-100">Your role does not have permission to manage gallery photos.</p>
      </div>
    );
  }

  const handleSave = async () => {
    if (!form.image || !form.caption || !form.eventTag) {
      showToast("Image URL, caption, and category/tag are required.", "error");
      return;
    }

    const payload = {
      src: form.image,
      alt: form.caption,
      description: form.eventTag,
      category: form.eventTag,
    };

    try {
      if (editingId) {
        await fetchApi(`/api/gallery/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          auth: true,
        });
        setGallery(gallery.map((item) => (item.id === editingId ? { ...item, ...payload, id: editingId, image: payload.src, caption: payload.alt, eventTag: payload.category } : item)));
        showToast("Gallery photo updated.");
      } else {
        const result = await fetchApi("/api/gallery", {
          method: "POST",
          body: JSON.stringify(payload),
          auth: true,
        });
        const newId = result?.id || result?._id;
        setGallery([...gallery, { id: newId || `photo-${Date.now()}`, ...payload, image: payload.src, caption: payload.alt, eventTag: payload.category }]);
        showToast("Photo added to gallery.");
      }
    } catch (error) {
      console.error("API save failed:", error);
      showToast(error instanceof Error ? error.message : "Failed to save gallery item.", "error");
    }

    setEditingId(null);
    setForm({ image: "", caption: "", eventTag: "", uploadedAt: "", dateUploaded: "" });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      image: item.image || item.src || "",
      caption: item.caption || item.alt || "",
      eventTag: item.eventTag || item.category || "",
      uploadedAt: item.uploadedAt || "",
      dateUploaded: item.dateUploaded || "",
    });
  };

  const handleDelete = (id) => {
    openConfirm({
      message: "Delete this gallery item?",
      onConfirm: async () => {
        try {
          await fetchApi(`/api/gallery/${id}`, { method: "DELETE", auth: true });
          saveGallery(gallery.filter((item) => item.id !== id));
          showToast("Gallery item deleted.");
        } catch (error) {
          console.error("API delete failed:", error);
          showToast(error instanceof Error ? error.message : "Delete failed.", "error");
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 shadow-xl shadow-acses-green-900/20">
        <h1 className="text-2xl font-semibold text-white">Gallery</h1>
        <p className="mt-2 text-sm text-acses-yellow-100">Upload and manage event photos, captions, and tags.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <button onClick={() => exportToCsv("acses-gallery.csv", gallery)} className="rounded-2xl bg-acses-yellow-400 px-4 py-2 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-acses-green-800 bg-acses-green-900">
            <table className="min-w-full border-collapse text-left text-sm text-white/70">
              <thead className="bg-acses-green-900 text-acses-yellow-100">
                <tr>
                  <th className="px-4 py-3">Caption</th>
                  <th className="px-4 py-3">Event tag</th>
                  <th className="px-4 py-3">Uploaded</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGallery.map((item) => (
                  <tr key={item.id} className="border-t border-acses-green-800 last:border-b last:border-acses-green-800 hover:bg-acses-green-900/60">
                    <td className="px-4 py-3 text-white">{item.caption}</td>
                    <td className="px-4 py-3">{item.eventTag}</td>
                    <td className="px-4 py-3">{formatDate(item.uploadedAt)}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button onClick={() => handleEdit(item)} className="rounded-2xl bg-acses-green-800 px-3 py-2 text-xs text-acses-yellow-300 hover:bg-acses-green-700">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="rounded-2xl bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-500">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredGallery.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-acses-yellow-200">
                      No gallery items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <h2 className="text-lg font-semibold text-white">{editingId ? "Edit photo" : "Add gallery photo"}</h2>
          <div className="mt-5 space-y-4">
            <Field label="Image URL" value={form.image} onChange={(value) => setForm({ ...form, image: value })} />
            <Field label="Caption" value={form.caption} onChange={(value) => setForm({ ...form, caption: value })} />
            <Field label="Category / tag" value={form.eventTag} onChange={(value) => setForm({ ...form, eventTag: value })} />
            <Field label="Upload date" type="date" value={form.uploadedAt} onChange={(value) => setForm({ ...form, uploadedAt: value })} />
            <Field label="Display date" type="date" value={form.dateUploaded} onChange={(value) => setForm({ ...form, dateUploaded: value })} />
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setForm({ image: "", caption: "", eventTag: "", uploadedAt: "", dateUploaded: "" });
                  }}
                  className="rounded-2xl border border-acses-green-800 px-4 py-3 text-sm text-white/80 hover:bg-acses-green-800"
                >
                  Cancel
                </button>
              )}
              <button onClick={handleSave} className="rounded-2xl bg-acses-yellow-400 px-4 py-3 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">
                {editingId ? "Save photo" : "Add photo"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none" />
  </div>
);

export default AdminGallery;
