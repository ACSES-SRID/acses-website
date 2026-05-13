import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { fetchApi } from "../../../utils/api";
import { 
  UserPlus, 
  UserCircle, 
  Image as ImageIcon, 
  Layers, 
  Edit3, 
  Trash2, 
  Type, 
  Hash 
} from "lucide-react";

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
        } catch (e) { showToast("Delete failed", "error"); }
      }
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", role: "", image: "", icon: "", description: "", order: 0 });
  };

  if (!hasAccess("executives")) {
    return (
      <div className="rounded-3xl border border-red-700 bg-acses-green-900 p-6 text-white/80">
        <p className="text-lg font-semibold">Access Denied</p>
        <p className="mt-2 text-sm text-acses-yellow-100">You do not have permission to manage the executive board.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Leadership & Executive Board</h1>
        <p className="text-acses-yellow-100/60 mt-1">Manage the profiles of current student association leaders.</p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_0.7fr]">
        
        {/* Left: Current Board Preview */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Current Board</h2>
            <span className="text-xs font-bold text-acses-yellow-400 uppercase tracking-widest bg-acses-green-800 px-3 py-1 rounded-full">
              {executives.length} Members
            </span>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {executives.sort((a,b) => a.order - b.order).map((member) => (
              <div key={member._id || member.id} className="group relative flex items-center gap-4 p-4 rounded-3xl border border-acses-green-800 bg-acses-green-900/40 hover:border-acses-green-600 transition-all">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-acses-green-800 border border-acses-green-700">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-acses-yellow-400/30">
                      <UserCircle size={32} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold truncate">{member.name}</h4>
                  <p className="text-acses-yellow-400/80 text-xs font-medium truncate uppercase tracking-wider">{member.role}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => { setEditingId(member._id || member.id); setForm(member); }} className="p-2 text-white/40 hover:text-acses-yellow-400 transition-colors">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => handleDelete(member._id || member.id)} className="p-2 text-white/40 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Management Form */}
        <aside className="sticky top-6 h-fit rounded-3xl border border-acses-green-800 bg-acses-green-900 p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-acses-yellow-400 rounded-xl text-acses-green-900">
              <UserPlus size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">{editingId ? "Update Profile" : "Add Executive"}</h2>
          </div>

          <div className="space-y-5">
            <div className="space-y-4">
              <ModernInput label="Full Name" icon={<Type size={14}/>} value={form.name} onChange={v => setForm({...form, name: v})} placeholder="John Doe" />
              <ModernInput label="Position" icon={<Layers size={14}/>} value={form.role} onChange={v => setForm({...form, role: v})} placeholder="e.g. President" />
              
              <div className="grid grid-cols-[1fr_80px] gap-4">
                <ModernInput label="Image URL" icon={<ImageIcon size={14}/>} value={form.image} onChange={v => setForm({...form, image: v})} placeholder="https://..." />
                <ModernInput label="Order" icon={<Hash size={14}/>} type="number" value={form.order} onChange={v => setForm({...form, order: v})} />
              </div>

              <ModernInput label="Icon Key" icon={<UserCircle size={14}/>} value={form.icon} onChange={v => setForm({...form, icon: v})} placeholder="e.g. shield" />
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-acses-yellow-100/50 uppercase tracking-widest ml-1">Bio / Description</label>
                <textarea 
                  rows="4" 
                  value={form.description} 
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full bg-acses-green-800/50 border border-acses-green-700 text-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-acses-yellow-400 resize-none transition-all"
                  placeholder="Tell us about this leader..."
                />
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button onClick={handleSave} className="w-full bg-acses-yellow-400 text-acses-green-950 font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-acses-yellow-400/10">
                {editingId ? "Save Changes" : "Confirm Appointment"}
              </button>
              {editingId && (
                <button onClick={resetForm} className="w-full text-white/40 text-sm hover:text-white transition-colors">
                  Discard Changes
                </button>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

/* Consistency Helper Components */

const ModernInput = ({ label, value, onChange, type = "text", placeholder, icon }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-2 text-xs font-bold text-acses-yellow-100/50 uppercase tracking-widest ml-1">
      {icon} {label}
    </label>
    <input 
      type={type} 
      value={value} 
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-acses-green-800/50 border border-acses-green-700 text-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-acses-yellow-400 placeholder:text-white/20 transition-all"
    />
  </div>
);

export default AdminLeadership;