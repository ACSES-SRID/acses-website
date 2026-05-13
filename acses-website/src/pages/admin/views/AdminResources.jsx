import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { fetchApi } from "../../../utils/api";
import { BookOpen, Wrench, Briefcase, ExternalLink, Shapes, Edit3, Trash2, Plus, X } from "lucide-react";
import {
  PageShell, PageHeader, TwoColLayout,
  Panel, PanelEmpty, FormPanel, FormActions,
  Field, TextArea, Select, BlockedAccess, TabBar,
} from "../layout/adminUI";

const emptyGrouped = { academic: [], tools: [], career: [] };

const tabConfig = [
  { value: "academic", label: "Academic", icon: <BookOpen size={15} /> },
  { value: "tools", label: "Tools", icon: <Wrench size={15} /> },
  { value: "career", label: "Career", icon: <Briefcase size={15} /> },
];

const AdminResources = () => {
  const { hasAccess, showToast, openConfirm } = useAdmin();
  const [resources, setResources] = useState(emptyGrouped);
  const [activeTab, setActiveTab] = useState("academic");
  const [editingId, setEditingId] = useState(null);
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

  const resetForm = () => {
    setEditingId(null);
    setForm({ type: activeTab, title: "", description: "", url: "", icon: "" });
  };

  const handleSave = async () => {
    if (!form.title || !form.url) {
      showToast("Title and URL are required", "error");
      return;
    }
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/resources/${editingId}` : "/api/resources";
      await fetchApi(url, { method, body: JSON.stringify(form), auth: true });
      showToast(editingId ? "Resource updated" : "Resource added");
      resetForm();
      load();
    } catch (e) {
      showToast("Operation failed", "error");
    }
  };

  const handleEdit = (res) => {
    setEditingId(res._id || res.id);
    setForm({
      type: res.type || activeTab,
      title: res.title || "",
      description: res.description || "",
      url: res.url || "",
      icon: res.icon || "",
    });
  };

  const handleDelete = (id) => {
    openConfirm({
      message: "Permanently delete this resource?",
      onConfirm: async () => {
        try {
          await fetchApi(`/api/resources/${id}`, { method: "DELETE", auth: true });
          showToast("Deleted");
          load();
        } catch (e) {
          showToast("Error", "error");
        }
      },
    });
  };

  if (!hasAccess("resources")) return <BlockedAccess message="Insufficient permissions to manage resources." />;

  const currentList = resources[activeTab] || [];
  const totalCount = Object.values(resources).flat().length;

  return (
    <PageShell>
      <PageHeader
        title="Resource Hub"
        subtitle="Manage links and tools available to the student body."
        badge={totalCount}
      />

      <TwoColLayout>
        {/* ── Resource list ── */}
        <div className="space-y-4">
          {/* Tab bar */}
          <TabBar tabs={tabConfig} active={activeTab} onChange={(v) => setActiveTab(v)} />

          <Panel
            toolbar={
              <p className="text-sm font-medium text-acses-yellow-100/60">
                {currentList.length} {currentList.length === 1 ? "resource" : "resources"} in <span className="capitalize text-white/70">{activeTab}</span>
              </p>
            }
          >
            {currentList.length === 0 ? (
              <PanelEmpty message={`No ${activeTab} resources yet.`} hint="Add one using the form on the right." />
            ) : (
              <div className="divide-y divide-acses-green-800">
                {currentList.map((res) => {
                  const id = res._id || res.id;
                  return (
                    <div
                      key={id}
                      className={`group px-6 py-5 transition-colors ${editingId === id ? "bg-acses-green-800/50" : "hover:bg-acses-green-800/30"}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div className="p-2 rounded-xl bg-acses-green-800 border border-acses-green-700 text-acses-yellow-400 flex-shrink-0 mt-0.5">
                            <Shapes size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{res.title}</p>
                            {res.description && (
                              <p className="mt-0.5 text-xs text-white/40 line-clamp-2 leading-relaxed">{res.description}</p>
                            )}
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-acses-yellow-400/60 hover:text-acses-yellow-400 transition-colors"
                            >
                              {res.url.replace(/^https?:\/\//, "").slice(0, 40)}…
                              <ExternalLink size={10} />
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(res)}
                            className="rounded-xl bg-acses-green-800 border border-acses-green-700 px-3 py-1.5 text-xs font-semibold text-acses-yellow-300 hover:bg-acses-green-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            className="rounded-xl bg-red-900/40 border border-red-800/50 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-800/60 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Panel>
        </div>

        {/* ── Form ── */}
        <FormPanel title={editingId ? "Edit Resource" : "Add Resource"}>
          <Select
            label="Category"
            value={form.type}
            options={["academic", "tools", "career"]}
            onChange={(v) => setForm({ ...form, type: v })}
          />
          <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="Resource name" />
          <Field label="URL" value={form.url} onChange={(v) => setForm({ ...form, url: v })} placeholder="https://…" />
          <Field label="Icon Key" value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} placeholder="e.g. book, code" />
          <TextArea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="What is this resource?" rows={3} />
          <FormActions
            editingId={editingId}
            onCancel={resetForm}
            onSubmit={handleSave}
            submitLabel={editingId ? "Update Resource" : "Create Resource"}
          />
        </FormPanel>
      </TwoColLayout>
    </PageShell>
  );
};

export default AdminResources;