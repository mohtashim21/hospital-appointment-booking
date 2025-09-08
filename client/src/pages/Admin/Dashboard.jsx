// src/pages/Admin/Dashboard.jsx
import React from "react";
import { useEffect, useState } from "react";
import { getAppointmentStats } from "../../services/api";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getAppointmentStats();
                setStats(res.data);
            } catch (err) {
                setError("Failed to load statistics");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-center py-8">Loading dashboard...</div>;
    if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

            {/* Main Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-blue-50 rounded-lg shadow border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-800">Total Appointments</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats?.total || 0}</p>
                </div>
                <div className="p-6 bg-green-50 rounded-lg shadow border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-800">Appointments Today</h3>
                    <p className="text-3xl font-bold text-green-600">{stats?.today || 0}</p>
                </div>
                <div className="p-6 bg-purple-50 rounded-lg shadow border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-purple-800">Upcoming</h3>
                    <p className="text-3xl font-bold text-purple-600">{stats?.upcoming || 0}</p>
                </div>
            </div>

            {/* Status Breakdown */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">Appointment Status Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-yellow-50 rounded border">
                        <h4 className="font-semibold text-yellow-800">Pending</h4>
                        <p className="text-2xl font-bold text-yellow-600">{stats?.pending || 0}</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded border">
                        <h4 className="font-semibold text-blue-800">Confirmed</h4>
                        <p className="text-2xl font-bold text-blue-600">{stats?.confirmed || 0}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded border">
                        <h4 className="font-semibold text-green-800">Completed</h4>
                        <p className="text-2xl font-bold text-green-600">{stats?.completed || 0}</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => window.location.href = '/admin/appointments'}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                        View All Appointments
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Refresh Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}