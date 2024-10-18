import profileImg from "../../assets/profile.svg"
import { FaEdit, FaEye, FaFilePdf } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import AddProfileCom from "./AddProfile";
import useAuth from "../../hooks/useAuth.js"
// import axios from "axios"
import axios from "../../api/axios.js"
import EditProfile from "./EditProfile";
import { jwtDecode } from "jwt-decode"
import { axiosPrivate } from "../../api/axios.js";

function Profile() {

    const { editProfile, setEditProfile, profile, profileData, addProfile, setAddProfile, auth } = useAuth()
    const [data, setData] = useState({})

    // const decoded = auth?.accessToken
    //     ? jwtDecode(auth.accessToken)
    //     : undefined

    //     const email = decoded?.email || []
    //     // console.log(email)

    useEffect(() => {
  
        axiosPrivate.get("https://careconnect-8ap0.onrender.com/api/v1/profile/getProfile",{
            headers: { "Content-Type": "application/json" },
    withCredentials: true
        })
            .then((res) => {
                console.log(res.data);
                setData(res.data.data)
                // console.log(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [profile, profileData, addProfile, setAddProfile, editProfile, setEditProfile])

    const pdfDetails = {
        firstName: data?.firstName,
        middleName: data?.middleName,
        lastName: data?.lastName,
        email: data?.email,
        mobileNum: data?.mobileNum,
        age: data?.age,
        bloodGroup: data?.bloodGroup,
        dob: data?.dob,
        gender: data?.gender,
        weight: data?.weight,
        height: data?.height,
        diseases: data?.diseases,
        emeName: data?.emeName,
        emeMob: data?.emeMob,
        address: data?.address

    }
    return (
        <div className=' rounded-lg bg-[#f5f5f5] p-5 h-screen'>
            <div className='flex  gap-5 bg-white p-5 justify-center items-center rounded-lg '>
                {data ?
                    (<div className='flex flex-col gap-5 border rounded-lg w-full h-full p-5'>
                        <div className='flex justify-end'>
                            <FaEdit size={30} className="text-blue-500 cursor-pointer hover:text-blue-700" onClick={() => setEditProfile(prev => !prev)} />
                        </div>
                        <div>
                            <img src={profileImg} alt="" className='w-1/4 mx-auto' />
                        </div>
                        <div className='border rounded-lg p-3 flex flex-col gap-4'>
                            <h1 className='text-3xl font-bold'>{data.firstName} {data.middleName} {data.lastName}</h1>
                            <div className='flex gap-5'>
                                <p>Phone</p>
                                <p className='font-semibold'>{data.mobileNum}</p>
                            </div>
                            <div className='flex gap-5'>
                                <p>Email</p>
                                <p className='font-semibold'>{data.email}</p>
                            </div>
                            <div className='flex gap-5'>
                                <p>Sex</p>
                                <p className='font-semibold'>{data.gender}</p>
                            </div>
                        </div>
                        <div className='border p-3 rounded-lg flex flex-col gap-3'>
                            <h1 className='text-2xl text-gray-400 font-bold'>PERSONAL DETAILS</h1>
                            <div className='flex justify-between'>
                                <div>
                                    <p>FullName</p>
                                    <p className='font-bold'>{data.firstName} {data.middleName} {data.lastName}</p>
                                </div>
                                <div>
                                    <p>BirthDate</p>
                                    <p className='font-bold'>{data.dob}</p>
                                </div>
                                <div>
                                    <p>Weight</p>
                                    <p className='font-bold'>{data.weight}</p>
                                </div>
                                <div>
                                    <p>Height</p>
                                    <p className='font-bold'>{data.height}</p>
                                </div>

                            </div>
                            <div>
                                <div>
                                    <p>Address</p>
                                    <p className='font-bold'>{data.address}</p>
                                </div>
                            </div>
                            <h1 className='text-2xl text-gray-400 font-bold'>MEDICAL DETAILS</h1>
                            <div className='flex gap-14'>
                                <div>
                                    <p>Blood Group</p>
                                    <p className='font-bold'>{data.bloodGroup}</p>
                                </div>
                                <div>
                                    <p>Medical History</p>
                                    <p className='font-bold'>{data.diseases}</p>
                                </div>
                            </div>
                        </div>
                        <div className='border p-3 rounded-lg flex flex-col gap-3'>
                            <h1 className='text-2xl text-gray-400 font-bold'>EMERGENCY CONTACT</h1>
                            <div className='flex gap-14'>
                                <div>
                                    <p>Name</p>
                                    <p className='font-bold'>{data.emeName}</p>
                                </div>
                                <div>
                                    <p>Phone</p>
                                    <p className='font-bold'>{data.emeMob}</p>
                                </div>


                            </div>

                        </div>
                    </div>)
                    :
                    (<div className=" flex justify-center items-center">
                        <button className="border border-blue-500 rounded-lg bg-blue-500 text-white px-4 py-2" onClick={() => setAddProfile(prev => !prev)} >Add Profile</button>
                    </div>)
                }


            </div>
            {addProfile &&
                <AddProfileCom />
            }
            {editProfile &&
                <EditProfile pdfDetails={pdfDetails} pdfId={data._id} />
            }

        </div >
    )
}

export default Profile
