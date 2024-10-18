import React, { useState, useEffect } from 'react';
// import axios from 'axios';/
import axios from "../../api/axios.js"
import ReportCard from './ReportCard';
import useAuth from '../../hooks/useAuth';
import AddReport from './AddReport';
import { FaRegShareSquare } from "react-icons/fa";
import SendEmail from '../Report/SendEmail.jsx';
import { jwtDecode } from "jwt-decode"

function Report() {


    // const { addReport, setAddReport, setSendEmail , sendEmail , auth} = useAuth();
    const { addReport, setAddReport, auth} = useAuth();
    const [report, setReport] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedDate, setSelectedDate] = useState('');
    const [sendEmail,setSendEmail] = useState(false) 

    const decoded = auth?.accessToken
        ? jwtDecode(auth.accessToken)
        : undefined

        const userId = decoded?._id 

    useEffect(() => {
        axios.get("https://careconnect-8ap0.onrender.com/api/v1/report/getAllreports")
            .then((res) => {
                console.log(res.data.data);
                setReport(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    const filteredProducts = report.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDate ? report.reportType === selectedDate : true)
    );


    const handlePdfAdded = (newPdf) => {
        setReport([...report, newPdf]);
    };

    const handleEditPdf = () => {
        setReport(prevReport => prevReport.map(r => ({ ...r }))); 
    };

    const updateReport = (updatedReport) => {
        const updatedReportIndex = report.findIndex(r => r._id === updatedReport._id);
        if (updatedReportIndex !== -1) {
            const updatedReportList = [...report];
            updatedReportList[updatedReportIndex] = updatedReport;
            setReport(updatedReportList);
        }
    };

    const handleDeletePdf = (reportId) => {
        setReport(report.filter((r) => r._id !== reportId));
    }

    const handleSendEmail = () =>{
        setSendEmail(prev => !prev)
    }

    return (
        <div className='flex flex-col gap-5 rounded-lg bg-[#f5f5f5] p-5'>
            <div className='bg-white p-3 rounded-lg'>
                <h1 className='text-blue-500 text-lg font-semibold'>Medical Report's</h1>
            </div>
            <div className='bg-white p-3 rounded-lg flex justify-between items-center '>
                <input type="text"
                    className='w-1/3 border border-blue-500 p-1 rounded-md px-5'
                    placeholder='Search with title..'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />  
                <input type="date"
                    className='w-1/4 border border-blue-500 p-1 rounded-md px-5'
                    placeholder='Filter with date..'
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />  

                <div className='flex gap-3'>
                    <button className="border border-blue-500 rounded-lg bg-blue-500 text-white px-4 py-2" onClick={() => setSendEmail(prev => !prev)}  >Share</button>
                    <button className="border border-blue-500 rounded-lg bg-blue-500 text-white px-4 py-2" onClick={() => setAddReport(prev => !prev)}>Add Report</button>
                </div>
            </div>

            <div className='flex flex-col  gap-5 bg-white p-5 justify-center items-center rounded-lg'>
                {filteredProducts.map((r, index) => (
                    <ReportCard key={index} r={r} onDeletePdf={handleDeletePdf} onEditPdf={handleEditPdf} onUpdateReport={updateReport} />
                ))}
            </div>

            {
                addReport && 
                <AddReport onPdfAdded={handlePdfAdded} />
            }
            {
                sendEmail &&
                <SendEmail userId = {userId} handleSendEmail={handleSendEmail}/>
            }
        </div>
    );
}

export default Report;
