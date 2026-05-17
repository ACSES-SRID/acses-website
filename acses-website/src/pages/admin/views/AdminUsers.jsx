import { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { exportToCsv } from "../lib/adminUtils";
import { fetchApi } from "../../../utils/api";
import {
  PageShell, PageHeader, TwoColLayout,
  Panel, PanelEmpty, FormPanel, FormActions,
  CardRow, RowActions, Pill,
  Field, Select, ExportBtn, BlockedAccess,
} from "../layout/adminUI";

const roles = ["super admin", "editor"];
const statuses = ["active", "disabled"];

const AdminUsers = () => {
  const { searchQuery, showToast, openConfirm, hasAccess } = useAdmin();
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ username: "", name: "", email: "", role: "editor", status: "active", password: "" });

  const loadUsers = async () => {
    try {
      const data = await fetchApi("/api/users", { auth: true });
      const list = Array.isArray(data) ? data : [];
      setUsers(list.map((item) => ({ id: item._id || item.id, ...item })));
    } catch (error) {
      console.error("Failed to load users:", error);
      setUsers([]);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const filtered = users.filter(
    (item) =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!hasAccess("users")) return <BlockedAccess message="Your role does not have permission to manage admin users." />;

  const resetForm = () => {
    setEditingId(null);
    setForm({ username: "", name: "", email: "", role: "editor", status: "active", password: "" });
  };

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.name) {
      showToast("Username, name and email are required.", "error");
      return;
    }
    if (!editingId && !form.password) {
      showToast("Password is required for new users.", "error");
      return;
    }
    const payload = { username: form.username, name: form.name, email: form.email, role: form.role, status: form.status };
    if (form.password) payload.password = form.password;

    try {
      if (editingId) {
        await fetchApi(`/api/users/${editingId}`, { method: "PUT", body: JSON.stringify(payload), auth: true });
        setUsers(users.map((item) => (item.id === editingId ? { ...item, ...payload, id: editingId, password: undefined } : item)));
        showToast("User updated.");
      } else {
        const result = await fetchApi("/api/users", { method: "POST", body: JSON.stringify({ ...payload, password: form.password }), auth: true });
        const newId = result?.id || result?._id;
        setUsers([...users, { ...payload, id: newId || `user-${Date.now()}`, password: undefined }]);
        showToast("User added.");
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to save user.", "error");
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({ username: item.username, name: item.name, email: item.email, role: item.role, status: item.status, password: "" });
  };

  const handleDelete = (id) => {
    openConfirm({
      message: "Remove this admin user?",
      onConfirm: async () => {
        try {
          await fetchApi(`/api/users/${id}`, { method: "DELETE", auth: true });
          setUsers(users.filter((item) => item.id !== id));
          showToast("User deleted.");
        } catch (error) {
          showToast(error instanceof Error ? error.message : "Delete failed.", "error");
        }
      },
    });
  };

  return (
    <PageShell>
      <PageHeader
        title="Users & Admins"
        subtitle="Manage who can access the admin panel with role-based permissions."
        badge={users.length}
      />

      <TwoColLayout>
        {/* ── User list ── */}
        <Panel
          toolbar={
            <>
              <p className="text-sm font-medium text-acses-yellow-100/60">
                {filtered.length} {filtered.length === 1 ? "user" : "users"}
              </p>
              <ExportBtn onClick={() => exportToCsv("acses-admin-users.csv", users)} />
            </>
          }
        >
          <div className="divide-y divide-acses-green-800">
            {filtered.length === 0 ? (
              <PanelEmpty message="No users found." hint="Add a new admin user using the form on the right." />
            ) : (
              filtered.map((user) => (
                <CardRow key={user.id} isActive={editingId === user.id}>
                  <div className="flex items-center gap-4 justify-between">
                    {/* Avatar initial */}
                    <div className="w-10 h-10 rounded-xl bg-acses-green-800 border border-acses-green-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-acses-yellow-400 uppercase">
                        {(user.name || user.username || "?")[0]}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Pill label={user.role} variant={user.role === "super admin" ? "active" : "green"} />
                        <Pill label={user.status} variant={user.status === "active" ? "green" : "muted"} />
                      </div>
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <div className="mt-0.5 flex items-center gap-3 text-[11px] text-white/30">
                        <span>@{user.username}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20 inline-block" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    </div>

                    <RowActions onEdit={() => handleEdit(user)} onDelete={() => handleDelete(user.id)} />
                  </div>
                </CardRow>
              ))
            )}
          </div>
        </Panel>

        {/* ── Form ── */}
        <FormPanel title={editingId ? "Edit Admin User" : "Add Admin User"}>
          {editingId && (
            <p className="text-xs text-white/40 -mt-1">Leave password blank to keep the current password.</p>
          )}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Username" value={form.username} onChange={(v) => setForm({ ...form, username: v })} placeholder="johndoe" />
            <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="John Doe" />
          </div>
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="john@example.com" />
          <Field
            label={editingId ? "New Password (optional)" : "Password"}
            type="password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            placeholder={editingId ? "Leave blank to keep current" : "Set a secure password"}
          />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Role" value={form.role} options={roles} onChange={(v) => setForm({ ...form, role: v })} />
            <Select label="Status" value={form.status} options={statuses} onChange={(v) => setForm({ ...form, status: v })} />
          </div>

          {/* Role hint */}
          <div className="rounded-2xl bg-acses-green-800/60 border border-acses-green-700 px-4 py-3 flex items-start gap-3">
            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${form.role === "super admin" ? "bg-acses-yellow-400" : "bg-white/30"}`} />
            <p className="text-xs text-white/50 leading-relaxed">
              {form.role === "super admin"
                ? "Super admins have full access to all sections and settings."
                : "Editors have limited access based on assigned permissions."}
            </p>
          </div>

          <FormActions
            editingId={editingId}
            onCancel={resetForm}
            onSubmit={handleSubmit}
            submitLabel={editingId ? "Save User" : "Add User"}
          />
        </FormPanel>
      </TwoColLayout>
    </PageShell>
  );
};

export default AdminUsers;