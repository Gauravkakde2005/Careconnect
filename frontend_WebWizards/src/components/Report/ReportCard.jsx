import React, { useState } from 'react';
import { FaEdit, FaEye, FaFilePdf } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import EditReport from './EditReport';
import ViewReport from './ViewReport';
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { FaRegShareSquare } from "react-icons/fa";
import SendEmail from './SendEmail';


function ReportCard({ r, onEditPdf, onUpdateReport, onDeletePdf }) {
    // const {  setSendEmail , sendEmail } = useAuth()
    const [isEditing, setIsEditing] = useState(false);
    const [viewPdf, setViewPdf] = useState(false)

    const [sendEmail,setSendEmail] = useState(false)


    const handleDelete = async (reportId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Note?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`https://careconnect-8ap0.onrender.com/api/v1/report/${reportId}`,{
                    withCredentials: true
                });
                toast.success('Note deleted Successfully !');
                onDeletePdf(reportId);


            } catch (err) {
                console.log(err);
            }
        }
    };


    const handleEditNote = () => {
        setIsEditing(true);
        onEditPdf();
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };
    const handleViewNote = () => {
        setViewPdf(false)
    }

    const handleSendEmail = () =>{
        setSendEmail(prev => !prev)
    }

    return (
        <div className='flex rounded-md border p-2 pl-4 pr-4 w-[80%] justify-between shadow-md'>
            <div><FaFilePdf size={30} className="text-red-600" /></div>
            <div><h1 className='text-xl font-semibold'>{r.title} <span className=' font-normal'>({r.reportType})</span></h1></div>
            <div className='flex gap-3 justify-center items-center'>
                <FaEdit size={26} className="text-green-600 cursor-pointer" onClick={handleEditNote} />
                <FaEye size={26} className="text-blue-600 cursor-pointer" onClick={() => setViewPdf(prev => !prev)}  />
                <MdDeleteOutline size={26} className="text-red-600 cursor-pointer" onClick={() => handleDelete(r?._id)} />
                <FaRegShareSquare size={26} className="text-black cursor-pointer" onClick={() => setSendEmail(prev => !prev)} />
            </div>
            {isEditing && (
                <EditReport reportDetails={r} onCancelEdit={handleCancelEdit} onUpdateReport={onUpdateReport} />
            )}
            {
                viewPdf  &&
                <ViewReport reportId={r?._id} onHandleViewNote={handleViewNote}/>
            }
            {
                sendEmail &&
                <SendEmail reportId = {r?._id} handleSendEmail={handleSendEmail}/>
            }


        </div>
    );
}

export default ReportCard;
