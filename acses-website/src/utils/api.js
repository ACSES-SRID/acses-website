export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';

export const apiUrl = (path) => {
  // Accept both "api/events" and "/api/events" from callers.
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const fetchApi = async (path, options = {}) => {
  // Central wrapper for JSON API calls so headers and error handling stay consistent.
  const response = await fetch(apiUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    // Surface the backend response body when available; otherwise use the status text.
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }

  return response.json();
};
