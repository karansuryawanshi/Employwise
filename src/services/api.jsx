import axios from "axios";

const BASE_URL = "https://reqres.in/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to include the auth token for authenticated requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const loginUser = (email, password) => {
  return api.post("/login", { email, password });
};

// User services
export const getUsers = (page = 1) => {
  return api.get(`/users?page=${page}`);
};

export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

export const updateUser = (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export default api;
