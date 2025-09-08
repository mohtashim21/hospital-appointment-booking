import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HospitalDetails from "./pages/HospitalDetails";
import BookAppointment from "./pages/BookAppointment";
import Dashboard from "./pages/Admin/Dashboard";
import AppointmentsList from "./pages/Admin/AppointmentsList";
import AppointmentDetail from "./pages/Admin/AppointmentDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFoundPage from "./components/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HospitalDetails />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/appointments" element={<AppointmentsList />} />
          <Route path="/admin/appointments/:id" element={<AppointmentDetail />} />
          <Route path="/notfound" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}