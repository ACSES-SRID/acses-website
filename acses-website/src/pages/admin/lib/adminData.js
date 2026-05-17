export const STORAGE_KEYS = {
  adminUser: "acses_admin_user",
  events: "acses_admin_events",
  executives: "acses_admin_executives",
  announcements: "acses_admin_announcements",
  projects: "acses_admin_projects",
  gallery: "acses_admin_gallery",
  users: "acses_admin_users",
  home: "acses_admin_home",
};

export const DEFAULT_USERS = [
  {
    id: "user-super",
    username: "superadmin",
    name: "Super Admin",
    role: "super admin",
    email: "superadmin@acses.org",
    lastLogin: new Date().toISOString(),
    status: "active",
    password: "AcseS2026!",
  },
  {
    id: "user-editor",
    username: "editor",
    name: "Editor User",
    role: "editor",
    email: "editor@acses.org",
    lastLogin: new Date().toISOString(),
    status: "active",
    password: "Editor123!",
  },
];

export const DEFAULT_EVENTS = [
  {
    id: "event-1",
    title: "Leadership Seminar",
    date: "2026-06-15",
    venue: "Main Hall",
    description: "A seminar for student leaders.",
    category: "seminar",
    status: "upcoming",
    flyer: "https://via.placeholder.com/220x140.png?text=Seminar",
  },
  {
    id: "event-2",
    title: "Coding Workshop",
    date: "2026-05-20",
    venue: "Lab 2",
    description: "Hands-on workshop for new developers.",
    category: "workshop",
    status: "upcoming",
    flyer: "https://via.placeholder.com/220x140.png?text=Workshop",
  },
];

export const DEFAULT_EXECUTIVES = [
  {
    id: "exec-1",
    name: "Araba Mensah",
    position: "President",
    termYear: "2025",
    photo: "https://via.placeholder.com/150.png?text=President",
    bio: "Leading ACSES with vision and purpose.",
    social: { linkedin: "", twitter: "", instagram: "" },
  },
  {
    id: "exec-2",
    name: "Kofi Asante",
    position: "Head of Department",
    termYear: "2025",
    photo: "https://via.placeholder.com/150.png?text=HoD",
    bio: "Championing student innovation and projects.",
    social: { linkedin: "", twitter: "", instagram: "" },
  },
];

export const DEFAULT_ANNOUNCEMENTS = [
  {
    id: "news-1",
    title: "ACSES General Meeting",
    body: "Join us for the monthly general meeting on campus.",
    date: "2026-05-05",
    author: "Super Admin",
    visibility: "public",
    status: "published",
  },
];

export const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "Smart Library App",
    student: "Elsie Owusu",
    description: "A mobile app that recommends resources and manages borrowing.",
    approved: false,
    technologies: ["React", "Firebase"],
    links: { github: "", demo: "" },
  },
];

export const DEFAULT_GALLERY = [
  {
    id: "photo-1",
    caption: "ACSES Workshop",
    eventTag: "Coding Workshop",
    uploadedAt: "2026-04-22",
    image: "https://via.placeholder.com/280x180.png?text=Event+Photo",
  },
];

export const DEFAULT_HOME = {
  presidentMessage: "Welcome to ACSES. We are building the next generation of student leaders and technologists.",
  hodMessage: "Our department empowers students with tools and opportunities to grow beyond the classroom.",
  statistics: {
    members: 250,
    activeProjects: 18,
    volunteerHours: 720,
    partners: 12,
  },
};
