import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.API_URL || "http://localhost:8000/api", 
    headers: { "Content-Type": "application/json" },
});

export const createAppointment = (data) => API.post("/appointments/createAppointment", data);
export const getAppointments = (params) => API.get("/appointments/getAppointments", { params });
export const updateStatus = (id, status) => API.put(`/appointments/${id}/status`, { status });
export const getAppointmentById = (id) => API.get(`/appointments/${id}`); 
export const getAppointmentStats = () => API.get("/appointments/stats"); 

export default API;