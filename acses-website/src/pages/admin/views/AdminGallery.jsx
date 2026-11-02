import { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { exportToCsv, formatDate } from "../lib/adminUtils";
import { fetchApi, unwrapList } from "../../../utils/api";
import {
  PageShell, PageHeader, TwoColLayout,
  Panel, PanelEmpty, FormPanel, FormActions,
  CardRow, RowActions, Pill,
  Field, ExportBtn, BlockedAccess,
} from "../layout/adminUI";

const AdminGallery = () => {
  const { searchQuery, showToast, openConfirm, hasAccess } = useAdmin();
  const [gallery, setGallery] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ image: "", caption: "", eventTag: "", uploadedAt: "", dateUploaded: "" });
  const [albumForm, setAlbumForm] = useState({ title: "", url: "", description: "" });
  const [editingAlbumId, setEditingAlbumId] = useState(null);
  const [activeTab, setActiveTab] = useState("photos"); // "photos" or "albums"

  const loadGallery = async () => {
    try {
      const data = await fetchApi("/api/gallery?limit=100");
      const list = unwrapList(data);
      setGallery(
        list.map((item) => ({
          id: item._id || item.id,
          image: item.src || item.image || "",
          caption: item.alt || item.caption || "",
          eventTag: item.category || item.description || "",
          uploadedAt: item.createdAt || item.uploadedAt || "",
          dateUploaded: item.dateUploaded || item.createdAt || "",
          ...item,
        }))
      );
    } catch (error) {
      console.error("Failed to load gallery:", error);
      setGallery([]);
    }
  };

  const loadAlbums = async () => {
    try {
      const data = await fetchApi("/api/gallery/albums");
      const list = unwrapList(data);
      setAlbums(list);
    } catch (error) {
      console.error("Failed to load albums:", error);
      setAlbums([]);
    }
  };

  useEffect(() => { 
    loadGallery(); 
    loadAlbums();
  }, []);

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

  if (!hasAccess("gallery")) return <BlockedAccess message="Your role does not have permission to manage gallery photos." />;

  const resetForm = () => {
    setEditingId(null);
    setForm({ image: "", caption: "", eventTag: "", uploadedAt: "", dateUploaded: "" });
  };

  const handleSave = async () => {
    if (!form.image || !form.caption || !form.eventTag) {
      showToast("Image URL, caption, and category/tag are required.", "error");
      return;
    }
    const payload = { src: form.image, alt: form.caption, description: form.eventTag, category: form.eventTag };
    try {
      if (editingId) {
        await fetchApi(`/api/gallery/${editingId}`, { method: "PUT", body: JSON.stringify(payload), auth: true });
        setGallery(gallery.map((item) =>
          item.id === editingId
            ? { ...item, ...payload, id: editingId, image: payload.src, caption: payload.alt, eventTag: payload.category }
            : item
        ));
        showToast("Gallery photo updated.");
      } else {
        const result = await fetchApi("/api/gallery", { method: "POST", body: JSON.stringify(payload), auth: true });
        const newId = result?.id || result?._id;
        setGallery([...gallery, { id: newId || `photo-${Date.now()}`, ...payload, image: payload.src, caption: payload.alt, eventTag: payload.category }]);
        showToast("Photo added to gallery.");
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to save gallery item.", "error");
    }
    resetForm();
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
          setGallery(gallery.filter((item) => item.id !== id));
          showToast("Gallery item deleted.");
        } catch (error) {
          showToast(error instanceof Error ? error.message : "Delete failed.", "error");
        }
      },
    });
  };

  const resetAlbumForm = () => {
    setEditingAlbumId(null);
    setAlbumForm({ title: "", url: "", description: "" });
  };

  const handleSaveAlbum = async () => {
    if (!albumForm.title || !albumForm.url) {
      showToast("Title and URL are required.", "error");
      return;
    }
    try {
      if (editingAlbumId) {
        await fetchApi(`/api/gallery/albums/${editingAlbumId}`, { 
          method: "PUT", 
          body: JSON.stringify(albumForm), 
          auth: true 
        });
        setAlbums(albums.map((a) => a._id === editingAlbumId ? { ...a, ...albumForm } : a));
        showToast("Album updated.");
      } else {
        const result = await fetchApi("/api/gallery/albums", { 
          method: "POST", 
          body: JSON.stringify(albumForm), 
          auth: true 
        });
        setAlbums([...albums, { _id: result._id || result.id, ...albumForm }]);
        showToast("Album added.");
      }
      resetAlbumForm();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to save album.", "error");
    }
  };

  const handleDeleteAlbum = (id) => {
    openConfirm({
      message: "Delete this album link?",
      onConfirm: async () => {
        try {
          await fetchApi(`/api/gallery/albums/${id}`, { method: "DELETE", auth: true });
          setAlbums(albums.filter((a) => a._id !== id));
          showToast("Album deleted.");
        } catch (error) {
          showToast(error instanceof Error ? error.message : "Delete failed.", "error");
        }
      },
    });
  };

  return (
    <PageShell>
      <PageHeader
        title="Gallery"
        subtitle="Upload and manage event photos, captions, and tags."
        badge={gallery.length}
      />

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-2 border-b border-acses-green-800">
        <button
          onClick={() => setActiveTab("photos")}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === "photos"
              ? "text-acses-yellow-400 border-b-2 border-acses-yellow-400"
              : "text-white/60 hover:text-white"
          }`}
        >
          Individual Photos ({gallery.length})
        </button>
        <button
          onClick={() => setActiveTab("albums")}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === "albums"
              ? "text-acses-yellow-400 border-b-2 border-acses-yellow-400"
              : "text-white/60 hover:text-white"
          }`}
        >
          Photo Albums ({albums.length})
        </button>
      </div>

      {activeTab === "photos" ? (
      <TwoColLayout>
        {/* ── List ── */}
        <Panel
          toolbar={
            <>
              <p className="text-sm font-medium text-acses-yellow-100/60">
                {filteredGallery.length} {filteredGallery.length === 1 ? "photo" : "photos"}
              </p>
              <ExportBtn onClick={() => exportToCsv("acses-gallery.csv", gallery)} />
            </>
          }
        >
          <div className="divide-y divide-acses-green-800">
            {filteredGallery.length === 0 ? (
              <PanelEmpty message="No gallery items found." hint="Add a photo using the form on the right." />
            ) : (
              filteredGallery.map((item) => (
                <CardRow key={item.id} isActive={editingId === item.id}>
                  <div className="flex items-center gap-4 justify-between">
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-acses-green-800 border border-acses-green-700 flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.caption} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-acses-yellow-400/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">{item.caption}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Pill label={item.eventTag} variant="green" />
                        <span className="text-[11px] text-white/30">{formatDate(item.uploadedAt)}</span>
                      </div>
                    </div>
                    <RowActions onEdit={() => handleEdit(item)} onDelete={() => handleDelete(item.id)} />
                  </div>
                </CardRow>
              ))
            )}
          </div>
        </Panel>

        {/* ── Form ── */}
        <FormPanel title={editingId ? "Edit Photo" : "Add Gallery Photo"}>
          <Field label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} placeholder="https://…" />

          {/* Preview */}
          {form.image && (
            <div className="w-full h-36 rounded-2xl overflow-hidden border border-acses-green-700 bg-acses-green-800">
              <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={(e) => (e.target.style.display = "none")} />
            </div>
          )}

          <Field label="Caption" value={form.caption} onChange={(v) => setForm({ ...form, caption: v })} placeholder="Describe the photo…" />
          <Field label="Category / Tag" value={form.eventTag} onChange={(v) => setForm({ ...form, eventTag: v })} placeholder="e.g. Orientation 2024" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Upload Date" type="date" value={form.uploadedAt} onChange={(v) => setForm({ ...form, uploadedAt: v })} />
            <Field label="Display Date" type="date" value={form.dateUploaded} onChange={(v) => setForm({ ...form, dateUploaded: v })} />
          </div>
          <FormActions
            editingId={editingId}
            onCancel={resetForm}
            onSubmit={handleSave}
            submitLabel={editingId ? "Save Photo" : "Add Photo"}
          />
        </FormPanel>
      </TwoColLayout>
      ) : (
      <TwoColLayout>
        {/* ── Albums List ── */}
        <Panel
          toolbar={
            <p className="text-sm font-medium text-acses-yellow-100/60">
              {albums.length} {albums.length === 1 ? "album" : "albums"}
            </p>
          }
        >
          <div className="divide-y divide-acses-green-800">
            {albums.length === 0 ? (
              <PanelEmpty message="No photo albums yet." hint="Add an album link using the form on the right." />
            ) : (
              albums.map((album) => (
                <CardRow key={album._id} isActive={editingAlbumId === album._id}>
                  <div className="flex items-center gap-4 justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">{album.title}</p>
                      <p className="text-xs text-white/50 truncate mt-1">{album.url}</p>
                      {album.description && (
                        <p className="text-xs text-white/30 mt-1 line-clamp-1">{album.description}</p>
                      )}
                    </div>
                    <RowActions 
                      onEdit={() => {
                        setEditingAlbumId(album._id);
                        setAlbumForm({
                          title: album.title,
                          url: album.url,
                          description: album.description || "",
                        });
                      }} 
                      onDelete={() => handleDeleteAlbum(album._id)} 
                    />
                  </div>
                </CardRow>
              ))
            )}
          </div>
        </Panel>

        {/* ── Album Form ── */}
        <FormPanel title={editingAlbumId ? "Edit Album" : "Add Photo Album"}>
          <Field 
            label="Album Title" 
            value={albumForm.title} 
            onChange={(v) => setAlbumForm({ ...albumForm, title: v })} 
            placeholder="e.g. Bits to Bytes 2024" 
          />
          <Field 
            label="Album URL" 
            value={albumForm.url} 
            onChange={(v) => setAlbumForm({ ...albumForm, url: v })} 
            placeholder="https://braoseistudios.picflow.com/..." 
          />
          <Field 
            label="Description (Optional)" 
            value={albumForm.description} 
            onChange={(v) => setAlbumForm({ ...albumForm, description: v })} 
            placeholder="Brief description of this album" 
          />
          
          <div className="p-3 rounded-2xl bg-acses-green-800/40 border border-acses-green-700">
            <p className="text-xs text-white/70">
              <strong>Supported platforms:</strong> Google Drive, Picflow, Flickr, or any public gallery link. 
              Visitors will be redirected to view the full album.
            </p>
          </div>

          <FormActions
            editingId={editingAlbumId}
            onCancel={resetAlbumForm}
            onSubmit={handleSaveAlbum}
            submitLabel={editingAlbumId ? "Update Album" : "Add Album"}
          />
        </FormPanel>
      </TwoColLayout>
      )}
    </PageShell>
  );
};

export default AdminGallery;