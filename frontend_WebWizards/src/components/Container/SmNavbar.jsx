import React, { useState, useEffect } from 'react'
import { SlBookOpen } from "react-icons/sl";
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, useNavigate, Outlet } from "react-router-dom"
import axios from 'axios'
import { FaUserCircle } from "react-icons/fa";
// import useLogout from '../../hooks/useLogout.js';

function SmNavbar() {
    const navigate = useNavigate()
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)
    const [user, setUser] = useState()
    // const logout = useLogout()

    // useEffect(() => {
    //     axios.get('/v1/users/current-user')
    //         .then((res) => {
    //             // const username = res.data.data.username
    //             setUser(res.data.data)
    //             // setAuth({ username: username })
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, [])

    // const handleLogout = async () => {
    //     await logout()
    //     setUser("")

    // }

    return (
        <div className=' h-[10%] flex bg-white justify-between items-center  p-3  mb-5'>
            <div className='flex justify-center items-center gap-3'>
                <SlBookOpen className="text-2xl text-blue-500 mt-1" />
                <h1 className='text-blue-500 text-2xl font-semibold'>EduScribe</h1>
            </div>
            {/* {user?.username &&
                <div className='flex gap-1'>
                    <FaUserCircle size={32} className="text-blue-500" />
                    <h1 className=' text-xl '>{user.username}</h1>
                </div>
            } */}

            <div onClick={handleClick} className='md:hidden z-10'>
                {!nav ? <FaBars className='text-2xl' /> : <FaTimes className='text-2xl' />}
            </div>

            <ul className={!nav ? 'hidden' : '  absolute top-0 left-0 w-full h-screen bg-blue-300 flex flex-col justify-center items-center'}>
                <li className='py-6 text-4xl'><Link onClick={handleClick} to='/' smooth="true" duration={500} >Home</Link></li>
                {/* <li className='py-6 text-4xl'><Link onClick={handleClick} to='/container/dashboard' smooth="true" duration={500} >Dashboard</Link></li> */}
                <li className='py-6 text-4xl'><Link onClick={handleClick} to='/container/all-pdf' smooth="true" duration={500} >Notes</Link></li>
                {/* <li className='py-6 text-4xl'><Link onClick={handleClick} to='/container/all-project' smooth="true" duration={500} >Project</Link></li> */}
                {/* {user?.username
                    ? <li className='py-6 text-4xl' onClick={handleLogout}> Logout </li>
                    :
                    <>
                        <li className='py-6 text-4xl'><Link onClick={handleClick} to='/login' smooth="true" duration={500} >Login</Link></li>
                        <li className='py-6 text-4xl'><Link onClick={handleClick} to='/register' smooth="true" duration={500} >Register</Link></li>
                    </>
                } */}


            </ul>
        </div>
    )
}

export default SmNavbar