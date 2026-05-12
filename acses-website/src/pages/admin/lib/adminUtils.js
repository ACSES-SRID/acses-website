import { STORAGE_KEYS, DEFAULT_USERS, DEFAULT_EVENTS, DEFAULT_EXECUTIVES, DEFAULT_ANNOUNCEMENTS, DEFAULT_PROJECTS, DEFAULT_GALLERY, DEFAULT_HOME } from "./adminData";

export const loadStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      // Seed browser storage with default admin data for local/offline fallback.
      const initial = initializeDefaultData(key, fallback);
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error("Storage read failed", error);
    return fallback;
  }
};

export const saveStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Storage save failed", error);
  }
};

const initializeDefaultData = (key, fallback) => {
  // Map known storage keys to their bundled defaults.
  switch (key) {
    case STORAGE_KEYS.users:
      return DEFAULT_USERS;
    case STORAGE_KEYS.events:
      return DEFAULT_EVENTS;
    case STORAGE_KEYS.executives:
      return DEFAULT_EXECUTIVES;
    case STORAGE_KEYS.announcements:
      return DEFAULT_ANNOUNCEMENTS;
    case STORAGE_KEYS.projects:
      return DEFAULT_PROJECTS;
    case STORAGE_KEYS.gallery:
      return DEFAULT_GALLERY;
    case STORAGE_KEYS.home:
      return DEFAULT_HOME;
    default:
      return fallback;
  }
};

export const csvEscape = (value) => {
  if (value === undefined || value === null) return "";
  const escaped = String(value).replace(/"/g, '""');
  return `"${escaped}"`;
};

export const exportToCsv = (filename, rows) => {
  if (!rows || !rows.length) return;
  // Generate a simple client-side CSV export for admin tables.
  const headers = Object.keys(rows[0]);
  const csvRows = [headers.map(csvEscape).join(",")];
  rows.forEach((row) => {
    const values = headers.map((header) => csvEscape(row[header]));
    csvRows.push(values.join(","));
  });
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
