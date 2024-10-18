import React from 'react'
import user from '../../assets/user.png'
import verify from '../../assets/verify.png'
import upload from '../../assets/upload.png'


const GettingStarted = () => {
    return (
        <section className='mt-28 container mx-auto flex justify-center items-center lg:px-10 px-4 py-5'>

            <div className=''>
                <h1 className='text-center lg:text-4xl text-3xl font-bold text-dark-soft font-roboto'>Getting Started is quick and easy</h1>

                <div className='mt-10 grid lg:grid-cols-3 gap-5 text-center'>

                    <div className='border-2 rounded-2xl shadow-md flex justify-center items-center flex-col p-5 gap-10'>
                        <h1 className='text-2xl font-semibold text-dark-soft'>Register Yourself</h1>
                        <img src={user} alt=""  className='w-40'/>
                        <p>Register yourself to the locker, secured by data security standards</p>
                    </div>

                    <div className='border-2 rounded-2xl shadow-md flex justify-center items-center flex-col p-5 gap-10'>
                        <h1 className='text-2xl font-semibold text-dark-soft'>Authenticate Yourself</h1>
                        <img src={verify} alt="" className='w-40' />
                        <p>login with your credentials</p>
                    </div>

                    <div className='border-2 rounded-2xl shadow-md flex justify-center items-center flex-col p-5 gap-10'>
                        <h1 className='text-2xl font-semibold text-dark-soft'>Upload Your Data</h1>
                        <img src={upload} alt="" className='w-40' />
                        <p>Create, update, or view your health record information.</p>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default GettingStarted