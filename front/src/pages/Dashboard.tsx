import React from "react";

export default function Dashboard() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold">Welcome to the Dashboard 🎉</h1>
            <button
                onClick={handleLogout}
                className="mt-6 px-6 py-2 bg-red-500 text-white rounded-xl shadow-md"
            >
                Logout
            </button>
        </div>
    );
}
