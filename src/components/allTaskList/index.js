"use client"

import Image from 'next/image'
import React from 'react'
import Icon from '../icon'

// ----------------------------------------

const AllTaskList = ({ task, onDelete, onDone, onEdit }) => {
    return (
        <>
            <div
                className='w-full sm:w-[280px] shadow-lg md:w-[350px] lg:w-[280px] xl:w-[280px] bg-white border-[1px] border-black/20 rounded-md p-4'
            >
                <div className='w-full h-[100px] flex justify-center items-center bg-white rounded'>

                    {task.taskImg ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/tasks/${encodeURIComponent(task?.taskImg)}`}
                            alt="task"
                            width={300}
                            height={300}
                            className="w-full h-full object-cover rounded"
                        />
                    ) : (
                        <p className="text-gray-500 text-sm">No Image</p>
                    )}
                </div>
                <div className="flex pt-4 flex-col gap-y-2">
                    <p><span className='font-bold'>Title: </span>{task?.taskTitle}</p>
                    <p><span className='font-bold'>Description: </span>{task?.taskDesc}</p>

                    <p className="flex items-center gap-2">
                        <span className="font-bold">Status:</span>
                        <span
                            className={`
                px-2 py-1 text-xs rounded-full font-semibold
                ${task?.taskStatus === "pending" && "bg-yellow-100 text-yellow-700"}
                ${task?.taskStatus === "in-process" && "bg-blue-100 text-blue-700"}
                ${task?.taskStatus === "complete" && "bg-green-100 text-green-700"}
            `}
                        >
                            {task?.taskStatus.charAt(0).toUpperCase() + task?.taskStatus.slice(1)}
                        </span>
                    </p>

                    <p><span className='font-bold'>Created By: </span>{task.user?.username}</p>
                </div>

                <div className='w-full pt-4 flex items-center justify-between'>

                    <button
                        onClick={() => {
                            onEdit(task);
                        }}
                        className='flex justify-center items-center gap-x-1 bg-black text-white py-1 px-2 rounded-md'>
                        <Icon icon={"material-symbols:edit-outline-sharp"} /> Edit
                    </button>

                    <button
                        onClick={() => onDelete(task?._id)}
                        className='flex justify-center items-center gap-x-1 bg-red-500 text-white py-1 px-2 rounded-md'>
                        <Icon icon={"material-symbols-light:delete-rounded"} /> Delete
                    </button>

                    <button
                        onClick={() => onDone(task?._id)}
                        className='flex justify-center items-center gap-x-1 text-white bg-green-500 py-1 px-2 rounded-md'>
                        <Icon icon={"hugeicons:tick-01"} /> Done
                    </button>

                </div>
            </div>
        </>
    )
}

export default AllTaskList
