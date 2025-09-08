import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
}));

app.use(express.json());

app.use("/api/appointments", appointmentRoutes);

connectDB();

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});