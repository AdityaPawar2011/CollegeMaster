import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Student Auth API
export const studentAPI = {
  register: (data) => api.post("/students/register", data),
  login: (data) => api.post("/students/login", data),
  getProfile: () => api.get("/students/profile"),
  updateProfile: (data) => api.put("/students/profile", data),
  deleteProfile: () => api.delete("/students/profile"),
  logout: () => api.post("/students/logout"),
  getAllStudents: () => api.get("/students"),
};

export default api;
