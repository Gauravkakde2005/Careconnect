import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";

function User() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate();


    const location = useLocation()
    const logout = useLogout()

    useEffect(() => {
        axiosPrivate.get('https://careconnect-8ap0.onrender.com/api/v1/user/getCurrent-user',{
            withCredentials: true
        })
            .then((res) => {

                // console.log(res.data.data)
                setUser(res.data.data)

            })
            .catch((err) => {
                console.log(err);
                navigate('/login', { state: { from: location }, replace: true })
            })
    }, [])

    const handleLogout = async () => {
        await logout()

    }

    return (
        <>
            {user.fullName ? (
                <div className="bg-white border border-blue-500 rounded-xl  p-3  m-3 relative">
                    <div className="flex flex-col justify-center items-center gap-3">
                        <FaUserCircle className="text-blue-500" size={34} />
                        <div className="flex flex-col justify-center items-center gap-1">
                            <h1 className="text-black items-center ">{user.fullName}</h1>
                            <h2 className="text-black text-wrap">{user.email}</h2>
                        </div>
                        <div>
                            <button className="bg-blue-500 rounded-md hover:bg-blue-600 py-2 px-4 text-white" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )
            }
        </>
    );
}

export default User;