import axios from 'axios';
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";

function AddSchedule({ onHandleSchedule , onPdfAdded}) {
    const [disease, setDisease] = useState("")
    const [medicine, setMedicine] = useState("")
    const [scheduleType, setScheduleType] = useState("")
    const [timing, setTiming] = useState("")

    
    // const [timeInput, setTimeInput] = useState('');
    const [cronResult, setCronResult] = useState('');
  
    const convertToCron = () => {
      try {
        const [hours, minutes] = scheduleType.split(':');
        const cronExpression = `${minutes} ${hours} * * *`;
  
        setCronResult(cronExpression);
      } catch (error) {
        console.error('Error converting time to cron:', error);
      }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(disease)
        console.log(medicine)
        console.log(timing)
        convertToCron()
        console.log(cronResult)
        axios.post("https://careconnect-8ap0.onrender.com/api/v1/schedule/", {
            disease,
            medicine,
            scheduleType :cronResult,
            timing
        },{
            withCredentials: true
        })
            .then((res) => {
                console.log(res)
                onPdfAdded(res.data.data)
                onHandleSchedule()
            }
            )
            .catch((err) => console.log(err))
    }

    return (
        <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-600 bg-opacity-60 backdrop-filter backdrop-blur-lg">
            <div className="relative  w-[90%] p-5  bg-white rounded-md " >
                <div className='flex justify-between items-center p-2'>
                    <h1 className='font-bold text-xl text-blue-500'>Add Profile</h1>
                    <IoMdClose size={40} className="hover:bg-[#f5f5f5] cursor-pointer p-2 rounded-full" onClick={onHandleSchedule} />
                </div>
                <hr />
                <div className='w-full'>
                    <form onSubmit={handleSubmit} className=''>
                        <div className="flex flex-col gap-1">
                            <label className="">Disease : </label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                placeholder="Enter Disease.."
                                onChange={(e) => setDisease(e.target.value)}
                                value={disease}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="">Medicine : </label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                placeholder="Enter Medicine.."
                                onChange={(e) => setMedicine(e.target.value)}
                                value={medicine}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="">Schedule Time : </label>
                            <input
                                type="time"
                                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                placeholder="Enter Medicine.."
                                onChange={(e) => setScheduleType(e.target.value)}
                                value={scheduleType}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="">Medicine Type : </label>
                            <select id="meal-time" onChange={(e) => setTiming(e.target.value)}>
                                <option value="before">Before Meal</option>
                                <option value="after">After Meal</option>
                            </select>
                        </div>
                        <div className='flex justify-center items-center'>
                            <button className='bg-blue-500 px-6 py-2 rounded-lg shadow-lg text-white hover:bg-blue-700 mt-5'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddSchedule
