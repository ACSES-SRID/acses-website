import React, { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { exportToCsv, formatDate } from "../lib/adminUtils";
import { fetchApi, unwrapList } from "../../../utils/api";
import { Calendar, MapPin } from "lucide-react";
import {
  PageShell, PageHeader, TwoColLayout,
  Panel, PanelEmpty, FormPanel, FormActions,
  CardRow, RowActions, Pill,
  Field, TextArea, Select, ExportBtn, BlockedAccess, Pagination,
} from "./adminUI";

const categories = ["seminar", "workshop", "social"];
const statuses = ["upcoming", "ongoing", "past"];

const statusVariant = { upcoming: "active", ongoing: "green", past: "muted" };

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
      setEvents(list.map((item) => ({ id: item._id || item.id, ...item })));
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

  const pagedEvents = useMemo(() => filteredEvents.slice(pageIndex * 8, pageIndex * 8 + 8), [filteredEvents, pageIndex]);
  const pageCount = Math.ceil(filteredEvents.length / 8);

  const resetForm = () => {
    setForm({ title: "", date: "", venue: "", description: "", category: "seminar", status: "upcoming", flyer: "" });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.date || !form.venue) {
      showToast("Required fields: Title, Date, Venue", "error");
      return;
    }
    try {
      if (editingId) {
        await fetchApi(`/api/events/${editingId}`, { method: "PUT", body: JSON.stringify(form), auth: true });
        setEvents(events.map((item) => (item.id === editingId ? { ...item, ...form } : item)));
        showToast("Event updated successfully.");
      } else {
        const result = await fetchApi("/api/events", { method: "POST", body: JSON.stringify(form), auth: true });
        setEvents([...events, { ...form, id: result?.id || result?._id || `ev-${Date.now()}` }]);
        showToast("Event created successfully.");
      }
      resetForm();
    } catch (error) {
      showToast("Action failed.", "error");
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setForm({
      title: event.title,
      date: event.date,
      venue: event.venue,
      description: event.description || "",
      category: event.category,
      status: event.status,
      flyer: event.flyer || "",
    });
  };

  const handleDelete = (id) => {
    openConfirm({
      message: "Delete this event?",
      onConfirm: async () => {
        try {
          await fetchApi(`/api/events/${id}`, { method: "DELETE", auth: true });
          setEvents(events.filter((e) => e.id !== id));
          showToast("Event deleted.");
        } catch (error) {
          showToast("Delete failed.", "error");
        }
      },
    });
  };

  if (!hasAccess("events")) return <BlockedAccess message="Your role does not have permission to manage events." />;

  return (
    <PageShell>
      <PageHeader
        title="Events"
        subtitle="Organize and track association activities."
        badge={events.length}
        action={<ExportBtn onClick={() => exportToCsv("acses-events.csv", events)} />}
      />

      <TwoColLayout>
        {/* ── List ── */}
        <Panel
          toolbar={
            <>
              <p className="text-sm font-medium text-acses-yellow-100/60">
                {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
              </p>
              {/* Inline filters */}
              <div className="flex items-center gap-2">
                <select
                  value={filter.category}
                  onChange={(e) => { setFilter((p) => ({ ...p, category: e.target.value })); setPageIndex(0); }}
                  className="rounded-xl bg-acses-green-800 border border-acses-green-700 text-white/70 text-xs px-3 py-1.5 outline-none"
                >
                  <option value="all">All categories</option>
                  {categories.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
                </select>
                <select
                  value={filter.status}
                  onChange={(e) => { setFilter((p) => ({ ...p, status: e.target.value })); setPageIndex(0); }}
                  className="rounded-xl bg-acses-green-800 border border-acses-green-700 text-white/70 text-xs px-3 py-1.5 outline-none"
                >
                  <option value="all">All statuses</option>
                  {statuses.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
                </select>
              </div>
            </>
          }
        >
          <div className="divide-y divide-acses-green-800">
            {pagedEvents.length === 0 ? (
              <PanelEmpty message="No events found." hint="Try adjusting your filters or add a new event." />
            ) : (
              pagedEvents.map((event) => (
                <CardRow key={event.id} isActive={editingId === event.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Pill label={event.status} variant={statusVariant[event.status] || "muted"} />
                        <Pill label={event.category} variant="green" />
                      </div>
                      <p className="text-sm font-semibold text-white truncate">{event.title}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-white/30">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(event.date)}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.venue}</span>
                      </div>
                    </div>
                    <RowActions onEdit={() => handleEdit(event)} onDelete={() => handleDelete(event.id)} />
                  </div>
                </CardRow>
              ))
            )}
          </div>
          <Pagination count={pageCount} pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </Panel>

        {/* ── Form ── */}
        <FormPanel title={editingId ? "Edit Event" : "New Event"}>
          <Field label="Event Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="e.g. Annual General Meeting" />
          <Field label="Venue" value={form.venue} onChange={(v) => setForm({ ...form, venue: v })} placeholder="Main Auditorium" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
            <Select label="Category" value={form.category} options={categories} onChange={(v) => setForm({ ...form, category: v })} />
          </div>
          <Select label="Status" value={form.status} options={statuses} onChange={(v) => setForm({ ...form, status: v })} />
          <TextArea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Brief event description…" rows={3} />
          <FormActions
            editingId={editingId}
            onCancel={resetForm}
            onSubmit={handleSubmit}
            submitLabel={editingId ? "Save Changes" : "Publish Event"}
          />
        </FormPanel>
      </TwoColLayout>
    </PageShell>
  );
};

export default AdminEvents;