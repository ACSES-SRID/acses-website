import { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { exportToCsv } from "../lib/adminUtils";
import { fetchApi } from "../../../utils/api";

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
      const normalized = list.map((item) => ({
        id: item._id || item.id,
        ...item,
      }));
      setUsers(normalized);
    } catch (error) {
      console.error("Failed to load users from API:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const saveUsers = (updated) => {
    setUsers(updated);
  };

  const filtered = users.filter((item) => {
    return (
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (!hasAccess("users")) {
    return <BlockedAccess />;
  }

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.name) {
      showToast("Username, name and email are required.", "error");
      return;
    }
    if (!editingId && !form.password) {
      showToast("Password is required for new users.", "error");
      return;
    }

    const payload = {
      username: form.username,
      name: form.name,
      email: form.email,
      role: form.role,
      status: form.status,
    };
    if (form.password) {
      payload.password = form.password;
    }

    try {
      if (editingId) {
        await fetchApi(`/api/users/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          auth: true,
        });
        saveUsers(users.map((item) => (item.id === editingId ? { ...item, ...payload, id: editingId, password: undefined } : item)));
        showToast("User updated.");
      } else {
        const result = await fetchApi("/api/users", {
          method: "POST",
          body: JSON.stringify({ ...payload, password: form.password }),
          auth: true,
        });
        const newId = result?.id || result?._id;
        saveUsers([...users, { ...payload, id: newId || `user-${Date.now()}`, password: undefined }]);
        showToast("User added.");
      }
    } catch (error) {
      console.error("API save failed:", error);
      showToast(error instanceof Error ? error.message : "Failed to save user.", "error");
    }

    setEditingId(null);
    setForm({ username: "", name: "", email: "", role: "editor", status: "active", password: "" });
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
          saveUsers(users.filter((item) => item.id !== id));
          showToast("User deleted.");
        } catch (error) {
          console.error("API delete failed:", error);
          showToast(error instanceof Error ? error.message : "Delete failed.", "error");
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Users / Admins" subtitle="Manage who can access the admin panel with role-based permissions." />

      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button onClick={() => exportToCsv("acses-admin-users.csv", users)} className="rounded-2xl bg-acses-yellow-400 px-4 py-2 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-acses-green-800 bg-acses-green-900">
          <table className="min-w-full border-collapse text-left text-sm text-white/70">
            <thead className="bg-acses-green-900 text-acses-yellow-100">
              <tr>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-t border-acses-green-800 last:border-b last:border-acses-green-800 hover:bg-acses-green-900/60">
                  <td className="px-4 py-3 text-white">{user.username}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                  <td className="px-4 py-3 capitalize">{user.status}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button onClick={() => handleEdit(user)} className="rounded-2xl bg-acses-green-800 px-3 py-2 text-xs text-acses-yellow-300 hover:bg-acses-green-700">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="rounded-2xl bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-acses-yellow-200">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
        <h2 className="text-lg font-semibold text-white">{editingId ? "Edit admin user" : "Add admin user"}</h2>
        {editingId && <p className="mt-2 text-xs text-white/50">Leave password blank to keep the current password.</p>}
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Username" value={form.username} onChange={(value) => setForm({ ...form, username: value })} />
          <Field label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
          <Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
          <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} />
          <Select label="Role" value={form.role} options={roles} onChange={(value) => setForm({ ...form, role: value })} />
          <Select label="Status" value={form.status} options={statuses} onChange={(value) => setForm({ ...form, status: value })} />
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm({ username: "", name: "", email: "", role: "editor", status: "active", password: "" });
              }}
              className="rounded-2xl border border-acses-green-800 px-4 py-3 text-sm text-white/80 hover:bg-acses-green-800"
            >
              Cancel
            </button>
          )}
          <button onClick={handleSubmit} className="rounded-2xl bg-acses-yellow-400 px-4 py-3 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">
            {editingId ? "Save user" : "Add user"}
          </button>
        </div>
      </div>
    </div>
  );
};

const BlockedAccess = () => (
  <div className="rounded-3xl border border-red-700 bg-acses-green-900 p-6 text-white/80">
    <p className="text-lg font-semibold">Access denied</p>
    <p className="mt-2 text-sm text-acses-yellow-100">Your role does not have permission to manage admin users.</p>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 shadow-xl shadow-acses-green-900/20">
    <h1 className="text-2xl font-semibold text-white">{title}</h1>
    <p className="mt-2 text-sm text-acses-yellow-100">{subtitle}</p>
  </div>
);

const Field = ({ label, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none" />
  </div>
);

const Select = ({ label, value, options, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default AdminUsers;
