import React, { useState } from 'react'
import axios from "axios"
import AddSchedule from '../Schedule/AddSchedule'
import PredictDisease from '../predict/PredictDisease'


function Predis() {
   

    return (
        <div className='flex flex-col gap-5 rounded-lg bg-[#f5f5f5] p-5'>
            <div className='bg-white p-3 rounded-lg'>
                <h1 className='text-blue-500 text-lg font-semibold'>Predict Disease</h1>
            </div>

            <div className='bg-white p-3 rounded-lg flex justify-between'>
                <PredictDisease/>
            </div>
         
        </div>
    )
}

export default Predis
