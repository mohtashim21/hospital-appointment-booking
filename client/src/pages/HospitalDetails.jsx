import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope, faHospital, faStethoscope, faBuilding, faAmbulance, faStar } from "@fortawesome/free-solid-svg-icons";
import bookappointmenticon from "../assets/book-appointment-icon.svg";
import machine from "../assets/bring01.webp";
import reception from "../assets/bring02.webp";
import doctorsicon from "../assets/doctors-icon.svg";
import healthcheckups from "../assets/health-checkups.svg";
import hospitalicon from "../assets/hospital-icon.svg";
import thumbnail_1 from "../assets/thumbnail1.jpg";
import thumbnail_2 from "../assets/thumbnail2.webp";
import person1 from "../assets/person1.webp";
import person2 from "../assets/person2.webp";

const HOSPITAL_INFO = {
    name: "MGM Hospital",
    location: "Chhatrapati Sambhaji Nagar",
    address: "Near Chistiya Police Chowki, N-6, CIDCO, Chhatrapati Sambhaji Nagar (Aurangabad), Maharashtra – 431003",
    phone: "0240-68334455",
    email: "info@mgmhospitals.in",
    beds: "Around 400 with multispecialty services",
    specialties: "Cardiology, Neurology, Orthopedics, Gastroenterology, Urology, Nephrology, Oncology, General Surgery, Paediatrics, and more.",
    experience: "24+",
    helplinePhone: "040 68334455"
};

const QUICK_LINKS = [
    {
        img: doctorsicon,
        text: "Doctors",
        link: "#",
        description: "Find expert doctors across specialties"
    },
    {
        img: hospitalicon,
        text: "Hospitals",
        link: "#",
        description: "Explore our hospital network"
    },
    {
        img: bookappointmenticon,
        text: "Book Appointment",
        link: "https://www.mgmhospitals.in/appointment",
        description: "Schedule your medical consultation"
    },
    {
        img: healthcheckups,
        text: "Health Checkups",
        link: "#",
        description: "Comprehensive health screening packages"
    },
];

const SPECIALISTS = [
    { name: "Dr. Girish Vijay Bachhav", specialty: "Interventional Cardiologist", experience: "15+ years" },
    { name: "Dr. Sandeep C. Sabnis", specialty: "Surgical Gastroenterologist", experience: "12+ years" },
    { name: "Dr. Shyam Talreja", specialty: "Urologist & Renal Transplant Specialist", experience: "18+ years" },
    { name: "Dr. Ashwini Sachin Pawar", specialty: "Gynaecologist & Obstetrician", experience: "10+ years" },
];

const WHY_CHOOSE_US = [
    {
        icon: <FontAwesomeIcon icon={faBuilding} />,
        title: "World-class Infrastructure",
        description: "Multispecialty hospital, part of a global healthcare group with European standards"
    },
    {
        icon: <FontAwesomeIcon icon={faAmbulance} />,
        title: "24×7 Emergency Care",
        description: "Round-the-clock emergency services, advanced diagnostics, ICU & surgical care"
    },
    {
        icon: <FontAwesomeIcon icon={faStar} />,
        title: "Patient-Centric Excellence",
        description: "Modern infrastructure and commitment to patient-centric healthcare excellence"
    }
];

const TESTIMONIALS = [
    {
        name: "Farida Sharma",
        city: "Navi Mumbai",
        img: person1,
        text: "Polite staff, excellent treatment, very spacious and well-planned hospital.",
        rating: 5
    },
    {
        name: "Githa Madhuri S",
        city: "Hyderabad",
        img: person2,
        text: "Good maintenance of rooms. Nursing staff was very caring. Felt at home.",
        rating: 5
    }
];

const VIDEO_TESTIMONIALS = [
    {
        id: "1",
        title: "Total Knee Replacement - Bilateral",
        location: "Nashik",
        description: "A 76-year-old patient with knee issues underwent successful surgery by Dr. Jayesh Sonaje.",
        thumbnail: thumbnail_1
    },
    {
        id: "2",
        title: "Sachin Wadekar",
        location: "Sangamner",
        description: "My son's surgery was done successfully. Grateful to the hospital.",
        thumbnail: thumbnail_2
    }
];

const LoadingSpinner = ({ size = "w-8 h-8" }) => (
    <div className={`animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 ${size}`} />
);

const StarRating = ({ rating }) => (
    <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
        ))}
    </div>
);

const ContactInfo = ({ icon, label, value, href, isPhone = false }) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="font-semibold text-gray-800 min-w-fit flex items-center gap-2">
            {icon}
            {label}:
        </span>
        {href ? (
            <a href={href} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                {value}
            </a>
        ) : (
            <span className="text-gray-600">{value}</span>
        )}
    </div>
);

