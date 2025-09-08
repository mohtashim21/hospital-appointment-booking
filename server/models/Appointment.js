import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: [true, 'Patient name is required'],
        minlength: [3, 'Patient name must be at least 3 characters long'],
        maxlength: [20, 'Patient name cannot exceed 20 characters']
    },
    email: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        match: [/^\+91[0-9]{10}$/, 'Please enter a valid phone number (e.g., +919876543210)']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    age: {
        type: Number,
        min: [0, 'Age must be a positive number']
    },
    treatment: {
        type: String,
        required: true,
        enum: ['General Checkup', 'Pediatrics', 'Cardiology', 'ENT']
    },
    date: { type: Date, required: true },
    timeSlot: {
        type: String,
        required: true,
        enum: ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '14:00 - 15:00']
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Completed"],
        default: "Pending"
    }
}, {
    timestamps: true,
});

export default mongoose.model("Appointment", appointmentSchema, "bookings");  