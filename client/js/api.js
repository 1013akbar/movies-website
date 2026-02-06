import { API_BASE } from "./config.js";
import { getToken, logout } from "./auth.js";
import { toast } from "./ui.js";

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  let data = null;
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) data = await res.json();

  if (res.status === 401) {
    // token invalid/expired
    logout();
    toast("Session expired. Please login again.", "error");
    window.location.href = "login.html";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const msg = data?.message || "Request failed";
    throw new Error(msg);
  }

  return data;
}
