import React, { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { exportToCsv, formatDate } from "../lib/adminUtils";
import { fetchApi, unwrapList } from "../../../utils/api";

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
      console.error("Failed to load events from API:", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const saveEvents = (updated) => {
    setEvents(updated);
  };

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        if (filter.category !== "all" && event.category !== filter.category) return false;
        if (filter.status !== "all" && event.status !== filter.status) return false;
        return (
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (event.description || "").toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
      .slice(pageIndex * 6, pageIndex * 6 + 6);
  }, [events, filter, searchQuery, pageIndex]);

  const handleSubmit = async () => {
    if (!form.title || !form.date || !form.venue) {
      showToast("Title, date and venue are required.", "error");
      return;
    }

    const payload = {
      title: form.title,
      date: form.date,
      venue: form.venue,
      description: form.description,
      category: form.category,
      status: form.status,
      flyer: form.flyer,
    };

    try {
      if (editingId) {
        await fetchApi(`/api/events/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          auth: true,
        });
        const updated = events.map((item) => (item.id === editingId ? { ...item, ...payload } : item));
        saveEvents(updated);
        showToast("Event updated successfully.");
      } else {
        const result = await fetchApi("/api/events", {
          method: "POST",
          body: JSON.stringify(payload),
          auth: true,
        });
        const newId = result?.id || result?._id;
        const next = [...events, { ...payload, id: newId || `event-${Date.now()}` }];
        saveEvents(next);
        showToast("Event created successfully.");
      }
    } catch (error) {
      console.error("API save failed:", error);
      showToast(error instanceof Error ? error.message : "Failed to save event.", "error");
    }

    setForm({ title: "", date: "", venue: "", description: "", category: "seminar", status: "upcoming", flyer: "" });
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      date: item.date,
      venue: item.venue,
      description: item.description,
      category: item.category,
      status: item.status,
      flyer: item.flyer,
    });
  };

  const handleDelete = (id) => {
    openConfirm({
      message: "Delete this event permanently?",
      onConfirm: async () => {
        try {
          await fetchApi(`/api/events/${id}`, { method: "DELETE", auth: true });
          saveEvents(events.filter((item) => item.id !== id));
          showToast("Event deleted.");
        } catch (error) {
          console.error("API delete failed:", error);
          showToast(error instanceof Error ? error.message : "Delete failed.", "error");
        }
      },
    });
  };

  const allEventsCount = events.filter((event) => {
    if (filter.category !== "all" && event.category !== filter.category) return false;
    if (filter.status !== "all" && event.status !== filter.status) return false;
    return (
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }).length;

  if (!hasAccess("events")) {
    return <BlockedAccess />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Events Management" description="Create and manage association events with status and flyer details." />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <select value={filter.category} onChange={(e) => setFilter((prev) => ({ ...prev, category: e.target.value }))} className="rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-2 text-white outline-none">
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select value={filter.status} onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value }))} className="rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-2 text-white outline-none">
              <option value="all">All statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button onClick={() => exportToCsv("acses-events.csv", events)} className="rounded-2xl bg-acses-yellow-400 px-4 py-2 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-acses-green-800 bg-acses-green-900">
            <table className="min-w-full border-collapse text-left text-sm text-white/70">
              <thead className="bg-acses-green-900 text-acses-yellow-100">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Venue</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="border-t border-acses-green-800 last:border-b last:border-acses-green-800 hover:bg-acses-green-900/60">
                    <td className="px-4 py-3 text-white">{event.title}</td>
                    <td className="px-4 py-3">{formatDate(event.date)}</td>
                    <td className="px-4 py-3">{event.venue}</td>
                    <td className="px-4 py-3 capitalize">{event.category}</td>
                    <td className="px-4 py-3 capitalize">{event.status}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button onClick={() => handleEdit(event)} className="rounded-2xl bg-acses-green-800 px-3 py-2 text-xs text-acses-yellow-300 hover:bg-acses-green-700">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(event.id)} className="rounded-2xl bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-500">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredEvents.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-acses-yellow-200">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination count={Math.ceil(allEventsCount / 6)} pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </div>

        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <h2 className="text-lg font-semibold text-white">{editingId ? "Edit event" : "Create new event"}</h2>
          <div className="mt-5 space-y-4">
            <Input label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
            <Input label="Venue" value={form.venue} onChange={(value) => setForm({ ...form, venue: value })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Date" type="date" value={form.date} onChange={(value) => setForm({ ...form, date: value })} />
              <div>
                <label className="text-sm font-medium text-white/70">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none">
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-white/70">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none">
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <TextArea label="Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} />
            <Input label="Flyer image URL" value={form.flyer} onChange={(value) => setForm({ ...form, flyer: value })} />
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setForm({ title: "", date: "", venue: "", description: "", category: "seminar", status: "upcoming", flyer: "" });
                  }}
                  className="rounded-2xl border border-acses-green-800 px-4 py-3 text-sm text-white/80 hover:bg-acses-green-800"
                >
                  Cancel
                </button>
              )}
              <button onClick={handleSubmit} className="rounded-2xl bg-acses-yellow-400 px-4 py-3 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">
                {editingId ? "Save changes" : "Create event"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlockedAccess = () => (
  <div className="rounded-3xl border border-red-700 bg-acses-green-900 p-6 text-white/80">
    <p className="text-lg font-semibold">Access denied</p>
    <p className="mt-2 text-sm text-acses-yellow-100">Your role does not have permission to manage events.</p>
  </div>
);

const PageHeader = ({ title, description }) => (
  <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 shadow-xl shadow-acses-green-900/20">
    <h1 className="text-2xl font-semibold text-white">{title}</h1>
    <p className="mt-2 text-sm text-acses-yellow-100">{description}</p>
  </div>
);

const Input = ({ label, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none" />
  </div>
);

const TextArea = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <textarea rows="4" value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none" />
  </div>
);

const Pagination = ({ count, pageIndex, setPageIndex }) => {
  if (count <= 1) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/70">
      {Array.from({ length: count }, (_, index) => (
        <button key={index} onClick={() => setPageIndex(index)} className={`rounded-2xl px-4 py-2 ${pageIndex === index ? "bg-acses-yellow-400 text-acses-green-900" : "bg-acses-green-800 text-white/70 hover:bg-acses-green-700"}`}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default AdminEvents;
