import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { fetchApi } from "../../../utils/api";
import { 
  BookOpen, 
  Wrench, 
  Briefcase, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Link as LinkIcon, 
  FileText, 
  Shapes,
  Edit3,
  X
} from "lucide-react";

const emptyGrouped = { academic: [], tools: [], career: [] };

const AdminResources = () => {
  const { hasAccess, showToast, openConfirm } = useAdmin();
  const [resources, setResources] = useState(emptyGrouped);
  const [activeTab, setActiveTab] = useState("academic");
  
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ 
    type: "academic", 
    title: "", 
    description: "", 
    url: "", 
    icon: "" 
  });

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
      icon: res.icon || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    openConfirm({
      message: "Permanently delete this resource?",
      onConfirm: async () => {
        try {
          await fetchApi(`/api/resources/${id}`, { method: "DELETE", auth: true });
          showToast("Deleted");
          load();
        } catch (e) { showToast("Error", "error"); }
      }
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ type: activeTab, title: "", description: "", url: "", icon: "" });
  };

  if (!hasAccess("resources")) return <BlockedAccess />;

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Resource Hub</h1>
        <p className="text-acses-yellow-100/60 mt-1">Manage links and tools available to the student body.</p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_0.6fr]">
        
        {/* Resource List Section */}
        <section className="space-y-6">
          <div className="flex p-1.5 bg-acses-green-900/60 border border-acses-green-800 rounded-2xl w-fit">
            <TabBtn active={activeTab === "academic"} onClick={() => setActiveTab("academic")} icon={<BookOpen size={16}/>} label="Academic" />
            <TabBtn active={activeTab === "tools"} onClick={() => setActiveTab("tools")} icon={<Wrench size={16}/>} label="Tools" />
            <TabBtn active={activeTab === "career"} onClick={() => setActiveTab("career")} icon={<Briefcase size={16}/>} label="Career" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {resources[activeTab].map((res) => (
              <div key={res._id || res.id} className="p-6 rounded-3xl border border-acses-green-800 bg-acses-green-900/40 flex flex-col justify-between shadow-lg hover:border-acses-green-600 transition-all">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 rounded-xl bg-acses-green-800 text-acses-yellow-400 border border-acses-green-700">
                      <Shapes size={20} />
                    </div>
                    {/* Fixed Action Buttons - No Hover Required */}
                    <div className="flex gap-1 bg-acses-green-950/40 p-1 rounded-xl border border-acses-green-800">
                        <button onClick={() => handleEdit(res)} className="p-2 text-acses-yellow-400/70 hover:text-acses-yellow-400 transition-colors">
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => handleDelete(res._id || res.id)} className="p-2 text-red-400/70 hover:text-red-400 transition-colors">
                          <Trash2 size={18} />
                        </button>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg">{res.title}</h3>
                  <p className="text-white/50 text-sm mt-2 line-clamp-2 leading-relaxed">{res.description}</p>
                </div>
                
                <a href={res.url} target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-acses-green-800 text-white text-xs font-bold uppercase tracking-widest hover:bg-acses-green-700 transition-colors border border-acses-green-700">
                  Verify Link <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Form Section */}
        <aside className="sticky top-6 h-fit rounded-3xl border border-acses-green-800 bg-acses-green-900 p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-acses-yellow-400 rounded-xl text-acses-green-950">
                  {editingId ? <Edit3 size={20}/> : <Plus size={20} />}
                </div>
                <h2 className="text-xl font-bold text-white">{editingId ? "Edit Resource" : "Add Resource"}</h2>
            </div>
            {editingId && (
                <button onClick={resetForm} className="p-2 bg-acses-green-800 text-white/40 hover:text-white rounded-full transition-colors">
                    <X size={18} />
                </button>
            )}
          </div>

          <div className="space-y-5">
            <ModernSelect 
              label="Category" 
              value={form.type} 
              options={["academic", "tools", "career"]} 
              onChange={v => setForm({...form, type: v})} 
            />
            
            <ModernInput label="Title" icon={<FileText size={14}/>} value={form.title} onChange={v => setForm({...form, title: v})} placeholder="Resource name" />
            <ModernInput label="URL" icon={<LinkIcon size={14}/>} value={form.url} onChange={v => setForm({...form, url: v})} placeholder="https://..." />
            <ModernInput label="Icon Key" icon={<Shapes size={14}/>} value={form.icon} onChange={v => setForm({...form, icon: v})} placeholder="e.g. book, code" />
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-acses-yellow-100/50 uppercase tracking-widest ml-1">Description</label>
              <textarea 
                rows="3" 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})}
                className="w-full bg-acses-green-800/50 border border-acses-green-700 text-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-acses-yellow-400 resize-none transition-all placeholder:text-white/5"
                placeholder="What is this resource?"
              />
            </div>

            <button onClick={handleSave} className="w-full mt-4 bg-acses-yellow-400 text-acses-green-950 font-bold py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg">
              {editingId ? "Update Resource" : "Create Resource"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

/* --- Helpers --- */

const TabBtn = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-acses-yellow-400 text-acses-green-950 shadow-md' : 'text-white/50 hover:text-white'}`}>
    {icon} {label}
  </button>
);

const ModernInput = ({ label, value, onChange, placeholder, icon }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-2 text-xs font-bold text-acses-yellow-100/50 uppercase tracking-widest ml-1">{icon} {label}</label>
    <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-acses-green-800/50 border border-acses-green-700 text-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-acses-yellow-400 transition-all placeholder:text-white/5" />
  </div>
);

const ModernSelect = ({ label, value, options, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-acses-yellow-100/50 uppercase tracking-widest ml-1">{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)} className="w-full bg-acses-green-800/50 border border-acses-green-700 text-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-acses-yellow-400">
      {options.map(o => <option key={o} value={o} className="bg-acses-green-900">{o}</option>)}
    </select>
  </div>
);

const BlockedAccess = () => (
  <div className="rounded-3xl border border-red-700 bg-acses-green-950 p-10 text-center shadow-2xl">
    <h2 className="text-2xl font-bold text-white italic">Access Denied</h2>
    <p className="mt-2 text-acses-yellow-100/60">Insufficient permissions.</p>
  </div>
);

export default AdminResources;