const SimpleImage = ({ src, alt, className, fallbackText = "Image unavailable" }) => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative">
            {isLoading && (
                <div className={`${className} flex items-center justify-center bg-gray-100`}>
                    <LoadingSpinner size="w-6 h-6" />
                </div>
            )}
            
            {!hasError ? (
                <img
                    src={src}
                    alt={alt}
                    className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setHasError(true);
                        setIsLoading(false);
                    }}
                    loading="lazy"
                />
            ) : (
                <div className={`${className} flex items-center justify-center bg-gray-200 text-gray-500`}>
                    <span className="text-sm">{fallbackText}</span>
                </div>
            )}
        </div>
    );
};

export default function HospitalDetails() {
    const navigate = useNavigate();
    const [isBooking, setIsBooking] = useState(false);

    const handleBookAppointment = async () => {
        setIsBooking(true);
        setTimeout(() => {
            navigate("/book");
            setIsBooking(false);
        }, 500);
    };

    const handleExternalLink = (url, event) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'external_link_click', {
                link_url: url,
                link_text: event.target.textContent
            });
        }
    };

    return (
        <>
            <title>{HOSPITAL_INFO.name} - {HOSPITAL_INFO.location} | Multispecialty Healthcare</title>
            <meta name="description" content={`${HOSPITAL_INFO.name} in ${HOSPITAL_INFO.location} offers world-class multispecialty healthcare with ${HOSPITAL_INFO.experience} years of experience. Book appointment now!`} />

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">

                    <section className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 mb-8 lg:mb-12">
                        <div className="text-center lg:text-left mb-8">
                            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 text-blue-700">
                                {HOSPITAL_INFO.name}
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 font-medium">
                                {HOSPITAL_INFO.location}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <ContactInfo
                                        icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
                                        label="Address"
                                        value={HOSPITAL_INFO.address}
                                    />
                                    <ContactInfo
                                        icon={<FontAwesomeIcon icon={faPhone} />}
                                        label="Contact"
                                        value={`${HOSPITAL_INFO.phone} (24×7 Helpline)`}
                                        href={`tel:${HOSPITAL_INFO.phone.replace(/-/g, '')}`}
                                        isPhone={true}
                                    />
                                    <ContactInfo
                                        icon={<FontAwesomeIcon icon={faEnvelope} />}
                                        label="Email"
                                        value={HOSPITAL_INFO.email}
                                        href={`mailto:${HOSPITAL_INFO.email}`}
                                    />
                                    <ContactInfo
                                        icon={<FontAwesomeIcon icon={faHospital} />}
                                        label="Beds"
                                        value={HOSPITAL_INFO.beds}
                                    />
                                    <ContactInfo
                                        icon={<FontAwesomeIcon icon={faStethoscope} />}
                                        label="Specialties"
                                        value={HOSPITAL_INFO.specialties}
                                    />
                                </div>

                                <button
                                    onClick={handleBookAppointment}
                                    disabled={isBooking}
                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
                                >
                                    {isBooking ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <LoadingSpinner size="w-5 h-5" />
                                            Booking...
                                        </span>
                                    ) : (
                                        "Book Appointment Now"
                                    )}
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
                                        Top Specialists
                                    </h2>
                                    <div className="space-y-4">
                                        {SPECIALISTS.map((specialist, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-50 p-4 rounded-xl border-l-4 border-blue-500 hover:bg-blue-50 transition-colors"
                                            >
                                                <h3 className="font-bold text-gray-800 mb-1">
                                                    {specialist.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-1">
                                                    {specialist.specialty}
                                                </p>
                                                <p className="text-blue-600 text-xs font-medium">
                                                    Experience: {specialist.experience}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
                                        Why Choose MGM?
                                    </h2>
                                    <div className="space-y-4">
                                        {WHY_CHOOSE_US.map((reason, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="text-2xl flex-shrink-0 mt-1">
                                                    {reason.icon}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 mb-1">
                                                        {reason.title}
                                                    </h3>
                                                    <p className="text-gray-700 text-sm">
                                                        {reason.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8 lg:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
                            Quick Access
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {QUICK_LINKS.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => handleExternalLink(item.link, e)}
                                    className="group bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl p-6 sm:p-8 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                                >
                                    <SimpleImage
                                        src={item.img}
                                        alt={`${item.text} icon`}
                                        className="w-12 h-12 sm:w-16 sm:h-16 mb-4 group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <span className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-blue-700 text-center transition-colors">
                                        {item.text}
                                    </span>
                                    <span className="text-xs text-gray-500 mt-1 text-center hidden sm:block">
                                        {item.description}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </section>

                    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-2xl rounded-2xl p-6 sm:p-8 lg:p-12 mb-8 lg:mb-12">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div className="space-y-6 order-2 lg:order-1">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                                    Bringing European Health Standards To India
                                </h2>

                                <div className="space-y-4 text-blue-50">
                                    <p className="text-base sm:text-lg">
                                        MGM is the leading Multispecialty Hospital chain in India.
                                        It is one of the largest healthcare providers in Europe with a
                                        significant presence in India.
                                    </p>
                                    <p className="text-base sm:text-lg">
                                        We provide a broad spectrum of healthcare services with an extensive
                                        network across Telangana, Andhra Pradesh, Maharashtra and Karnataka,
                                        treating millions of patients every year with international standards.
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6 py-6">
                                    <div className="text-center sm:text-left">
                                        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">
                                            {HOSPITAL_INFO.experience}
                                        </div>
                                        <div className="text-blue-100 font-medium">
                                            Years Experience
                                        </div>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <div className="text-blue-100 text-sm mb-1">
                                            Call to ask any Questions
                                        </div>
                                        <a
                                            href={`tel:${HOSPITAL_INFO.helplinePhone.replace(/\s/g, '')}`}
                                            className="text-xl sm:text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
                                        >
                                            {HOSPITAL_INFO.helplinePhone}
                                        </a>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBookAppointment}
                                    disabled={isBooking}
                                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
                                >
                                    {isBooking ? "Booking..." : "Book an Appointment"}
                                </button>
                            </div>

                            <div className="order-1 lg:order-2">
                                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                    <SimpleImage
                                        src={machine}
                                        alt="Advanced medical equipment"
                                        className="rounded-2xl shadow-2xl w-full h-48 sm:h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                                    />
                                    <SimpleImage
                                        src={reception}
                                        alt="Modern hospital reception"
                                        className="rounded-2xl shadow-2xl w-full h-48 sm:h-64 object-cover mt-6 sm:mt-8 transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 lg:mb-12 text-gray-800">
                            Patient Stories
                        </h2>

                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">Video Stories</h3>
                                <div className="space-y-6">
                                    {VIDEO_TESTIMONIALS.map((video, index) => (
                                        <div key={index} className="bg-gray-50 shadow-md hover:shadow-lg p-4 sm:p-6 rounded-xl transition-all duration-300">
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <a
                                                    href={`https://youtu.be/${video.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-shrink-0 group relative"
                                                >
                                                    <SimpleImage
                                                        src={video.thumbnail}
                                                        alt={`Video thumbnail for ${video.title}`}
                                                        className="w-full sm:w-32 h-24 rounded-lg group-hover:opacity-80 transition-opacity"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 transform group-hover:scale-110 transition-transform duration-200">
                                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </a>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-800 mb-2">
                                                        {video.title}
                                                    </h4>
                                                    <p className="text-sm text-blue-600 mb-2 font-medium">
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {video.location}
                                                    </p>
                                                    <p className="text-gray-700 text-sm">
                                                        {video.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">Patient Reviews</h3>
                                <div className="space-y-6">
                                    {TESTIMONIALS.map((testimonial, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 shadow-md hover:shadow-lg p-4 sm:p-6 rounded-xl transition-all duration-300"
                                        >
                                            <div className="flex gap-4">
                                                <SimpleImage
                                                    src={testimonial.img}
                                                    alt={`Portrait of ${testimonial.name}`}
                                                    className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-blue-200"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-800 mb-1">
                                                        {testimonial.name}
                                                    </h4>
                                                    <p className="text-sm text-blue-600 mb-2 font-medium">
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {testimonial.city}
                                                    </p>
                                                    <StarRating rating={testimonial.rating} />
                                                    <blockquote className="text-gray-700 text-sm mt-3 italic">
                                                        "{testimonial.text}"
                                                    </blockquote>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="text-center mt-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                            Ready to Book Your Appointment?
                        </h3>
                        <p className="text-orange-100 mb-6 text-lg">
                            Experience world-class healthcare with our expert medical team
                        </p>
                        <button
                            onClick={handleBookAppointment}
                            disabled={isBooking}
                            className="bg-white text-orange-600 hover:bg-gray-100 disabled:bg-gray-300 disabled:text-gray-500 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
                        >
                            {isBooking ? "Booking..." : "Book Now"}
                        </button>
                    </section>
                </div>
            </div>
        </>
    );
}