"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// ------------------------------------------

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();

    // Throw user Login Page 
    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
