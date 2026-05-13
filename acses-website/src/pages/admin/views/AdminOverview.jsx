import React, { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { fetchApi, unwrapList } from "../../../utils/api";
import { formatDate } from "../lib/adminUtils";
// Assuming you have Lucide or similar for icons
import { Users, Calendar, FolderOpen, Megaphone, MapPin } from "lucide-react";

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

        const eventList = unwrapList(eventsData);
        const annList = Array.isArray(announcementsData) ? announcementsData : [];

        setEvents(eventList.map((item) => ({ id: item._id || item.id, ...item })));
        setAnnouncements(annList.map((item) => ({ id: item._id || item.id, ...item })));
        setHome(homeData || { statistics: {} });

        if (hasAccess("student-projects")) {
          try {
            const projectsData = await fetchApi("/api/student-projects/all?limit=100", { auth: true });
            const projectList = unwrapList(projectsData);
            setProjects(
              projectList.map((item) => ({
                id: item._id || item.id,
                ...item,
                technologies: Array.isArray(item.technologies) ? item.technologies : [],
                approved: item.status === "approved",
              }))
            );
          } catch (e) {
            console.error("Overview: projects load failed", e);
            setProjects([]);
          }
        }

        if (hasAccess("users")) {
          try {
            const usersData = await fetchApi("/api/users", { auth: true });
            const userList = Array.isArray(usersData) ? usersData : [];
            setUsers(userList.map((item) => ({ id: item._id || item.id, ...item })));
          } catch (e) {
            console.error("Overview: users load failed", e);
            setUsers([]);
          }
        }
      } catch (error) {
        console.error("Failed to load overview data:", error);
      }
    };
    loadOverview();
  }, [currentUser, hasAccess]);

  const filteredEvents = useMemo(
    () => events.filter((item) => 
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
    return Object.entries(roleCounts).map(([role, count]) => ({ role, count, percent: Math.round((count / total) * 100) }));
  }, [users]);

  return (
    <div className="space-y-8 p-1">
      {/* Top Level Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          label="Total Members" 
          value={home.statistics?.members || 0} 
          icon={<Users className="w-5 h-5" />}
        />
        <DashboardCard 
          label="Upcoming Events" 
          value={events.filter((item) => item.status === "upcoming").length} 
          icon={<Calendar className="w-5 h-5" />}
        />
        <DashboardCard 
          label="Approved Projects" 
          value={projects.filter((item) => item.approved || item.status === "approved").length} 
          icon={<FolderOpen className="w-5 h-5" />}
        />
        <DashboardCard 
          label="Published News" 
          value={announcements.filter((item) => item.status === "published").length} 
          icon={<Megaphone className="w-5 h-5" />}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        {/* Main Chart/List Area */}
        <section className="xl:col-span-2 space-y-8">
          <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900/50 p-7 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-white">Recent Events</h2>
                <p className="text-sm text-acses-yellow-100/60">Manage and monitor upcoming activities.</p>
              </div>
              <span className="bg-acses-green-800 text-acses-yellow-200 px-4 py-1.5 rounded-full text-xs font-medium">
                {filteredEvents.length} Total
              </span>
            </div>

            <div className="grid gap-4">
              {filteredEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="group flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-acses-green-700 hover:bg-acses-green-800/30 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-acses-green-800 text-acses-yellow-400">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-acses-yellow-400 transition-colors">{event.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-white/50">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.venue}</span>
                        <span>•</span>
                        <span>{formatDate(event.date)}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                    event.status === 'upcoming' ? 'bg-blue-500/10 text-blue-400' : 'bg-acses-green-700 text-acses-yellow-100'
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar Distribution */}
        <section className="space-y-8">
          <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900/50 p-7 shadow-sm">
            <h2 className="text-xl font-bold text-white">Role Distribution</h2>
            <p className="mt-1 text-sm text-acses-yellow-100/60">Access level breakdown.</p>
            
            <div className="mt-8 space-y-6">
              {roleDistribution.map((entry) => (
                <div key={entry.role}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="capitalize text-white/90 font-medium">{entry.role}</span>
                    <span className="text-acses-yellow-400">{entry.percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-acses-green-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-acses-yellow-400 transition-all duration-500" 
                      style={{ width: `${entry.percent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-white/40 mt-1">{entry.count} active accounts</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const DashboardCard = ({ label, value, icon }) => (
  <div className="relative overflow-hidden rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-md hover:border-acses-green-700 transition-colors">
    <div className="flex items-center justify-between">
      <div className="p-2 rounded-lg bg-acses-green-800 text-acses-yellow-400">
        {icon}
      </div>
    </div>
    <div className="mt-5">
      <p className="text-3xl font-bold text-white leading-none">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-widest text-acses-yellow-100/60 font-medium">{label}</p>
    </div>
  </div>
);

export default AdminOverview;