"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Icon from "../icon";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slice/authSlice";
import Swal from "sweetalert2";

// --------------------------------------------

const SignUpPageComponent = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();


    // Sign up Submit 
    const onSubmit = async (data) => {
        const file = data.profileImg[0];

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            setError("profileImg", {
                message: "Only JPG, PNG or WEBP images allowed",
            });
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError("profileImg", {
                message: "Image size should be less than 2MB",
            });
            return;
        }

        const formData = new FormData();
        formData.append("profileImg", file);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);

        try {
            setLoading(true);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                });

            if (res.data.success) {
                dispatch(loginSuccess(res.data.data));
                router.push("/");
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Sign up Failed",
                text: error.response?.data?.message || "Something went wrong!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full min-h-screen flex justify-center items-center bg-[#0D0D0D]">
                <div className="max-w-[700px] py-12 md:py-0 px-4 md:px-0 w-full">
                    <div className="p-10 w-full rounded-2xl flex flex-col 
                    bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl">

                        <div className="flex flex-col gap-y-3 justify-center items-center">
                            <p className="text-center text-[#FF7A00] font-bold text-4xl drop-shadow-md">
                                Sign up
                            </p>
                            <p className="text-gray-300">
                                Create Your Account in Task Manager
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex pt-12 gap-y-7 flex-col w-full">

                            <div className="flex gap-y-2 flex-col w-full">
                                <p className="text-[#FF9D4D] font-semibold">Profile Image *</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="text-gray-200"
                                    {...register("profileImg", { required: "Profile image is required" })}
                                />
                                {errors.profileImg && (
                                    <p className="text-red-400 text-sm">{errors.profileImg.message}</p>
                                )}
                            </div>

                            <div className="flex gap-y-2 flex-col w-full">
                                <p className="text-[#FF9D4D] font-semibold">Username *</p>
                                <input
                                    type="text"
                                    className="text-white bg-white/20 p-3 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                                    {...register("username", { required: "Username is required" })}
                                />
                                {errors.username && (
                                    <p className="text-red-400 text-sm">{errors.username.message}</p>
                                )}
                            </div>

                            <div className="flex gap-y-2 flex-col w-full">
                                <p className="text-[#FF9D4D] font-semibold">Email *</p>
                                <input
                                    type="email"
                                    className="text-white bg-white/20 p-3 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                                    {...register("email", { required: "Email is required" })}
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="flex gap-y-2 flex-col w-full relative">
                                <p className="text-[#FF9D4D] font-semibold">Password *</p>
                                <input
                                    type={showPass ? "text" : "password"}
                                    className="text-white bg-white/20 p-3 font-semibold rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                                    {...register("password", { required: "Password is required" })}
                                />

                                <span
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-[44px] text-[#FF9D4D] cursor-pointer"
                                >
                                    <Icon icon={showPass ? "mdi:eye-off" : "mdi:eye"} width="26" />
                                </span>

                                {errors.password && (
                                    <p className="text-red-400 text-sm">{errors.password.message}</p>
                                )
                                }
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full text-md font-bold text-white p-3 rounded-full 
                                bg-[#FF7A00] hover:bg-[#ff8f33] ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {loading ? "Signing up..." : "Sign up"}
                                </button>
                            </div>

                            <div>
                                <Link href={"/login"} className="w-fit hover:underline text-[#ff8f33]">
                                    Already Have Account ?
                                </Link>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpPageComponent;
