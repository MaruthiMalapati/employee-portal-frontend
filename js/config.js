// templates/js/config.js

const isProd = window.location.hostname.includes("vercel.app");

const API_BASE_URL = isProd
  ? "https://employee-portal-backend-zqbo.onrender.com"
  : "http://localhost:3000";
// const AUTH_API_URL = `${API_BASE_URL}/auth`;