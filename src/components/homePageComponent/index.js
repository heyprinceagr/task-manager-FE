"use client";

import React, { useEffect, useState } from "react";
import Icon from "../icon";
import AddTaskModal from "../addTaskModal";
import axios from "axios";
import { useSelector } from "react-redux";
import AllTaskList from "../allTaskList";
import Swal from "sweetalert2";

// --------------------------------------

const HomePageComponent = () => {

    const [openModal, setOpenModal] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const token = useSelector((state) => state.auth.token);

    // Fetch All Task 
    const fetchTasks = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/task/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTasks(res.data?.data || []);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to Fetch Tasks",
                text: error.response?.data?.message || "Something went wrong while fetching tasks!",
            });
        }
    };

    // Delete Task 
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/task/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchTasks();

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text: error.response?.data?.message || "Something went wrong while deleting!",
            });
        }
    };

    // Complete Task 
    const markComplete = async (id) => {
        try {
            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/task/mark-complete/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchTasks();

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to Mark Complete",
                text: error.response?.data?.message || "Something went wrong while updating task!",
            });
        }
    };

    // Edit Task 
    const handleEdit = (task) => {
        setEditTask(task);
        setOpenModal(true);
    };


    useEffect(() => {
        // eslint-disable-next-line
        fetchTasks();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className='w-full flex pt-20 justify-center items-center'>
                <div className='max-w-[1200px] w-full px-4 xl:px-0 flex flex-col justify-center items-start'>

                    <div className='w-full flex flex-col md:flex-row gap-y-8 justify-between items-start md:items-center'>
                        <div className='flex flex-col gap-y-4'>
                            <p className='text-4xl text-[#FF7A00] font-bold'>
                                Manage Your Tasks
                            </p>
                            <p className='text-gray-700 mt-2'>
                                Create, organize, and complete tasks effortlessly
                            </p>
                        </div>
                        <div>
                            <button
                                onClick={() => setOpenModal(true)}
                                className='text-white flex justify-center items-center gap-x-2 bg-[#FF7A00] px-3 py-1 rounded hover:bg-[#ff8f33]'
                            >
                                <Icon icon={"material-symbols:add-rounded"} /> Add Task
                            </button>
                        </div>
                    </div>


                    <div className='pt-20 w-full flex justify-center flex-wrap gap-6'>

                        {tasks.length === 0 ? (
                            <p className="text-gray-600">No tasks created yet.</p>
                        ) : (
                            tasks.map((task, index) => {
                                return (
                                    <AllTaskList
                                        key={index}
                                        task={task}
                                        onDelete={deleteTask}
                                        onDone={markComplete}
                                        onEdit={handleEdit}
                                    />
                                )
                            })
                        )}
                    </div>
                </div>
            </div >

            <AddTaskModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditTask(null);
                }}
                editData={editTask}
                type={editTask ? "edit" : "add"}
                refresh={fetchTasks}
            />

        </>
    );
};

export default HomePageComponent;
