// src/pages/Admin/AppointmentDetail.jsx
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { updateStatus } from "../../services/api";

export default function AppointmentDetail() {
    const { id } = useParams();   // read appointment id from URL
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAppointment = async () => {
        try {
            const res = await API.get(`/appointments/${id}`);
            setAppointment(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        await updateStatus(id, newStatus);
        fetchAppointment(); // refresh details
    };

    useEffect(() => {
        fetchAppointment();
    }, [id]);

    if (loading) return <p>Loading appointment...</p>;
    if (!appointment) return <p>Appointment not found.</p>;

    return (
        <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
            <h2 className="text-2xl font-bold mb-4">Appointment Detail</h2>

            <div className="space-y-2">
                <p><strong>Patient Name:</strong> {appointment.patientName}</p>
                <p><strong>Email:</strong> {appointment.email || "—"}</p>
                <p><strong>Phone:</strong> {appointment.phone || "—"}</p>
                <p><strong>Gender:</strong> {appointment.gender || "—"}</p>
                <p><strong>Age:</strong> {appointment.age || "—"}</p>
                <p><strong>Treatment:</strong> {appointment.treatment}</p>
                <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
            </div>

            <div className="mt-4">
                <label className="block mb-2 font-semibold">Update Status</label>
                <select
                    value={appointment.status}
                    onChange={handleStatusChange}
                    className="border p-2 rounded"
                >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Completed</option>
                </select>
            </div>

            <button
                onClick={() => navigate(-1)}
                className="mt-4 bg-gray-200 px-4 py-2 rounded"
            >
                Back
            </button>
        </div>
    );
}
