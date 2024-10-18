import React from 'react'
import doctor from '../../assets/doctor.png'
import decise from '../../assets/decise.png'
import record from '../../assets/record.png'

const Services = () => {
    return (
        <section className='mt-24 container mx-auto flex justify-center items-center lg:px-10 px-4 py-5 text-center'>

            <div>
                <h1 className='text-center lg:text-4xl text-3xl font-bold text-dark-soft font-roboto'>Services we deliver</h1>

                <div className='mt-10 grid lg:grid-cols-3 gap-5'>

                    <div className='border-2 rounded-2xl shadow-md flex justify-center items-center flex-col p-5  gap-10 '>
                        <h1 className='text-2xl font-semibold text-dark-soft'>Maintaining Medical Records</h1>
                        <img src={record} alt=""  className='w-40' />
                        <p>Keep track of your medical records,enabled by mongodb technology.</p>
                    </div>

                    <div className='border-2 rounded-2xl shadow-md flex justify-center items-center flex-col p-5  gap-10'>
                        <h1 className='text-2xl font-semibold text-dark-soft'>Connect With Doctors</h1>
                        <img src={doctor} alt=""  className='w-40' />
                        <p>Share your records with our trusted medical experts, to get a prescription.</p>
                    </div>

                    <div className='border-2 rounded-2xl shadow-md flex justify-center items-center flex-col p-5  gap-10'>
                        <h1 className='text-2xl font-semibold text-dark-soft'>Disease Prediction Model</h1>
                        <img src={decise} alt=""  className='w-40' />
                        <p>Get a quick diagnosis about diseases you might suffer from, based on our ML model.</p>
                    </div>

                </div>




            </div>



        </section>
    )
}

export default Services