import React from "react";
import { useForm } from "react-hook-form";
import { createAppointment } from "../services/api";
import { useState } from "react";

export default function BookAppointment() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);

        if (data.phone && !data.phone.startsWith("+91")) {
            data.phone = `+91${data.phone}`;
        }

        try {
            await createAppointment(data);
            setMessage({
                type: "success",
                text: "Appointment booked successfully! Admin has been notified and you will receive a confirmation SMS."
            });
            reset();
        } catch (err) {
            setMessage({
                type: "error",
                text: err?.response?.data?.error || "Booking failed. Please try again."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1585435557343-3b092070f16c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
            }}
        >
            <div className="max-w-lg w-full bg-white bg-opacity-95 rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all hover:shadow-3xl">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-calendar-alt mr-2 text-blue-600"></i> Book Your Appointment
                </h2>

                {message && (
                    <div
                        className={`p-4 mb-6 rounded-lg border flex items-center justify-center ${message.type === "success"
                                ? "bg-green-100 border-green-400 text-green-800"
                                : "bg-red-100 border-red-400 text-red-800"
                            } text-sm sm:text-base text-center`}
                    >
                        <i
                            className={`mr-2 ${message.type === "success"
                                    ? "fas fa-check-circle"
                                    : "fas fa-exclamation-circle"
                                }`}
                        ></i>
                        {message.text}
                    </div>
                )}

                {Object.keys(errors).length > 0 && (
                    <div className="p-4 mb-6 rounded-lg border bg-red-100 border-red-400 text-red-800 text-sm sm:text-base text-center flex items-center justify-center">
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        Please fix the highlighted errors before submitting.
                    </div>
                )}

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <i className="fas fa-user mr-2 text-blue-600"></i> Patient Name
                        </label>
                        <input
                            {...register("patientName", { required: "Patient name is required" })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base bg-gray-50"
                            placeholder="Enter full name"
                        />
                        {errors.patientName && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                <i className="fas fa-exclamation-triangle mr-1"></i>
                                {errors.patientName.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <i className="fas fa-envelope mr-2 text-blue-600"></i> Email
                            </label>
                            <input
                                type="email"
                                {...register("email", {
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email format"
                                    }
                                })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base bg-gray-50"
                                placeholder="your.email@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <i className="fas fa-phone mr-2 text-blue-600"></i> Phone
                            </label>
                            <input
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Please enter a valid 10-digit phone number"
                                    }
                                })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base bg-gray-50"
                                placeholder="9876543210"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <i className="fas fa-venus-mars mr-2 text-blue-600"></i> Gender
                            </label>
                            <select
                                {...register("gender")}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base bg-gray-50"
                            >
                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <i className="fas fa-child mr-2 text-blue-600"></i> Age
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="120"
                                {...register("age", {
                                    min: { value: 1, message: "Age must be at least 1" },
                                    max: { value: 120, message: "Age must be less than 120" }
                                })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base bg-gray-50"
                                placeholder="25"
                            />
                            {errors.age && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    {errors.age.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <i className="fas fa-stethoscope mr-2 text-blue-600"></i> Treatment
                        </label>
                        <select
                            {...register("treatment", { required: "Please select a treatment" })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base bg-gray-50"
                        >
                            <option value="">Select treatment</option>
                            <option>General Checkup</option>
                            <option>Pediatrics</option>
                            <option>Cardiology</option>
                            <option>ENT</option>
                        </select>
                        {errors.treatment && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                <i className="fas fa-exclamation-triangle mr-1"></i>
                                {errors.treatment.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <i className="fas fa-calendar-day mr-2 text-blue-600"></i> Preferred Date
                            </label>
                            <input
                                type="date"
                                {...register("date", {
                                    required: "Date is required",
                                    validate: (value) => {
                                        const selectedDate = new Date(value);
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        return selectedDate >= today || "Please select a future date";
                                    }
                                })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base bg-gray-50"
                            />
                            {errors.date && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    {errors.date.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <i className="fas fa-clock mr-2 text-blue-600"></i> Time Slot
                            </label>
                            <select
                                {...register("timeSlot", { required: "Please select a time slot" })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base bg-gray-50"
                            >
                                <option value="">Select time slot</option>
                                <option>09:00 - 10:00</option>
                                <option>10:00 - 11:00</option>
                                <option>11:00 - 12:00</option>
                                <option>14:00 - 15:00</option>
                            </select>
                            {errors.timeSlot && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    {errors.timeSlot.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition text-sm sm:text-base flex items-center justify-center ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        <i className="fas fa-calendar-check mr-2"></i>
                        {loading ? "Booking..." : "Book Appointment"}
                    </button>
                </div>
            </div>
        </div>
    );
}
