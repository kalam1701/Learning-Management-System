import axios from "axios";

// Create a reusable Axios instance for all API calls.
// This keeps the base URL in one place and makes requests consistent.
const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

// Add a request interceptor so every outgoing request includes the auth token.
// This helps protect routes that require login.
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    // If a token exists, attach it to the Authorization header.
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

// Export the configured API instance so other components can use it.
export default API;