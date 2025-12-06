"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Icon from "../icon";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

// -----------------------------------------

const AddTaskModal = ({ open, onClose, type, refresh, editData }) => {

    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
    } = useForm();

    // Filled Data to Input
    useEffect(() => {
        if (open) {
            if (type === "edit" && editData) {
                reset({
                    title: editData.taskTitle,
                    description: editData.taskDesc,
                    status: editData.taskStatus
                });
            } else {
                reset({
                    title: "",
                    description: "",
                    status: "",
                    taskImg: null
                });
            }
        }
        // eslint-disable-next-line
    }, [open, type, editData]);


    if (!open) return null;


    // Create / Add New Task Submit
    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const file = data.taskImg?.[0];

            if (file) {
                const validTypes = ["image/jpeg", "image/png", "image/webp"];
                if (!validTypes.includes(file.type)) {
                    setError("taskImg", { message: "Only JPG, PNG, WEBP allowed" });
                    setLoading(false);
                    return;
                }

                if (file.size > 2 * 1024 * 1024) {
                    setError("taskImg", { message: "Max size 2MB allowed" });
                    setLoading(false);
                    return;
                }
            }

            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("desc", data.description);
            formData.append("status", data.status);
            if (file) formData.append("taskImg", file);

            let res

            if (type === "add") {
                res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/task/create`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                res = await axios.patch(
                    `${process.env.NEXT_PUBLIC_API_URL}/task/update/${editData._id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            if (res.data.success) {
                refresh();
                reset();
                onClose();
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to Create Task",
                text: error.response?.data?.message || "Something went wrong!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div className="bg-white w-full max-w-md rounded-lg p-6 relative">

                    <button
                        className="absolute top-4 right-4 text-gray-600 hover:text-black"
                        onClick={onClose}
                        disabled={loading}
                    >
                        <Icon icon="mdi:close" width={26} />
                    </button>

                    <h2 className="text-xl font-semibold text-[#FF7A00] mb-6">
                        Add Task
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-y-4">

                        <input
                            type="text"
                            placeholder="Task Title"
                            className="border p-2 rounded"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">{errors.title.message}</p>
                        )}

                        <textarea
                            placeholder="Task Description"
                            className="border p-2 rounded"
                            rows={3}
                            {...register("description", { required: "Description is required" })}
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}

                        <select
                            className="border p-2 rounded"
                            {...register("status", { required: "Status is required" })}
                        >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-process">In-Process</option>
                            <option value="complete">Complete</option>
                        </select>
                        {errors.status && (
                            <p className="text-red-500 text-sm">{errors.status.message}</p>
                        )}

                        <input
                            type="file"
                            className="border p-2 rounded"
                            {...register("taskImg")}
                        />
                        {errors.taskImg && (
                            <p className="text-red-500 text-sm">{errors.taskImg.message}</p>
                        )}

                        <button
                            type="submit"
                            className={`bg-[#FF7A00] text-white p-2 rounded hover:bg-[#ff8f33] ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Task"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddTaskModal;
