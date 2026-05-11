import React, { useEffect, useMemo, useState } from "react";
import { useAdmin } from "./AdminContext";
import { fetchApi } from "../../utils/api";
import { formatDate } from "./adminUtils";

const AdminOverview = () => {
  const { searchQuery } = useAdmin();
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [home, setHome] = useState({ statistics: {} });

  useEffect(() => {
    const loadOverview = async () => {
      try {
        // Fetch dashboard data in parallel because none of these requests depend on another.
        const [eventsData, projectsData, usersData, announcementsData, homeData] = await Promise.all([
          fetchApi("/api/events"),
          fetchApi("/api/student-projects"),
          fetchApi("/api/users"),
          fetchApi("/api/announcements"),
          fetchApi("/api/home"),
        ]);
        setEvents(eventsData.map((item) => ({ id: item._id || item.id, ...item })));
        setProjects(projectsData.map((item) => ({ id: item._id || item.id, ...item, technologies: Array.isArray(item.technologies) ? item.technologies : [] })));
        setUsers(usersData.map((item) => ({ id: item._id || item.id, ...item })));
        setAnnouncements(announcementsData.map((item) => ({ id: item._id || item.id, ...item })));
        setHome(homeData || { statistics: {} });
      } catch (error) {
        console.error("Failed to load overview data from API:", error);
        setEvents([]);
        setProjects([]);
        setUsers([]);
        setAnnouncements([]);
        setHome({ statistics: {} });
      }
    };
    loadOverview();
  }, []);

  const filteredEvents = useMemo(
    () => events.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.venue.toLowerCase().includes(searchQuery.toLowerCase())),
    [events, searchQuery]
  );

  const eventsByMonth = useMemo(() => {
    // Convert event dates into monthly counts for the lightweight bar chart.
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const counts = Array(12).fill(0);
    events.forEach((event) => {
      const date = new Date(event.date);
      if (!Number.isNaN(date.getMonth())) {
        counts[date.getMonth()] += 1;
      }
    });
    return months.map((label, index) => ({ label, value: counts[index] }));
  }, [events]);

  const roleDistribution = useMemo(() => {
    // Calculate role percentages from the current admin user list.
    const roleCounts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
    const total = users.length || 1;
    return Object.entries(roleCounts).map(([role, count]) => ({ role, count, percent: Math.round((count / total) * 100) }));
  }, [users]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard label="Total Members" value={home.statistics.members || 0} />
        <DashboardCard label="Upcoming Events" value={events.filter((item) => item.status === "upcoming").length} />
        <DashboardCard label="Active Projects" value={projects.filter((item) => item.approved).length} />
        <DashboardCard label="Published News" value={announcements.filter((item) => item.status === "published").length} />
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-semibold text-white">Events per month</h2>
              <p className="text-sm text-acses-yellow-100">Track event planning and attendance.</p>
            </div>
            <span className="rounded-full bg-acses-yellow-400 px-3 py-1 text-xs font-semibold uppercase tracking-[.2em] text-acses-green-900">Live</span>
          </div>
          <div className="space-y-4">
            {eventsByMonth.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="h-3 rounded-full bg-acses-green-800">
                  <div style={{ width: `${Math.min(item.value * 20, 100)}%` }} className="h-full rounded-full bg-acses-yellow-400"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <h2 className="text-xl font-semibold text-white">Admin role distribution</h2>
          <p className="mt-2 text-sm text-acses-yellow-100">Current roles with access to the panel.</p>
          <div className="mt-6 space-y-4">
            {roleDistribution.map((entry) => (
              <div key={entry.role} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span className="capitalize">{entry.role}</span>
                  <span>{entry.count} ({entry.percent}%)</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-acses-green-800">
                  <div style={{ width: `${entry.percent}%` }} className="h-full rounded-full bg-acses-yellow-400"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Recent events</h2>
            <p className="text-sm text-acses-yellow-100">Filtered by your search query.</p>
          </div>
          <span className="rounded-full bg-acses-green-800 px-3 py-1 text-xs uppercase tracking-[.2em] text-acses-yellow-200">{filteredEvents.length} items</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filteredEvents.slice(0, 4).map((event) => (
            <div key={event.id} className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-4">
              <div className="flex items-center justify-between gap-3 text-sm text-acses-yellow-100">
                <span>{formatDate(event.date)}</span>
                <span className="rounded-full bg-acses-green-800 px-2 py-1 text-xs uppercase text-acses-yellow-100">{event.status}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{event.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{event.venue}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const DashboardCard = ({ label, value }) => (
  <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
    <p className="text-sm uppercase tracking-[.2em] text-acses-yellow-200">{label}</p>
    <p className="mt-4 text-4xl font-semibold text-white">{value}</p>
  </div>
);

export default AdminOverview;


