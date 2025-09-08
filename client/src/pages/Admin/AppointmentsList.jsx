import React from "react";
import { useEffect, useState } from "react";
import { getAppointments, updateStatus } from "../../services/api";

export default function AppointmentsList() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [filters, setFilters] = useState({
        treatment: '',
        status: '',
        date: '',
        search: ''
    });
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const res = await getAppointments();
            const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
            setAppointments(sorted);
            setFilteredAppointments(sorted);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    useEffect(() => {
        let filtered = [...appointments];

        if (filters.treatment) {
            filtered = filtered.filter(apt => 
                apt.treatment.toLowerCase().includes(filters.treatment.toLowerCase())
            );
        }

        if (filters.status) {
            filtered = filtered.filter(apt => apt.status === filters.status);
        }

        if (filters.date) {
            const filterDate = new Date(filters.date).toDateString();
            filtered = filtered.filter(apt => 
                new Date(apt.date).toDateString() === filterDate
            );
        }

        if (filters.search) {
            filtered = filtered.filter(apt => 
                apt.patientName.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        setFilteredAppointments(filtered);
    }, [filters, appointments]);

    const changeStatus = async (id, status) => {
        try {
            await updateStatus(id, status);
            fetchAppointments();
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            treatment: '',
            status: '',
            date: '',
            search: ''
        });
    };

    if (loading) return <div className="text-center py-8">Loading appointments...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Appointments Management</h2>

            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-semibold mb-4">Filters & Search</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Search Patient</label>
                        <input
                            type="text"
                            placeholder="Patient name..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Treatment</label>
                        <select
                            value={filters.treatment}
                            onChange={(e) => handleFilterChange('treatment', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">All Treatments</option>
                            <option value="General Checkup">General Checkup</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="ENT">ENT</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                            type="date"
                            value={filters.date}
                            onChange={(e) => handleFilterChange('date', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={clearFilters}
                            className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-600">
                        Showing {filteredAppointments.length} of {appointments.length} appointments
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Treatment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredAppointments.map((appointment) => (
                                <tr key={appointment._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium">{appointment.patientName}</div>
                                            {appointment.age && (
                                                <div className="text-sm text-gray-500">
                                                    Age: {appointment.age}, {appointment.gender}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {appointment.phone && <div> {appointment.phone}</div>}
                                        {appointment.email && <div> {appointment.email}</div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                            {appointment.treatment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {new Date(appointment.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {appointment.timeSlot}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            appointment.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={appointment.status}
                                            onChange={(e) => changeStatus(appointment._id, e.target.value)}
                                            className="text-sm border rounded px-2 py-1"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredAppointments.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No appointments found matching your filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}