import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="text-center max-w-md">
                <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-800">
                    Page Not Found
                </h2>
                <p className="mt-2 text-gray-600">
                    Sorry, the page you are looking for is not here.
                </p>

                <div className="mt-6">
                    <Link
                        to="/"
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
