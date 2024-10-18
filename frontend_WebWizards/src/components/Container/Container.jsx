import React, { useState } from 'react'
import { FaStethoscope } from "react-icons/fa";
import { Link, useNavigate, Outlet } from "react-router-dom"
import Sidebar from './Sidebar.jsx'
import SmSidebar from './SmSidebar.jsx';
import useAuth from '../../hooks/useAuth.js';
import SmNavbar from './SmNavbar.jsx';

function Container() {
    const { sidebar } = useAuth()

    return (

        <div className='h-screen w-screen '>
            <div className='sm:hidden fixed top-0 w-full z-50 '>
                <SmNavbar />
            </div>
            <div className=' h-[10%] sm:flex  justify-between items-center  pl-5 pr-12   hidden'>
                <div className='flex justify-center items-center gap-3'>
                    <FaStethoscope className="text-2xl text-blue-500 mt-1" />
                    <h1 className='text-blue-500 text-2xl font-semibold'>CareConnect</h1>
                </div>

            </div>
            <hr />
            <div className='w-screen h-[90%] sm:flex hidden '>
                {!sidebar ? <Sidebar className='block' /> :
                    <SmSidebar />
                }
                <div className='w-[95%] bg-[#f5f5f5]  overflow-y-scroll'>
                    <Outlet />
                </div>
            </div>

            <div className='bg-[#f5f5f5] sm:hidden block sm:mt-0 mt-12 '>
                <Outlet />
            </div>
        </div>
    )
}

export default Container