import React,{useState} from 'react'
import { FaEdit, FaEye, FaFilePdf } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import ViewReport from '../Report/ViewReport';
import EditReportDocter from './EditReportDocter';

function DocterCard({ r, onEditPdf, onUpdateReport}) {

    const [viewPdf, setViewPdf] = useState(false)
    const [isEditing, setIsEditing] = useState(false);

    const handleViewNote = () => {
        setViewPdf(false)
    }
    const handleEditNote = () => {
        setIsEditing(true);
        onEditPdf();
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    return (
        <div className='flex rounded-md border p-2 pl-4 pr-4 w-[80%] justify-between'>
            <div><FaFilePdf size={30} className="text-red-600" /></div>
            <div><h1 className='text-xl font-semibold'>{r.title}</h1></div>
            <div className='flex gap-3 justify-center items-center' >
                <FaEdit size={26} className="text-green-600 cursor-pointer" onClick={handleEditNote}/>
                <FaEye size={26} className="text-blue-600 cursor-pointer" onClick={() => setViewPdf(prev => !prev)}/>
            </div>
            {isEditing && (
                <EditReportDocter reportDetails={r} onCancelEdit={handleCancelEdit} onUpdateReport={onUpdateReport}/>
            )}
            {
                viewPdf &&
                <ViewReport reportId={r?._id} onHandleViewNote={handleViewNote} />
            }

        </div>
    )
}

export default DocterCard
