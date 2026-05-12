/** Single source of truth for admin dashboard navigation (desktop sidebar + mobile drawer). */
export const ADMIN_NAV_ITEMS = [
  { label: "Overview", to: "/admin", icon: "🏠", key: "overview" },
  { label: "Events", to: "/admin/events", icon: "📅", key: "events" },
  { label: "Leadership", to: "/admin/leadership", icon: "👥", key: "executives" },
  { label: "Resources", to: "/admin/resources", icon: "📚", key: "resources" },
  { label: "Announcements", to: "/admin/announcements", icon: "📢", key: "announcements" },
  { label: "Projects", to: "/admin/student-projects", icon: "🚀", key: "student-projects" },
  { label: "Gallery", to: "/admin/gallery", icon: "🖼️", key: "gallery" },
  { label: "Store", to: "/admin/store", icon: "🛒", key: "store" },
  { label: "Users", to: "/admin/users", icon: "🔐", key: "users" },
  { label: "Home Editor", to: "/admin/home-editor", icon: "✍️", key: "home-editor" },
];
