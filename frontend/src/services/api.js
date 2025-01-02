import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Adding a request interceptor to include the token in the Authorization header
API.interceptors.request.use(
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

// Todos APIs
export const getTodos = () => API.get("/todos");
export const createTodo = (newTodo) => API.post("/todos", newTodo);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
export const updateTodo = (id, updatedTodo) =>
  API.put(`/todos/${id}`, updatedTodo);

// Auth APIs
export const registerUser = (userData) => API.post("/register", userData);
export const loginUser = (loginData) => API.post("/login", loginData);
export const getUserData = () => API.get("/user-data");
