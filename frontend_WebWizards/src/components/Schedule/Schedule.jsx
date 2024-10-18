import React, { useEffect, useState } from 'react'
import AddSchedule from './AddSchedule'
import axios from 'axios'
import ScheduleCard from './ScheduleCard'
function Schedule() {

    const [addSchedule, setAddSchedule] = useState(false)
    const [data, setData] = useState([])
    const onHandleSchedule = () => {
        setAddSchedule(prev => !prev)
    }

    useEffect(() => {
        axios.get(`https://careconnect-8ap0.onrender.com/api/v1/schedule/getUserSchedule`,{
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data.data)
                setData(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const handlePdfAdded=(newPdf)=>{
        setData([...data, newPdf]);
    }

    return (
        <div className='flex flex-col gap-5 rounded-lg bg-[#f5f5f5] p-5'>
            <div className='bg-white p-3 rounded-lg flex justify-between'>
                <h1 className='text-blue-500 text-lg font-semibold'>Schedule Medicine</h1>
                <button className="border border-blue-500 rounded-lg bg-blue-500 text-white px-4 py-2" onClick={() => setAddSchedule(prev => !prev)}>Add Schedule</button>
            </div>
            <div className='bg-white p-5 flex flex-col items-center justify-center gap-5'>
                {
                    data.map((d, index) => (
                        <ScheduleCard d={d} key={index}/>
                    ))
                }

            </div>
            {
                addSchedule &&
                <AddSchedule onHandleSchedule={onHandleSchedule} onPdfAdded={handlePdfAdded}/>
            }
        </div>
    )
}
export default Schedule
