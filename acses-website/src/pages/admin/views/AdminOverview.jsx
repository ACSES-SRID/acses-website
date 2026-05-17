import React, { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { fetchApi, unwrapList } from "../../../utils/api";
import { formatDate } from "../lib/adminUtils";
import { Users, Calendar, FolderOpen, Megaphone, MapPin } from "lucide-react";
import { PageShell } from "../layout/adminUI";

const AdminOverview = () => {
  const { searchQuery, hasAccess, currentUser } = useAdmin();
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [home, setHome] = useState({ statistics: {} });

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const [eventsData, announcementsData, homeData] = await Promise.all([
          fetchApi("/api/events?limit=100"),
          fetchApi("/api/announcements"),
          fetchApi("/api/home"),
        ]);
        setEvents(unwrapList(eventsData).map((item) => ({ id: item._id || item.id, ...item })));
        setAnnouncements((Array.isArray(announcementsData) ? announcementsData : []).map((item) => ({ id: item._id || item.id, ...item })));
        setHome(homeData || { statistics: {} });

        if (hasAccess("student-projects")) {
          try {
            const projectsData = await fetchApi("/api/student-projects/all?limit=100", { auth: true });
            setProjects(
              unwrapList(projectsData).map((item) => ({
                id: item._id || item.id,
                ...item,
                technologies: Array.isArray(item.technologies) ? item.technologies : [],
                approved: item.status === "approved",
              }))
            );
          } catch (e) { setProjects([]); }
        }

        if (hasAccess("users")) {
          try {
            const usersData = await fetchApi("/api/users", { auth: true });
            setUsers((Array.isArray(usersData) ? usersData : []).map((item) => ({ id: item._id || item.id, ...item })));
          } catch (e) { setUsers([]); }
        }
      } catch (error) {
        console.error("Failed to load overview data:", error);
      }
    };
    loadOverview();
  }, [currentUser, hasAccess]);

  const filteredEvents = useMemo(
    () =>
      events.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.venue.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [events, searchQuery]
  );

  const roleDistribution = useMemo(() => {
    const roleCounts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
    const total = users.length || 1;
    return Object.entries(roleCounts).map(([role, count]) => ({
      role,
      count,
      percent: Math.round((count / total) * 100),
    }));
  }, [users]);

  const stats = [
    { label: "Total Members", value: home.statistics?.members || 0, icon: <Users className="w-5 h-5" /> },
    { label: "Upcoming Events", value: events.filter((e) => e.status === "upcoming").length, icon: <Calendar className="w-5 h-5" /> },
    { label: "Approved Projects", value: projects.filter((p) => p.approved || p.status === "approved").length, icon: <FolderOpen className="w-5 h-5" /> },
    { label: "Published News", value: announcements.filter((a) => a.status === "published").length, icon: <Megaphone className="w-5 h-5" /> },
  ];

  const eventStatusStyle = {
    upcoming: "bg-acses-yellow-400/20 text-acses-yellow-300 border border-acses-yellow-400/30",
    ongoing: "bg-acses-green-800 text-acses-yellow-200 border border-acses-green-700",
    past: "bg-white/5 text-white/40 border border-white/10",
  };

  return (
    <PageShell>
      {/* ── Stat cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-md hover:border-acses-green-700 transition-colors"
          >
            <div className="p-2 rounded-xl bg-acses-green-800 text-acses-yellow-400 w-fit border border-acses-green-700">
              {stat.icon}
            </div>
            <div className="mt-5">
              <p className="text-3xl font-bold text-white leading-none">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-acses-yellow-100/50 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="grid gap-5 xl:grid-cols-3">
        {/* Recent Events */}
        <section className="xl:col-span-2 rounded-3xl border border-acses-green-800 bg-acses-green-900 overflow-hidden shadow-xl shadow-acses-green-900/20">
          <div className="flex items-center justify-between px-6 py-4 border-b border-acses-green-800">
            <div>
              <h2 className="text-base font-bold text-white">Recent Events</h2>
              <p className="text-xs text-acses-yellow-100/50 mt-0.5">Upcoming and ongoing activities.</p>
            </div>
            <span className="rounded-2xl bg-acses-green-800 border border-acses-green-700 px-3 py-1 text-xs font-bold text-acses-yellow-400">
              {filteredEvents.length} Total
            </span>
          </div>

          <div className="divide-y divide-acses-green-800">
            {filteredEvents.slice(0, 5).map((event) => (
              <div
                key={event.id}
                className="group flex items-center justify-between px-6 py-4 hover:bg-acses-green-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-acses-green-800 border border-acses-green-700 text-acses-yellow-400 flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-acses-yellow-400 transition-colors">{event.title}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-white/30">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.venue}</span>
                      <span>{formatDate(event.date)}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider flex-shrink-0 ${eventStatusStyle[event.status] || eventStatusStyle.past}`}>
                  {event.status}
                </span>
              </div>
            ))}
            {filteredEvents.length === 0 && (
              <div className="px-6 py-12 text-center text-sm text-white/30">No events match your search.</div>
            )}
          </div>
        </section>

        {/* Role Distribution */}
        <section className="rounded-3xl border border-acses-green-800 bg-acses-green-900 overflow-hidden shadow-xl shadow-acses-green-900/20">
          <div className="px-6 py-4 border-b border-acses-green-800">
            <h2 className="text-base font-bold text-white">Role Distribution</h2>
            <p className="text-xs text-acses-yellow-100/50 mt-0.5">Access level breakdown.</p>
          </div>

          <div className="p-6 space-y-5">
            {roleDistribution.length === 0 && (
              <p className="text-sm text-white/30 text-center py-6">No user data available.</p>
            )}
            {roleDistribution.map((entry) => (
              <div key={entry.role}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="capitalize text-white/80 font-semibold">{entry.role}</span>
                  <span className="text-acses-yellow-400 font-bold">{entry.percent}%</span>
                </div>
                <div className="h-1.5 w-full bg-acses-green-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-acses-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${entry.percent}%` }}
                  />
                </div>
                <p className="text-[10px] text-white/30 mt-1">{entry.count} active {entry.count === 1 ? "account" : "accounts"}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default AdminOverview;