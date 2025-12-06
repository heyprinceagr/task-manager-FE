"use client";

import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slice/authSlice";

// ---------------------------------------

const Navbar = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // Logout Redux 
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="w-full h-[70px] flex justify-between items-center px-6 bg-[#0D0D0D]">
            <Link href="/">
                <span className="text-[#FF7A00] font-bold text-xl">Task Manager</span>
            </Link>

            <div className="flex gap-4 items-center">
                {isAuthenticated ? (
                    <>
                        <button
                            onClick={handleLogout}
                            className="text-white bg-[#FF7A00] px-3 py-1 rounded hover:bg-[#ff8f33]"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-white hover:text-[#FF7A00]">
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="text-white bg-[#FF7A00] px-3 py-1 rounded hover:bg-[#ff8f33]"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
