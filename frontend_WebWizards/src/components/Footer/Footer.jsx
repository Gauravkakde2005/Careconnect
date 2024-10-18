import React from 'react'
// import {images} from '../../constants'
import { FaTwitter } from "react-icons/fa";
import { AiFillHeart, AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaYoutube, FaTelegram } from "react-icons/fa";


function Footer() {
    return (
        <div className='mt-24'>
            <svg
                className="w-full h-auto max-h-40 translate-y-[1px]"
                preserveAspectRatio="none"
                viewBox="0 0 2160 263"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    id="Wave"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
                    fill="#0D2436"
                />
            </svg>
            <section className='bg-dark-hard'>
                <footer className='container mx-auto grid grid-cols-10 px-5 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10'>

                    <div className='col-span-5 md:col-span-4 lg:col-span-2'>
                        <h3 className='text-dark-light font-bold md:text-lg'>Product</h3>
                        <ul className='text-[#959EAD] mt-5 text-sm space-y-4  md:text-base'>
                            <li><a href='/'>Landingpage</a></li>
                            <li><a href='/'>Features</a></li>
                            <li><a href='/'>Documentation</a></li>
                            <li><a href='/'>Referral Program</a></li>
                            <li><a href='/'>Pricing</a></li>
                        </ul>
                    </div>

                    <div className='col-span-5 md:col-span-4 lg:col-span-2'>
                        <h3 className='text-dark-light font-bold md:text-lg'>Services</h3>
                        <ul className='text-[#959EAD] mt-5 text-sm space-y-4 md:text-base'>
                            <li><a href='/'>Documentation</a></li>
                            <li><a href='/'>Design</a></li>
                            <li><a href='/'>Themes</a></li>
                            <li><a href='/'>Illustrations</a></li>
                            <li><a href='/'>UI Kit</a></li>
                        </ul>
                    </div>

                    <div className='col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-auto'>
                        <h3 className='text-dark-light font-bold md:text-lg'>Company</h3>
                        <ul className='text-[#959EAD] mt-5 text-sm space-y-4 md:text-base'>
                            <li><a href='/'>About</a></li>
                            <li><a href='/'>Terms</a></li>
                            <li><a href='/'>Privacy Policy</a></li>
                            <li><a href='/'>RCareers</a></li>
                        </ul>
                    </div>

                    <div className='col-span-5 md:col-span-4 lg:col-span-2'>
                        <h3 className='text-dark-light font-bold md:text-lg'>More</h3>
                        <ul className='text-[#959EAD] mt-5 text-sm space-y-4 md:text-base'>
                            <li><a href='/'>Landingpage</a></li>
                            <li><a href='/'>Features</a></li>
                            <li><a href='/'>Documentation</a></li>
                        </ul>
                    </div>

                    <div className='col-span-10 md:order-first md:col-span-4 lg:col-span-2'>
                        <img src="" alt="Logo" className='brightness-0 invert mx-auto w-20 md:mx-0' />
                        <p className='mt-4 text-dark-light text-center text-sm md:text-left md:text-base'>Build a modern and creative website with crealand</p>
                        <ul className='flex justify-center items-center text-gray-300 space-x-4 mt-5 md:justify-start'>
                            <li><a href="/"><FaTwitter className='w-6 h-auto' /></a></li>
                            <li><a href="/"><FaFacebook className='w-6 h-auto' /></a></li>
                            <li><a href="/"><FaTelegram className='w-6 h-auto' /></a></li>
                            <li><a href="/"><AiFillInstagram className='w-6 h-auto' /></a></li>
                            <li><a href="/"><FaYoutube className='w-6 h-auto' /></a></li>
                        </ul>
                    </div>
                </footer>

                <div className='hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-10 pb-7'>
                    <div className='bg-primary text-white rounded-full p-3'>
                        <AiFillHeart className='w-7 h-auto' />
                    </div>

                    <p className='text-center text-dark-light text-base italic font-bold'>Copyright © 2023. Crafted with love.</p>
                </div>

            </section>
        </div>
    )
}

export default Footer