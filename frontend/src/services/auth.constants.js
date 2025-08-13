// Local development - backend running on port 8000
const LOCAL_API_URL = "http://localhost:8000/api/";
// Production API (PostgreSQL database)
const PROD_API_URL = "https://pocket-pro-api.ue.r.appspot.com/api/";

export const API_URL = process.env.NODE_ENV === 'development'
    ? LOCAL_API_URL
    : PROD_API_URL;
export const LOGIN_ENDPOINT = "user/login/";
export const REGISTER_ENDPOINT = "user/signup/";
export const REFRESH_ENDPOINT = "token/refresh/";
