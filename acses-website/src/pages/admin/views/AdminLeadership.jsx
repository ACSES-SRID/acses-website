import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { fetchApi } from "../../../utils/api";
import { UserCircle } from "lucide-react";
import {
  PageShell, PageHeader, TwoColLayout,
  Panel, PanelEmpty, FormPanel, FormActions,
  CardRow, RowActions,
  Field, TextArea, BlockedAccess,
} from "./adminUI";

const AdminLeadership = () => {
  const { hasAccess, showToast, openConfirm } = useAdmin();
  const [executives, setExecutives] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", role: "", image: "", icon: "", description: "", order: 0 });

  const load = async () => {
    try {
      const data = await fetchApi("/api/leadership");
      setExecutives(Array.isArray(data) ? data : []);
    } catch (e) {
      setExecutives([]);
    }
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", role: "", image: "", icon: "", description: "", order: 0 });
  };

  const handleSave = async () => {
    if (!form.name || !form.role) {
      showToast("Name and Position are required", "error");
      return;
    }
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/leadership/${editingId}` : "/api/leadership";
      await fetchApi(url, { method, body: JSON.stringify(form), auth: true });
      showToast(editingId ? "Profile updated" : "Member added");
      resetForm();
      load();
    } catch (e) {
      showToast("Operation failed", "error");
    }
  };

  const handleDelete = (id) => {
    openConfirm({
      message: "Remove this member from leadership?",
      onConfirm: async () => {
        try {
          await fetchApi(`/api/leadership/${id}`, { method: "DELETE", auth: true });
          showToast("Member removed");
          load();
        } catch (e) {
          showToast("Delete failed", "error");
        }
      },
    });
  };

  if (!hasAccess("executives")) return <BlockedAccess message="You do not have permission to manage the executive board." />;

  const sorted = [...executives].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <PageShell>
      <PageHeader
        title="Leadership & Executive Board"
        subtitle="Manage the profiles of current student association leaders."
        badge={executives.length}
      />

      <TwoColLayout>
        {/* ── Board grid ── */}
        <Panel
          toolbar={
            <p className="text-sm font-medium text-acses-yellow-100/60">
              {executives.length} {executives.length === 1 ? "member" : "members"}
            </p>
          }
        >
          {sorted.length === 0 ? (
            <PanelEmpty message="No board members yet." hint="Add the first member using the form on the right." />
          ) : (
            <div className="p-4 grid gap-3 sm:grid-cols-2">
              {sorted.map((member) => {
                const id = member._id || member.id;
                return (
                  <div
                    key={id}
                    className={`group flex items-center gap-4 p-4 rounded-2xl border transition-colors ${
                      editingId === id
                        ? "border-acses-yellow-400/30 bg-acses-green-800/50"
                        : "border-acses-green-800 bg-acses-green-900/40 hover:border-acses-green-700"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl bg-acses-green-800 border border-acses-green-700">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-acses-yellow-400/30">
                          <UserCircle size={28} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{member.name}</p>
                      <p className="text-[11px] font-semibold text-acses-yellow-400/80 uppercase tracking-wider truncate mt-0.5">{member.role}</p>
                      {member.description && (
                        <p className="text-[11px] text-white/30 mt-1 line-clamp-1">{member.description}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button
                        onClick={() => { setEditingId(id); setForm({ ...member, order: member.order || 0 }); }}
                        className="rounded-xl bg-acses-green-800 border border-acses-green-700 px-2.5 py-1.5 text-xs font-semibold text-acses-yellow-300 hover:bg-acses-green-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        className="rounded-xl bg-red-900/40 border border-red-800/50 px-2.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-800/60 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Panel>

        {/* ── Form ── */}
        <FormPanel title={editingId ? "Update Profile" : "Add Executive"}>
          <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="John Doe" />
          <Field label="Position" value={form.role} onChange={(v) => setForm({ ...form, role: v })} placeholder="e.g. President" />
          <div className="grid grid-cols-[1fr_80px] gap-3">
            <Field label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} placeholder="https://…" />
            <Field label="Order" type="number" value={form.order} onChange={(v) => setForm({ ...form, order: v })} />
          </div>

          {/* Avatar preview */}
          {form.image && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-acses-green-800/60 border border-acses-green-700">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-acses-green-600 flex-shrink-0">
                <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={(e) => (e.target.style.display = "none")} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{form.name || "Name"}</p>
                <p className="text-[11px] text-acses-yellow-400/70 uppercase tracking-wider">{form.role || "Role"}</p>
              </div>
            </div>
          )}

          <Field label="Icon Key" value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} placeholder="e.g. shield" />
          <TextArea label="Bio / Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Tell us about this leader…" rows={3} />
          <FormActions
            editingId={editingId}
            onCancel={resetForm}
            onSubmit={handleSave}
            submitLabel={editingId ? "Save Changes" : "Confirm Appointment"}
            cancelLabel="Discard"
          />
        </FormPanel>
      </TwoColLayout>
    </PageShell>
  );
};

export default AdminLeadership;