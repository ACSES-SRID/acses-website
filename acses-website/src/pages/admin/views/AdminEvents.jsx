import React, { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { exportToCsv, formatDate } from "../lib/adminUtils";
import { fetchApi, unwrapList } from "../../../utils/api";
import { 
  Calendar, 
  MapPin, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  Filter, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";

const categories = ["seminar", "workshop", "social"];
const statuses = ["upcoming", "ongoing", "past"];

const AdminEvents = () => {
  const { searchQuery, showToast, openConfirm, hasAccess } = useAdmin();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", venue: "", description: "", category: "seminar", status: "upcoming", flyer: "" });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState({ category: "all", status: "all" });
  const [pageIndex, setPageIndex] = useState(0);

  const loadEvents = async () => {
    try {
      const data = await fetchApi("/api/events?limit=100");
      const list = unwrapList(data);
      const normalized = list.map((item) => ({
        id: item._id || item.id,
        ...item,
      }));
      setEvents(normalized);
    } catch (error) {
      console.error("Failed to load events:", error);
      setEvents([]);
    }
  };

  useEffect(() => { loadEvents(); }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (filter.category !== "all" && event.category !== filter.category) return false;
      if (filter.status !== "all" && event.status !== filter.status) return false;
      return (
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [events, filter, searchQuery]);

  const pagedEvents = useMemo(() => {
    return filteredEvents.slice(pageIndex * 6, pageIndex * 6 + 6);
  }, [filteredEvents, pageIndex]);

  const handleSubmit = async () => {
    if (!form.title || !form.date || !form.venue) {
      showToast("Required fields: Title, Date, Venue", "error");
      return;
    }

    try {
      if (editingId) {
        await fetchApi(`/api/events/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(form),
          auth: true,
        });
        setEvents(events.map((item) => (item.id === editingId ? { ...item, ...form } : item)));
        showToast("Event updated successfully.");
      } else {
        const result = await fetchApi("/api/events", {
          method: "POST",
          body: JSON.stringify(form),
          auth: true,
        });
        setEvents([...events, { ...form, id: result?.id || result?._id || `ev-${Date.now()}` }]);
        showToast("Event created successfully.");
      }
      resetForm();
    } catch (error) {
      showToast("Action failed.", "error");
    }
  };

  const resetForm = () => {
    setForm({ title: "", date: "", venue: "", description: "", category: "seminar", status: "upcoming", flyer: "" });
    setEditingId(null);
  };

  if (!hasAccess("events")) return <BlockedAccess />;

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Events Management</h1>
          <p className="text-acses-yellow-100/60 mt-1">Organize and track association activities.</p>
        </div>
        <button 
          onClick={() => exportToCsv("acses-events.csv", events)} 
          className="flex items-center gap-2 bg-acses-green-800 text-acses-yellow-100 px-5 py-2.5 rounded-2xl border border-acses-green-700 hover:bg-acses-green-700 transition-all"
        >
          <Download size={18} />
          <span>Export Data</span>
        </button>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
        {/* Left: Table Section */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 bg-acses-green-900/40 p-4 rounded-3xl border border-acses-green-800">
            <div className="flex items-center gap-2 text-white/50 px-2">
              <Filter size={16} />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <select 
              value={filter.category} 
              onChange={(e) => setFilter(p => ({ ...p, category: e.target.value }))}
              className="bg-acses-green-800/50 text-white text-sm rounded-xl px-4 py-2 border-none focus:ring-1 focus:ring-acses-yellow-400"
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
            </select>
            <select 
              value={filter.status} 
              onChange={(e) => setFilter(p => ({ ...p, status: e.target.value }))}
              className="bg-acses-green-800/50 text-white text-sm rounded-xl px-4 py-2 border-none focus:ring-1 focus:ring-acses-yellow-400"
            >
              <option value="all">All Statuses</option>
              {statuses.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
            </select>
          </div>

          <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900/50 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-acses-green-800/50 text-acses-yellow-100 font-semibold border-b border-acses-green-800">
                <tr>
                  <th className="px-6 py-4">Event Details</th>
                  <th className="px-6 py-4 hidden md:table-cell">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-acses-green-800">
                {pagedEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-acses-green-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-white font-semibold">{event.title}</p>
                      <div className="flex items-center gap-3 text-white/40 text-xs mt-1">
                        <span className="flex items-center gap-1"><Calendar size={12}/> {formatDate(event.date)}</span>
                        <span className="flex items-center gap-1"><MapPin size={12}/> {event.venue}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell capitalize text-white/70">{event.category}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={event.status} />
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => setEditingId(event.id) || setForm(event)} className="p-2 text-white/50 hover:text-acses-yellow-400 transition-colors">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(event.id)} className="p-2 text-white/50 hover:text-red-400 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredEvents.length === 0 && (
              <div className="p-12 text-center text-white/40 italic">No events found matching your criteria.</div>
            )}
          </div>
          <Pagination count={Math.ceil(filteredEvents.length / 6)} pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </section>

        {/* Right: Form Section */}
        <aside className="sticky top-6 h-fit rounded-3xl border border-acses-green-800 bg-acses-green-900 p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-acses-yellow-400 rounded-xl text-acses-green-900">
              {editingId ? <Edit3 size={20}/> : <Plus size={20}/>}
            </div>
            <h2 className="text-xl font-bold text-white">{editingId ? "Update Event" : "Add Event"}</h2>
          </div>
          
          <div className="space-y-5">
            <ModernInput label="Event Title" value={form.title} onChange={v => setForm({...form, title: v})} placeholder="e.g. Annual General Meeting" />
            <ModernInput label="Venue" value={form.venue} onChange={v => setForm({...form, venue: v})} placeholder="Main Auditorium" />
            
            <div className="grid grid-cols-2 gap-4">
              <ModernInput label="Date" type="date" value={form.date} onChange={v => setForm({...form, date: v})} />
              <ModernSelect label="Category" value={form.category} options={categories} onChange={v => setForm({...form, category: v})} />
            </div>

            <ModernSelect label="Current Status" value={form.status} options={statuses} onChange={v => setForm({...form, status: v})} />
            <ModernTextArea label="Description" value={form.description} onChange={v => setForm({...form, description: v})} />
            
            <div className="pt-4 flex flex-col gap-3">
              <button onClick={handleSubmit} className="w-full bg-acses-yellow-400 text-acses-green-900 font-bold py-3 rounded-2xl hover:scale-[1.02] transition-transform">
                {editingId ? "Save Changes" : "Publish Event"}
              </button>
              {editingId && (
                <button onClick={resetForm} className="w-full text-white/50 text-sm hover:text-white transition-colors">
                  Cancel Editing
                </button>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

/* Helper Components */

const StatusBadge = ({ status }) => {
  const styles = {
    upcoming: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    ongoing: "bg-green-500/10 text-green-400 border-green-500/20",
    past: "bg-white/5 text-white/40 border-white/10"
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
};

const ModernInput = ({ label, value, onChange, type = "text", placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-acses-yellow-100/50 uppercase tracking-widest">{label}</label>
    <input 
      type={type} 
      value={value} 
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-acses-green-800/50 border border-acses-green-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-acses-yellow-400 placeholder:text-white/20 transition-all"
    />
  </div>
);

const ModernSelect = ({ label, value, options, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-acses-yellow-100/50 uppercase tracking-widest">{label}</label>
    <select 
      value={value} 
      onChange={e => onChange(e.target.value)}
      className="w-full bg-acses-green-800/50 border border-acses-green-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-acses-yellow-400 capitalize"
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const ModernTextArea = ({ label, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-acses-yellow-100/50 uppercase tracking-widest">{label}</label>
    <textarea 
      rows="3" 
      value={value} 
      onChange={e => onChange(e.target.value)}
      className="w-full bg-acses-green-800/50 border border-acses-green-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-acses-yellow-400 resize-none"
    />
  </div>
);

const Pagination = ({ count, pageIndex, setPageIndex }) => {
  if (count <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button 
        disabled={pageIndex === 0} 
        onClick={() => setPageIndex(p => p - 1)}
        className="p-2 text-white/50 hover:text-white disabled:opacity-20"
      ><ChevronLeft /></button>
      <span className="text-sm text-white/40">Page {pageIndex + 1} of {count}</span>
      <button 
        disabled={pageIndex === count - 1} 
        onClick={() => setPageIndex(p => p + 1)}
        className="p-2 text-white/50 hover:text-white disabled:opacity-20"
      ><ChevronRight /></button>
    </div>
  );
};

export default AdminEvents;