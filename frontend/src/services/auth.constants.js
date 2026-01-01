// API base URL - uses environment variable or falls back to relative path
// Ensure trailing slash for proper URL construction
const baseUrl = import.meta.env.VITE_API_URL || "/api";
export const API_URL = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
export const LOGIN_ENDPOINT = "user/login/";
export const REGISTER_ENDPOINT = "user/signup/";
export const REFRESH_ENDPOINT = "token/refresh/";
