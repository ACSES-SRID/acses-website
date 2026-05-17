export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';

const ADMIN_TOKEN_KEY = 'acses_admin_jwt';

export const getAdminToken = () => sessionStorage.getItem(ADMIN_TOKEN_KEY);

export const setAdminToken = (token) => {
  if (token) sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  else sessionStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const clearAdminToken = () => sessionStorage.removeItem(ADMIN_TOKEN_KEY);

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

/** Paginated API responses use `{ items, total, page, limit }`; some list routes return a plain array. */
export const unwrapList = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
};

/**
 * JSON fetch helper.
 * @param {string} path - e.g. `/api/events`
 * @param {RequestInit & { auth?: boolean }} options - set `auth: true` to send `Authorization: Bearer` when a token exists.
 */
export const fetchApi = async (path, options = {}) => {
  const { auth = false, ...rest } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...(rest.headers || {}),
  };
  if (auth) {
    const token = getAdminToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(apiUrl(path), {
    ...rest,
    headers,
  });

  const rawText = await response.text();

  if (!response.ok) {
    if (response.status === 401 && auth) {
      clearAdminToken();
      window.dispatchEvent(new CustomEvent('acses-admin-session-expired'));
    }
    let message = rawText || response.statusText;
    try {
      const parsed = JSON.parse(rawText);
      if (parsed?.error) message = parsed.error;
    } catch {
      /* keep message */
    }
    if (response.status === 429) {
      message = 'Too many attempts. Please try again in a few minutes.';
    }
    throw new Error(message);
  }

  if (!rawText) return null;
  try {
    return JSON.parse(rawText);
  } catch {
    return rawText;
  }
};
