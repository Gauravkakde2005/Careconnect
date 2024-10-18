import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import axios from '../../api/axios';

function ScheduleCard({d}) {

    const handleAlarm =()=>{
        console.log("jdsijf");
        axios.post(`https://careconnect-8ap0.onrender.com/api/v1/schedule/${d._id}`,{
            withCredentials: true
        })
        .then(
            (res)=>{
                console.log("jhd ")
                console.log(res)
                alert("Reminder sent successfully...")
            }
        )
        .catch((err)=>(console.log(err)))
    }
    return (
        <div className='flex rounded-md border p-2 pl-4 pr-4 w-[80%] justify-between shadow-md bg-white items-center gap-3'>
            <div className='flex justify-between w-full items-center'>
            <div><h1 className='text-xl font-semibold'>{d.disease}</h1></div>
            <button onClick={handleAlarm} className='text-white bg-green-500 py-2 px-2 rounded-md'>reminde me</button>
            {/* <IoMdNotificationsOutline size={22} className="text-red-700 cursor-pointer" onClick={handleAlarm}/> */}
            </div>
        </div>
    )
}

export default ScheduleCard
