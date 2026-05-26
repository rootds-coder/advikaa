// utils/api.js

const API_URL = '';

export const apiRequest = async (path, method = 'GET', body = null, token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  const storedToken = token || sessionStorage.getItem('adminToken');
  if (storedToken) headers['Authorization'] = `Bearer ${storedToken}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API_URL}/api${path}`, opts);
  const text = await res.text();
  if (!res.ok) throw new Error(text || res.statusText);
  try {
    return JSON.parse(text);
  } catch {
    return text; // plain text response
  }
};
