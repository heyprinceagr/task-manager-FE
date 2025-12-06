"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// -----------------------------------------

const PublicRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();

    // Throw user Home Page 
    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/");
        }
    }, [isAuthenticated]);

    if (isAuthenticated) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return children;
};

export default PublicRoute;
