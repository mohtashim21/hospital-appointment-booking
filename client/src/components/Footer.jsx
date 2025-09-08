import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/mgmlogo.png";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [logoError, setLogoError] = useState(false);
    const [email, setEmail] = useState("");

    const departments = [
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "Gastroenterology",
        "Urology",
        "Oncology",
        "Pediatrics",
        "Emergency Care"
    ];

    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "Book Appointment", path: "/book" },
        { name: "Emergency Services", path: "/emergency" }
    ];

    const socialLinks = [
        {
            name: "Facebook",
            icon: <Facebook size={20} strokeWidth={1.5} />,
            link: "#",
            hoverColor: "hover:text-blue-400"
        },
        {
            name: "Twitter",
            icon: <Twitter size={20} strokeWidth={1.5} />,
            link: "#",
            hoverColor: "hover:text-sky-400"
        },
        {
            name: "LinkedIn",
            icon: <Linkedin size={20} strokeWidth={1.5} />,
            link: "#",
            hoverColor: "hover:text-blue-600"
        },
        {
            name: "Instagram",
            icon: <Instagram size={20} strokeWidth={1.5} />,
            link: "#",
            hoverColor: "hover:text-pink-400"
        }
    ];

    const handleLogoError = () => {
        setLogoError(true);
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        console.log("Newsletter subscription for:", email);
        setEmail("");
    };

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    <div className="sm:col-span-2 lg:col-span-1 space-y-6">
                        <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
                            {!logoError ? (
                                <img
                                    src={logo}
                                    alt="MGM Hospital Logo"
                                    className="h-12 sm:h-14 w-auto transition-all duration-300 group-hover:scale-105"
                                    onError={handleLogoError}
                                />
                            ) : (
                                <div className="h-12 sm:h-14 w-12 sm:w-14 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">MGM</span>
                                </div>
                            )}
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                    MGM Hospital
                                </h1>
                                <p className="text-xs sm:text-sm text-gray-400">
                                    Excellence in Healthcare
                                </p>
                            </div>
                        </Link>

                        <p className="text-gray-300 leading-relaxed text-sm">
                            Leading multispecialty hospital chain bringing European health standards to India with world-class medical care and advanced technology.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                                <div className="text-gray-300 text-sm leading-relaxed">
                                    Near Chistiya Police Chowki, N-6, CIDCO,<br />
                                    Chhatrapati Sambhaji Nagar (Aurangabad),<br />
                                    Maharashtra – 431003
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                <a
                                    href="tel:02406834455"
                                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                                >
                                    0240-68334455 (24×7 Helpline)
                                </a>
                            </div>

                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                <a
                                    href="mailto:info@mgmhospitals.in"
                                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm break-all"
                                >
                                    info@mgmhospitals.in
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
                            <div className="flex space-x-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.link}
                                        className={`w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 group text-gray-300 ${social.hoverColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
                                        aria-label={`Follow us on ${social.name}`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group text-sm focus:outline-none focus:text-blue-400"
                                    >
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Our Specialties</h4>
                        <ul className="space-y-3">
                            {departments.map((dept, index) => (
                                <li key={index} className="text-gray-300 flex items-center space-x-2 text-sm">
                                    <span className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0"></span>
                                    <span>{dept}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Emergency & Hours</h4>

                        <div className="bg-red-600 bg-opacity-20 border border-red-500 rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="font-semibold text-red-400 text-sm">Emergency Services</span>
                            </div>
                            <p className="text-gray-300 text-xs mb-2">Available 24/7</p>
                            <a
                                href="tel:02406834455"
                                className="text-red-400 hover:text-red-300 font-medium transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                            >
                                Call: 0240-68334455
                            </a>
                        </div>

                        <div className="space-y-3">
                            <h5 className="font-semibold text-white text-sm">Hospital Hours</h5>
                            <div className="text-gray-300 text-xs space-y-1">
                                <div className="flex justify-between">
                                    <span>OPD Hours:</span>
                                    <span>8:00 AM - 8:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Emergency:</span>
                                    <span>24/7</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Pharmacy:</span>
                                    <span>24/7</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-semibold text-white mb-3 text-sm">Health Newsletter</h5>
                            <p className="text-gray-300 text-xs mb-3">Get health tips and updates</p>
                            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"
                                    required
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="text-center">
                        <h4 className="text-lg font-semibold text-white mb-6">Accreditations & Certifications</h4>
                        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
                            <div className="text-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2 mx-auto">
                                    <span className="text-xs font-bold text-blue-400">NABH</span>
                                </div>
                                <span className="text-xs text-gray-400">Accredited</span>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2 mx-auto">
                                    <span className="text-xs font-bold text-green-400">ISO</span>
                                </div>
                                <span className="text-xs text-gray-400">Certified</span>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2 mx-auto">
                                    <span className="text-xs font-bold text-yellow-400">JCI</span>
                                </div>
                                <span className="text-xs text-gray-400">Standards</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
                        <p className="text-gray-400 text-sm text-center sm:text-left">
                            © {currentYear} MGM Hospital. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6 text-sm">
                            <Link
                                to="/privacy-policy"
                                className="text-gray-400 hover:text-blue-400 transition-colors focus:outline-none focus:text-blue-400"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms-conditions"
                                className="text-gray-400 hover:text-blue-400 transition-colors focus:outline-none focus:text-blue-400"
                            >
                                Terms & Conditions
                            </Link>
                            <Link
                                to="/disclaimer"
                                className="text-gray-400 hover:text-blue-400 transition-colors focus:outline-none focus:text-blue-400"
                            >
                                Medical Disclaimer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Link
                to="/emergency"
                className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Emergency Services - Available 24/7"
            >
                <FontAwesomeIcon icon={faExclamationCircle} className="w-5 h-5 sm:w-6 sm:h-6" />
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Emergency Help
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                </div>
            </Link>
        </footer>
    );
}