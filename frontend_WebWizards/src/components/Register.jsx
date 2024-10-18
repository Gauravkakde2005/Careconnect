import React, { useState, useEffect, useRef } from 'react'
import registerImg from '../assets/register.svg'
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline, IoSchoolOutline } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';




const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;


function Register() {

    const navigate = useNavigate()
    const userRef = useRef()
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [fullName, setfullName] = useState('')
    const [errMsg, setErrMsg] = useState("")


    useEffect(() => {
        userRef.current.focus()
    }, [])

    const handleRegister = async () => {

        if (!PWD_REGEX.test(pwd)) {
            toast.error("Password must be 8-24 characters, containing uppercase and lowercase letters, a number, and a special character.")
            return;
        }
        if (!EMAIL_REGEX.test(email)) {
            toast.error("Enter Valid Email")
            return;
        }
        try {
            const response = await axios.post('https://careconnect-8ap0.onrender.com/api/v1/user/register',
                JSON.stringify({ fullName: fullName, email, password: pwd }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            )
            console.log(response?.data);
            console.log(JSON.stringify(response));
            toast.success("User Register Successfully")
            navigate("/login")
            setUser("")
            setPwd("")
            setEmail("")
            setClgName("")
            // setTimeout(() => {
            //     navigate('/login')
            // }, 2000);

        } catch (err) {

            if (!err) {
                toast.error("No Server Response")
            } else if (err.response?.status === 409) {
                toast.error("User with email or username already exists")
            }

        }
    }


    return (
        <div className='w-screen h-screen bg-[#f5f5f5] flex justify-center items-center sm:p-10 p-0'>
            <div className='bg-white grid sm:grid-cols-2 grid-cols-1 rounded-xl  w-[80%] shadow-xl '>
                <div className='hidden sm:block'>
                    <img src={registerImg} alt="" className='' />
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='flex flex-col p-3 sm:p-5 gap-3 items-center'>
                        <div>
                            <h1 className='text-2xl font-bold text-blue-500'>Register</h1>
                        </div>

                        <div className='flex flex-col justify-center mt-10  w-[90%]  '>
                            <input
                                type="text"
                                ref={userRef}
                                placeholder='Full Name'
                                required
                                value={fullName}
                                autoComplete="off"
                                onChange={(e) => { setfullName(e.target.value) }}
                                className='cursor-pointer outline-blue-500 px-10 w-[100%] py-3 bg-[#f5f5f5]    rounded-md border border-blue-500' />
                            <IoSchoolOutline size={24} className='absolute text-blue-500 ml-2' />
                        </div>
                        <div className='flex flex-col justify-center  w-[90%]  '>
                            <input
                                type="text"

                                value={email}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='Email'
                                className='cursor-pointer outline-blue-500 px-10 w-[100%] py-3 bg-[#f5f5f5]    rounded-md border border-blue-500' />
                            <MdOutlineEmail size={24} className='absolute text-blue-500 ml-2' />

                        </div>

                        <div className='flex flex-col justify-center  w-[90%]  '>
                            <input
                                type="password"
                                placeholder='Password'
                                autoComplete="current-password"
                                value={pwd}
                                required
                                onChange={(e) => setPwd(e.target.value)}
                                className='cursor-pointer outline-blue-500 px-10 w-[100%] py-3 bg-[#f5f5f5]    rounded-md border border-blue-500' />
                            <IoKeyOutline size={24} className='absolute text-blue-500 ml-2' />
                        </div>


                        <button className='bg-blue-700 mt-5 py-4 w-[90%]  text-white rounded-lg hover:bg-blue-800' onClick={handleRegister}>Register</button>
                        <p >Already have Account <Link to='/login' className='text-blue-500 underline'> Login </Link></p>
                    </div>
                    <Toaster />
                </form>
            </div>
        </div>
    )
}

export default Register