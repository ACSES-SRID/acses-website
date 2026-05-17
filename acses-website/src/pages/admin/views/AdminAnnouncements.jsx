import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { exportToCsv, formatDate } from "../lib/adminUtils";
import { fetchApi } from "../../../utils/api";
import {
  PageShell, PageHeader, TwoColLayout,
  Panel, PanelEmpty, FormPanel, FormActions,
  CardRow, RowActions, Pill,
  Field, TextArea, Select, ExportBtn, BlockedAccess,
} from "../layout/adminUI";

const AdminAnnouncements = () => {
  const { searchQuery, showToast, openConfirm, currentUser, hasAccess } = useAdmin();
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", body: "", date: "", visibility: "public", status: "draft" });

  const loadAnnouncements = async () => {
    try {
      const data = await fetchApi("/api/announcements");
      const list = Array.isArray(data) ? data : [];
      setAnnouncements(list.map((item) => ({ id: item._id || item.id, ...item })));
    } catch (error) {
      console.error("Failed to load announcements:", error);
      setAnnouncements([]);
    }
  };

  useEffect(() => { loadAnnouncements(); }, []);

  const filtered = announcements.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.author || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!hasAccess("announcements")) return <BlockedAccess message="Your role does not have permission to manage announcements." />;

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", body: "", date: "", visibility: "public", status: "draft" });
  };

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
        await fetchApi(`/api/announcements/${editingId}`, { method: "PUT", body: JSON.stringify(payload), auth: true });
        setAnnouncements(announcements.map((item) => (item.id === editingId ? { ...item, ...payload, id: editingId } : item)));
        showToast("Announcement updated.");
      } else {
        const result = await fetchApi("/api/announcements", { method: "POST", body: JSON.stringify(payload), auth: true });
        const newId = result?.id || result?._id;
        setAnnouncements([...announcements, { ...payload, id: newId || `news-${Date.now()}` }]);
        showToast("Announcement posted.");
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to save announcement.", "error");
    }
    resetForm();
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
          await fetchApi(`/api/announcements/${id}`, { method: "DELETE", auth: true });
          setAnnouncements(announcements.filter((item) => item.id !== id));
          showToast("Announcement deleted.");
        } catch (error) {
          showToast(error instanceof Error ? error.message : "Delete failed.", "error");
        }
      },
    });
  };

  return (
    <PageShell>
      <PageHeader
        title="Announcements"
        subtitle="Post and manage news, draft announcements, and member visibility."
        badge={announcements.length}
      />

      <TwoColLayout>
        <Panel
          toolbar={
            <>
              <p className="text-sm font-medium text-acses-yellow-100/60">
                {filtered.length} {filtered.length === 1 ? "result" : "results"}
              </p>
              <ExportBtn onClick={() => exportToCsv("acses-announcements.csv", announcements)} />
            </>
          }
        >
          <div className="divide-y divide-acses-green-800">
            {filtered.length === 0 ? (
              <PanelEmpty message="No announcements found." hint="Add one using the form on the right." />
            ) : (
              filtered.map((item) => (
                <CardRow key={item.id} isActive={editingId === item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Pill label={item.status} variant={item.status === "published" ? "active" : "muted"} />
                        <Pill label={item.visibility} variant="green" />
                      </div>
                      <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                      <p className="mt-0.5 text-xs text-white/40 line-clamp-1">{item.body}</p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-white/30">
                        <span>{formatDate(item.date)}</span>
                        {item.author && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-white/20 inline-block" />
                            <span>{item.author}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <RowActions onEdit={() => handleEdit(item)} onDelete={() => handleDelete(item.id)} />
                  </div>
                </CardRow>
              ))
            )}
          </div>
        </Panel>

        <FormPanel title={editingId ? "Edit Announcement" : "New Announcement"}>
          <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="Enter announcement title…" />
          <TextArea label="Body" value={form.body} onChange={(v) => setForm({ ...form, body: v })} placeholder="Write the full announcement here…" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
            <Select label="Visibility" value={form.visibility} options={["public", "members-only"]} onChange={(v) => setForm({ ...form, visibility: v })} />
          </div>
          <Select label="Status" value={form.status} options={["draft", "published"]} onChange={(v) => setForm({ ...form, status: v })} />
          <div className="rounded-2xl bg-acses-green-800/60 border border-acses-green-700 px-4 py-3 flex items-start gap-3">
            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${form.status === "published" ? "bg-acses-yellow-400" : "bg-white/30"}`} />
            <p className="text-xs text-white/50 leading-relaxed">
              {form.status === "published"
                ? `Visible to ${form.visibility === "public" ? "everyone" : "members only"} once saved.`
                : "Saved as a draft — not shown publicly."}
            </p>
          </div>
          <FormActions
            editingId={editingId}
            onCancel={resetForm}
            onSubmit={handleSubmit}
            submitLabel={editingId ? "Save Changes" : "Publish"}
          />
        </FormPanel>
      </TwoColLayout>
    </PageShell>
  );
};

export default AdminAnnouncements;