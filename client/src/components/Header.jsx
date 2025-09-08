import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/mgmlogo.png";

const CONTACT_INFO = {
    phone: "0240-68334455",
    email: "info@mgmhospitals.in",
    location: "Chhatrapati Sambhaji Nagar"
};

export default function Header() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [logoError, setLogoError] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const navigation = [
        { name: "Home", path: "/" },
        { name: "Book Appointment", path: "/book" }
    ];

    const isActiveLink = useCallback((path) => location.pathname === path, [location.pathname]);

    const handleLogoError = () => {
        setLogoError(true);
    };

    return (
        <>
            <div className="bg-blue-600 text-white py-2 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <a
                                    href={`tel:${CONTACT_INFO.phone}`}
                                    className="hover:text-blue-200 transition-colors"
                                    aria-label="Call hospital helpline"
                                >
                                    {CONTACT_INFO.phone} (24×7 Helpline)
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <a
                                    href={`mailto:${CONTACT_INFO.email}`}
                                    className="hover:text-blue-200 transition-colors"
                                    aria-label="Send email to hospital"
                                >
                                    {CONTACT_INFO.email}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs sm:text-sm">{CONTACT_INFO.location}</span>
                            </div>
                            <Link
                                to="/emergency"
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                aria-label="Emergency services"
                            >
                                Emergency
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg'
                : 'bg-white shadow-md'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
                            {!logoError ? (
                                <img
                                    src={logo}
                                    alt="MGM Hospital Logo"
                                    className="h-12 sm:h-16 lg:h-20 w-auto transition-all duration-300 group-hover:scale-105"
                                    onError={handleLogoError}
                                />
                            ) : (
                                <div className="h-12 sm:h-16 lg:h-20 w-16 sm:w-20 lg:w-24 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl sm:text-2xl">MGM</span>
                                </div>
                            )}
                            <div className="hidden sm:block">
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                    MGM Hospital
                                </h1>
                                <p className="text-xs lg:text-sm text-gray-600">
                                    Excellence in Healthcare
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden lg:flex items-center space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`relative font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 ${isActiveLink(item.path)
                                        ? 'text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600'
                                        }`}
                                >
                                    {item.name}
                                    {isActiveLink(item.path) && (
                                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-pulse"></div>
                                    )}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center space-x-4">
                            <Link
                                to="/book"
                                className="hidden sm:inline-flex bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Book Now
                            </Link>

                            <Link
                                to="/admin"
                                className={`hidden md:flex items-center space-x-1 px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${location.pathname.startsWith('/admin')
                                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm">Admin</span>
                            </Link>

                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMenuOpen}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {location.pathname.startsWith('/admin') && (
                        <div className="hidden lg:block border-t border-gray-200 py-3">
                            <nav className="flex space-x-8" aria-label="Admin navigation">
                                <Link
                                    to="/admin"
                                    className={`text-sm font-medium transition-colors hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 ${location.pathname === '/admin'
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/admin/appointments"
                                    className={`text-sm font-medium transition-colors hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 ${location.pathname === '/admin/appointments'
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                >
                                    Manage Appointments
                                </Link>
                            </nav>
                        </div>
                    )}
                </div>

                <div
                    className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen
                        ? 'opacity-100 transform translate-y-0'
                        : 'opacity-0 transform -translate-y-2 pointer-events-none'
                        }`}
                    style={{
                        maxHeight: isMenuOpen ? '500px' : '0px',
                        overflow: 'hidden'
                    }}
                >
                    <div className="bg-gray-50 border-t border-gray-200">
                        <div className="max-w-7xl mx-auto px-4 py-4">
                            <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`font-medium py-2 transition-colors rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isActiveLink(item.path)
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-700 hover:text-blue-600'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Link
                                    to="/admin"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`font-medium py-2 transition-colors rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${location.pathname.startsWith('/admin')
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-700 hover:text-blue-600'
                                        }`}
                                >
                                    Admin Panel
                                </Link>
                                <Link
                                    to="/book"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
                                >
                                    Book Appointment
                                </Link>
                            </nav>

                            {location.pathname.startsWith('/admin') && (
                                <div className="mt-6 pt-4 border-t border-gray-300">
                                    <div className="text-sm font-semibold text-gray-500 mb-3">Admin Menu</div>
                                    <nav className="flex flex-col space-y-2" aria-label="Mobile admin navigation">
                                        <Link
                                            to="/admin"
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`text-sm py-2 transition-colors rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${location.pathname === '/admin'
                                                ? 'text-blue-600 font-medium bg-blue-50'
                                                : 'text-gray-600 hover:text-blue-600'
                                                }`}
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/admin/appointments"
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`text-sm py-2 transition-colors rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${location.pathname === '/admin/appointments'
                                                ? 'text-blue-600 font-medium bg-blue-50'
                                                : 'text-gray-600 hover:text-blue-600'
                                                }`}
                                        >
                                            Manage Appointments
                                        </Link>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}