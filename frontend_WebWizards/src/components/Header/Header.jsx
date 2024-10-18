import React, { useState } from 'react'
// import { images } from '../../constants'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom"
import { FaStethoscope } from "react-icons/fa";
import axios from "axios"
import useAuth from "../../hooks/useAuth.js"
import useLogout from "../../hooks/useLogout.js"
import { jwtDecode } from "jwt-decode"
import { FaUserCircle } from "react-icons/fa";

const navItemInfo = [
    { name: 'Home', type: "link" },
    { name: 'Profile', type: "link" },
    { name: 'Report', type: "link" },

];


const NavItems = ({ item }) => {



    const navigate = useNavigate()

    const [dropdown, setDropdown] = useState(false);

    const toggleDropdownHandler = () => {
        setDropdown((curState) => {
            return !curState;
        })
    }

    return (
        <li className='relative group'>
            {
                item.type === "link" ? (
                    <>
                        <a href="/" className='px-4 py-2'>
                            {item.name}
                        </a>
                        <span className='cursor-pointer text-blue-500 absolute font-bold transition-all duration-500 top-0 right-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100'>
                            /
                        </span>
                    </>

                ) : (
                    <div className='flex flex-col items-center'>
                        <button className='px-4 py-2 flex gap-x-1 items-center'
                            onClick={toggleDropdownHandler}>
                            <span>{item.name}</span>
                            <MdKeyboardArrowDown />
                        </button>

                        <div
                            className={` ${dropdown ? "block" : "hidden"} 
              lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max `}>

                            <ul className='bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden'>
                                {
                                    item.items.map((page) => (

                                        <a href="/" className='hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-hard '>
                                            {page}
                                        </a>

                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                )}
        </li>
    )
}


const Header = () => {
    const { auth } = useAuth()
    const logout = useLogout()

    const decoded = auth?.accessToken
        ? jwtDecode(auth.accessToken)
        : undefined

    const fullName = decoded?.fullName || "username"

    const [navIsVisible, setNavIsVisible] = useState(false);

    const NavVisibilityHandler = () => {
        setNavIsVisible((curState) => {
            return !curState;
        });
    }

    return (
        <section className='sticky top-0 left-0 right-0 z-50 bg-white'>
            <header className='container mx-auto px-10 flex justify-between py-4 items-center'>

                {/* logo  */}
                <div className=' flex gap-3'>
                    <FaStethoscope className="text-2xl text-blue-500 mt-1" />
                    <span className='text-2xl font-bold text-blue-600 font-roboto'>CareConnect</span>
                </div>

                {/* Menu Icon  */}
                <div className='lg:hidden z-50'>
                    {navIsVisible ? (
                        <AiOutlineClose className='h-6 w-6' onClick={NavVisibilityHandler} />
                    ) : (
                        <AiOutlineMenu className='w-6 h-6' onClick={NavVisibilityHandler} />

                    )}
                </div>

                {/* NavItems  */}
                <div className={`${navIsVisible ? "right-0" : "-right-full"} transition-all duration-300 mt-[72px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0  lg:static gap-x-9 items-center`}>
                    <ul className='text-white gap-y-5 lg:text-dark-soft flex gap-x-2 flex-col lg:flex-row items-center font-semibold'>
                        {
                            navItemInfo.map((item) => (
                                <NavItems key={item.name} item={item} />
                            ))
                        }
                    </ul>


                </div>
                <div className='flex gap-5'>
                {
                        auth?.accessToken
                        &&
                        <div className='flex my-auto gap-3'>
                            <FaUserCircle size={32} className="text-blue-500" />
                            <h1 className=' text-xl '>{fullName}</h1>
                        </div>
                    }
                    {
                        auth?.accessToken
                            ?
                            <button className='mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 text-blue-500 font-semibold hover:text-white hover:bg-blue-500 transition-all duration-300 rounded-full cursor-pointer' onClick={() => logout()}>Logout</button>
                            :
                            <button className='mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 text-blue-500 font-semibold hover:text-white hover:bg-blue-500 transition-all duration-300 rounded-full cursor-pointer' ><Link to="/login">Login</Link></button>
                    }
                    
                </div>

            </header>
        </section>
    )
}

export default Header