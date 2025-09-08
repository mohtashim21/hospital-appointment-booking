import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
    try {

        const { patientName, date, timeSlot } = req.body;
        const existingAppointment = await Appointment.findOne({
            patientName,
            date: new Date(date),
            timeSlot
        });
        if (existingAppointment) {
            return res.status(409).json({ error: "This time slot is already booked for the patient" });
        }


        const appointment = new Appointment({
            ...req.body,
            date: new Date(req.body.date)
        });
        await appointment.save();


        await sendNotification(req.body);
        res.status(201).json({ message: "Appointment booked successfully", appointment });
    } catch (error) {

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: "Validation failed", details: errors });
        }
        res.status(500).json({ error: "Failed to book appointment", details: error.message });
    }
};

export const getAppointments = async (req, res) => {
    try {
        const { treatment, date, status, sortBy = 'date', sortOrder = 'asc' } = req.query;

        let filter = {};
        if (treatment) {
            if (!['General Checkup', 'Pediatrics', 'Cardiology', 'ENT'].includes(treatment)) {
                return res.status(400).json({ error: "Invalid treatment type" });
            }
            filter.treatment = treatment;
        }
        if (date) {
            try {
                const searchDate = new Date(date);
                if (isNaN(searchDate.getTime())) {
                    return res.status(400).json({ error: "Invalid date format" });
                }
                const nextDate = new Date(searchDate);
                nextDate.setDate(nextDate.getDate() + 1);
                filter.date = { $gte: searchDate, $lt: nextDate };
            } catch {
                return res.status(400).json({ error: "Invalid date format" });
            }
        }
        if (status) {
            if (!['Pending', 'Confirmed', 'Completed'].includes(status)) {
                return res.status(400).json({ error: "Invalid status type" });
            }
            filter.status = status;
        }

        const validSortFields = ['date', 'patientName', 'treatment', 'status'];
        if (!validSortFields.includes(sortBy)) {
            return res.status(400).json({ error: `Invalid sort field. Use one of: ${validSortFields.join(', ')}` });
        }
        if (!['asc', 'desc'].includes(sortOrder)) {
            return res.status(400).json({ error: "Invalid sort order. Use 'asc' or 'desc'" });
        }
        const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

        const appointments = await Appointment.find(filter).sort(sortOptions);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch appointments", details: error.message });
    }
};

export const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch appointment", details: error.message });
    }
};

export const getAppointmentStats = async (req, res) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const total = await Appointment.countDocuments();

        const todayCount = await Appointment.countDocuments({
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const upcoming = await Appointment.countDocuments({
            date: { $gte: tomorrow },
            status: { $in: ["Pending", "Confirmed"] }
        });

        const pending = await Appointment.countDocuments({ status: "Pending" });
        const confirmed = await Appointment.countDocuments({ status: "Confirmed" });
        const completed = await Appointment.countDocuments({ status: "Completed" });

        res.json({
            total,
            today: todayCount,
            upcoming,
            pending,
            confirmed,
            completed
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch appointment stats", details: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['Pending', 'Confirmed', 'Completed'].includes(status)) {
            return res.status(400).json({ error: "Invalid status. Must be Pending, Confirmed, or Completed" });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: "Failed to update appointment status", details: error.message });
    }
};

export const sendNotification = async (appointmentData) => {
    try {
        console.log('EMAIL NOTIFICATION SENT TO ADMIN:');
        console.log(`New Appointment Booked`);
        console.log(`Patient: ${appointmentData.patientName}`);
        console.log(`Treatment: ${appointmentData.treatment}`);
        console.log(`Date: ${new Date(appointmentData.date).toLocaleDateString()}`);
        console.log(`Time: ${appointmentData.timeSlot}`);
        console.log(`Contact: ${appointmentData.phone || appointmentData.email}`);
        console.log('----------------------------------------------');

        console.log('SMS NOTIFICATION SENT TO PATIENT:');
        console.log(`Dear ${appointmentData.patientName}, your appointment for ${appointmentData.treatment} on ${new Date(appointmentData.date).toLocaleDateString()} at ${appointmentData.timeSlot} has been booked successfully. Thank you - MGM Hospital`);
        return true;
    } catch (error) {
        console.error('Notification sending failed:', error);
        return false;
    }
};