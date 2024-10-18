import React, { useState } from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom"
import { GrNotes } from "react-icons/gr";
import { GoProjectSymlink } from "react-icons/go";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";
import { FaFileMedical } from "react-icons/fa6";
import useAuth from '../../hooks/useAuth';
import User from '../User/User';
import { FaRegUser } from "react-icons/fa6";
import { CiVirus } from "react-icons/ci";
import { IoIosTimer } from "react-icons/io";

function Sidebar() {

    const { sidebar, setSidebar } = useAuth()

    return (
        <>
            <div className='bg-white h-full  w-[20%] pt-3 flex flex-col justify-between '>

                <ul className="flex flex-col max-md:flex-row w-full gap-1">
                    <div className='flex flex-row justify-between  items-center ml-3'>
                        <NavLink
                            to={"/"}
                            className={({ isActive }) => `${isActive && "text-blue-500 bg-[#f5f5f5]"}   hover:text-blue-500 " hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2   w-[100%] ml-1  font-semibold mt-1 rounded-lg`}
                        >
                            <div className=" flex  items-center ">
                                {" "}
                                <AiOutlineHome size={22} className="" />
                            </div>
                            <div> Home</div>

                        </NavLink>
                        <div className=''>
                            <TfiArrowCircleLeft className='text-black border border-white bg-white rounded-full hover:bg-[#f5f5f5] hover:text-blue-500 relative cursor-pointer left-3 mt-1' size={24} onClick={() => (setSidebar(true))} />

                        </div>
                    </div>
                    <NavLink
                        to={"/container/profile"}
                        className={({ isActive }) => `${isActive && "text-blue-500 bg-[#f5f5f5]"}   hover:text-blue-500 " hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold ml-4 mr-6  mt-1 rounded-lg`}
                    >

                        <div className=" flex  items-center ">
                            {" "}
                            <FaRegUser size={22} className="" />
                        </div>
                        <div> Profile</div>
                    </NavLink>
                    <NavLink
                        to={"/container/report"}
                        className={({ isActive }) => `${isActive && "text-blue-500 bg-[#f5f5f5]"}   hover:text-blue-500 " hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold ml-4 mr-6  mt-1 rounded-lg`}
                    >

                        <div className=" flex  items-center ">
                            {" "}
                            <FaFileMedical size={22} className="" />
                        </div>
                        <div> Reports</div>
                    </NavLink>
                     <NavLink
                        to={"/container/predis"}
                        className={({ isActive }) => `${isActive && "text-blue-500 bg-[#f5f5f5]"}  hover:text-blue-500 " hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold ml-4 mr-6 mt-1 rounded-lg`}
                    >
                        <div className=" flex  items-center ">
                            {" "}
                            <CiVirus size={22} className="" />
                        </div>
                        <div>Symtoms</div>
                    </NavLink> 
                    <NavLink
                        to={"/container/schedule"}
                        className={({ isActive }) => `${isActive && "text-blue-500 bg-[#f5f5f5]"}  hover:text-blue-500 " hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold ml-4 mr-6 mt-1 rounded-lg`}
                    >
                        <div className=" flex  items-center ">
                            {" "}
                            <IoIosTimer size={22} className="" />
                        </div>
                        <div>Schedule</div>
                    </NavLink> 
                </ul>
                <div>
                    <User />
                </div>
            </div>


        </>
    )
}

export default Sidebar