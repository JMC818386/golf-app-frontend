const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getAuthToken = () => {
  return localStorage.getItem('clover_golf_access_token');
};

export const fetchJson = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

export const apiClient = {
  getRounds: () => fetchJson('/api/rounds/'),
  getStats: (timeRange) => fetchJson(`/api/stats/?timeRange=${timeRange}`),
  getEvents: () => fetchJson('/api/events/'),
  getEvent: (id) => fetchJson(`/api/events/${id}`),
};
