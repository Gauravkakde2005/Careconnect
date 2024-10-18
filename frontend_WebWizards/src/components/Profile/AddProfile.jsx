import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
// import axios from "axios"
import axios from "../../api/axios.js"
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

function AddProfile() {

    const { setProfile, profileData, setProfileData, setAddProfile } = useAuth()

    const [firstName, setFirstName] = useState("");
    const [middleName, setMidddleName] = useState("");
    const [lastName, setLastName] = useState("");

    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [mobileNum, setMobileNum] = useState("");

    const [bloodGroup, setBloodGroup] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");

    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [diseases, setDiseases] = useState("");

    const [emeName, setEmeName] = useState("");
    const [emeMob, setEmeMob] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post("https://careconnect-8ap0.onrender.com/api/v1/profile/",
                {
                    firstName,
                    middleName,
                    lastName,
                    email,
                    mobileNum,
                    age,
                    bloodGroup,
                    dob,
                    gender,
                    weight,
                    height,
                    diseases,
                    emeName,
                    emeMob,
                    address
                })
            console.log(res.data.data)
            // console.log(res.data.data._id)
            setProfileData(res.data.data)

            setAddProfile(false)
            setProfile(true)
            toast.success("Report Added Successfully !", 2000)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-600 bg-opacity-60 backdrop-filter backdrop-blur-lg">
            <div className="relative   bg-white rounded-md " >
                <div className='flex justify-between items-center p-2'>
                    <h1 className='font-bold text-xl text-blue-500'>Add Profile</h1>
                    <IoMdClose size={40} className="hover:bg-[#f5f5f5] cursor-pointer p-2 rounded-full" onClick={() => setAddProfile(false)} />
                </div>
                <hr />
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className=" p-5 flex flex-col gap-2">
                            <div className='flex flex-col gap-5'>
                                <div className="flex  gap-3">
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='firstname'>First Name : </label>
                                        <input
                                            id='firstname'
                                            type="text"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter First Name"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                            required
                                        />
                                    </div>
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='middlename'>Middle Name : </label>
                                        <input
                                            id='middlename'
                                            type="text"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Middle Name"
                                            onChange={(e) => setMidddleName(e.target.value)}
                                            value={middleName}
                                            required
                                        />
                                    </div>
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='lastname'>Last Name : </label>
                                        <input
                                            id='lastname'
                                            type="text"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Last Name"
                                            onChange={(e) => setLastName(e.target.value)}
                                            value={lastName}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex  gap-3">
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='email'>Email : </label>
                                        <input
                                            id='email'
                                            type="email"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                        />
                                    </div>
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='age'>Age : </label>
                                        <input
                                            id='age'
                                            type="text"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Age.."
                                            onChange={(e) => setAge(e.target.value)}
                                            value={age}
                                            required
                                        />
                                    </div>
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='mobilenumber'>Mobile Number : </label>
                                        <input
                                            id='mobilenumber'
                                            type="text"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Mobile Number.."
                                            onChange={(e) => setMobileNum(e.target.value)}
                                            value={mobileNum}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex  gap-3">
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='blood'>Blood Group : </label>
                                        <input
                                            id='blood'
                                            type="text"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Blood Group"
                                            onChange={(e) => setBloodGroup(e.target.value)}
                                            value={bloodGroup}
                                            required
                                        />
                                    </div>
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='dob'>DOB : </label>
                                        <input
                                            id='dob'
                                            type="date"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Age.."
                                            onChange={(e) => setDob(e.target.value)}
                                            value={dob}
                                            required
                                        />
                                    </div>
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='gender'>Gender : </label>
                                        <select
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            onChange={(e) => setGender(e.target.value)}
                                            value={gender}
                                        >
                                            <option value="">Select Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex  gap-3">
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='height'>Height : </label>
                                        <input
                                            id='height'
                                            type="text"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Height"
                                            onChange={(e) => setHeight(e.target.value)}
                                            value={height}
                                            required
                                        />
                                    </div>
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='weight'>Weight : </label>
                                        <input
                                            id='weight'
                                            type="text"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Weight.."
                                            onChange={(e) => setWeight(e.target.value)}
                                            value={weight}
                                            required
                                        />
                                    </div>
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='diseases'>Medical History : </label>
                                        <input
                                            id='diseases'
                                            type="text"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Diseases.."
                                            onChange={(e) => setDiseases(e.target.value)}
                                            value={diseases}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex  gap-3">
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='emename'>Emergency Name : </label>
                                        <input
                                            id='emename'
                                            type="text"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Emergency Name"
                                            onChange={(e) => setEmeName(e.target.value)}
                                            value={emeName}
                                            required
                                        />
                                    </div>
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='ememob'>Emergency Mobile : </label>
                                        <input
                                            id='ememob'
                                            type="text"
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Emergency Number.."
                                            onChange={(e) => setEmeMob(e.target.value)}
                                            value={emeMob}
                                            required
                                        />
                                    </div>

                                </div>
                                <div>
                                    <div className='flex justify-center items-center gap-3'>
                                        <label className="" htmlFor='address'>Address </label>
                                        <textarea
                                            id='address'
                                            className="border border-gray-300 rounded-md px-2 py-1 w-full focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                            placeholder="Enter Address"
                                            onChange={(e) => setAddress(e.target.value)}
                                            value={address}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center items-center mt-5'>
                                <button className="border mx-auto border-blue-500 hover:bg-blue-700 rounded-lg bg-blue-500 text-white px-4 py-2"  >Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProfile