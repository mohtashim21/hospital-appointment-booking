import express from "express";
import { createAppointment, getAppointments, updateStatus, getAppointmentById, getAppointmentStats } from "../controllers/appointmentController.js"; 

const router = express.Router();

router.post("/createAppointment", createAppointment);
router.get("/getAppointments", getAppointments);
router.get("/stats", getAppointmentStats);
router.get("/:id", getAppointmentById);
router.put("/:id/status", updateStatus);

export default router;
