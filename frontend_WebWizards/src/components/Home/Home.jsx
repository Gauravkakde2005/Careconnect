import React from 'react'
import '../../App.css'
import home from '../../assets/undraw_book_lover_re_rwjy.svg'
import { SlBookOpen } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom"
import SmNavbar from '../Container/SmNavbar';
import toast, { Toaster } from 'react-hot-toast';
import { FaUserCircle } from "react-icons/fa";
// import useAuth from '../../hooks/useAuth.js'
import { useState, useEffect } from 'react';
import axios from "axios"

function Home() {
    // const { auth } = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState()

    // useEffect(() => {
    //     axios.get('/v1/users/current-user')
    //         .then((res) => {

    //             setUser(res.data.data)

    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, [])

    return (
        <div className='w-full max-h-screen overflow-hidden'>
            <div className='flex  justify-between items-center sm:p-5  sm:pl-10 sm:pr-10 pl-0 pt-4'>
                <div className='sm:flex hidden justify-center items-center gap-3'>
                    <SlBookOpen className="text-2xl text-blue-500 " />
                    <h1 className='text-blue-500 text-2xl font-semibold'>EduScribe</h1>
                </div>
                <div className='sm:hidden fixed top-0 w-full z-50 p-0'>
                    <SmNavbar />
                </div>
                <div className=' sm:block hidden'>
                    <ul className='flex justify-between items-center gap-7 text-gray-500 text-[18px]'>
                        <li className='cursor-pointer'><Link to='/'>Home</Link></li>
                        {/* <li className='cursor-pointer'><Link to='/container/all-pdf'>Notes</Link></li>
                        <li className='cursor-pointer'><Link to="/container/all-project">Project</Link></li> */}
                        <li className='cursor-pointer'><Link to="/container/profile">Profile</Link></li>
                        <li className='cursor-pointer'><Link to="/container/report">Report</Link></li>☻
                    </ul>
                </div>
                <div className='sm:flex gap-3 hidden '>
                    {/* {
                        user?.username ?
                            <>
                                <FaUserCircle size={32} className="text-blue-500" />
                                <h1 className=' text-xl '>{user.username}</h1>
                            </>
                            :
                            (
                                <> */}
                    <button className='rounded-lg bg-blue-500 px-3 py-2 font-mono text-white text-1xl' onClick={() => navigate('/login')}>Login</button>
                    <button className='rounded-lg bg-blue-500 px-3 py-2 font-mono text-white text-1xl' onClick={() => navigate('/register')}>Register</button>
                    {/* </>
                            )
                    } */}
                </div>

            </div>
            <div className='grid  sm:grid-cols-2 grid-rows-1 gap-0 sm:gap-3  sm:mt-0 mt-5'>
                <div className='block sm:hidden my-auto p-10'>
                    <img src={home} alt="" className='h-[80%]' />
                </div>
                <div className='p-10 sm:p-20'>
                    <div className='flex flex-col sm:items-start items-center sm:pl-10 gap-8 sm:gap-10'>
                        <h3 className='text-gray-500'>EduScribe</h3>
                        <div>
                            <h1 className='text-4xl text-blue-700'>Your <span className='text-black font-light'>Notes,</span> Your <span className='text-black font-light'> Projects,</span></h1>
                            <h1 className='text-4xl text-blue-700'><span className='text-black font-light'>Your</span> Success!</h1>
                        </div>
                        <p className='text-gray-500 '>"Struggling to keep up with your academic workload? EduScribe has you covered! Dive into a world of organized learning with our one-stop platform. "</p>
                        <div>
                            <button className='rounded-lg bg-blue-500 px-3 py-3 font-mono text-white text-1xl' onClick={() => navigate('/container/report')}>View Model</button>

                        </div>
                    </div>
                </div>
                <div className='sm:flex justify-center hidden  my-auto p-3 sm:p-20 order-first sm:order-last'>
                    <img src={home} alt="" className='h-[30%] sm:h-[40%]' />
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Home