import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth/auth";
import Dashboard from "./pages/Dashboard";
import React from "react";

function App() {
    const token = localStorage.getItem("token");
    console.log(token);

    return (
        <Router>
            <Routes>
                {/* Root path: redirect based on token */}
                <Route path="/" element={<Navigate to={token ? "/dashboard" : "/auth"} />} />

                {/* Auth page */}
                <Route
                    path="/auth"
                    element={token ? <Navigate to="/dashboard" /> : <Auth />}
                />

                {/* Dashboard page */}
                <Route
                    path="/dashboard"
                    element={token ? <Dashboard /> : <Navigate to="/auth" />}
                />

                {/* Catch-all: redirect unknown paths */}
                <Route
                    path="*"
                    element={<Navigate to={token ? "/dashboard" : "/auth"} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
