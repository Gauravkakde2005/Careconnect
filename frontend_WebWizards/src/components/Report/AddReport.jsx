import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import useAuth from '../../hooks/useAuth';
import axios from "axios"
// import axios from "../../api/axios.js"
import toast, { Toaster } from 'react-hot-toast';

function AddReport({ onPdfAdded }) {
    const { addReport, setAddReport } = useAuth()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [reportDate, setReportDate] = useState("");
    const [pdfFile, setPdfFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("reportType", reportDate)
        formData.append("pdfFile", pdfFile)
        try {
            const res = await axios.post("https://careconnect-8ap0.onrender.com/api/v1/report/create", formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true

                })
            console.log(res)
            alert("Report Added Successfully...!")
            setAddReport(prev => !prev)
            onPdfAdded(res.data.data)



        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-600 bg-opacity-60 backdrop-filter backdrop-blur-lg">
            <div className="relative w-[60%]  bg-white rounded-md " >
                <div className='flex justify-between items-center p-2'>
                    <h1 className='font-bold text-xl text-blue-500'>Add Report</h1>
                    <IoMdClose size={40} className="hover:bg-[#f5f5f5] cursor-pointer p-2 rounded-full" onClick={() => setAddReport(false)} />
                </div>
                <hr />
                <div>
                    <form onSubmit={handleSubmit} className=''>
                        <div className=" p-5 flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <label className="">Title</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                    placeholder="Enter Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="">Description</label>
                                <textarea
                                    type="text"
                                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                    placeholder="Enter Description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="">Report Date</label>
                                <input
                                    type="date"
                                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                    onChange={(e) => setReportDate(e.target.value)}
                                    value={reportDate}
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="">Pdf File</label>
                                <input
                                    type="file"
                                    className="border border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                    placeholder="Upload a pdf file"
                                    required
                                    accept='application/pdf'
                                    onChange={(e) => setPdfFile(e.target.files[0])}
                                />
                            </div>
                            <div className='mx-auto'>
                                <button className='bg-blue-500 px-6 py-2 rounded-lg shadow-lg text-white hover:bg-blue-700'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddReport