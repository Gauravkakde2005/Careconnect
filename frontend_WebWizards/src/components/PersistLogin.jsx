import { Outlet } from 'react-router-dom'
import { useState, useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken.js"
import useAuth from '../hooks/useAuth.js'
import "../App.css"


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    }, [])

    useEffect(() => {
        console.log(`is loading : ${isLoading}`);
        console.log(`At : ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading])

    return (
        <>
            {
                isLoading
                    ? <div className='flex justify-center  items-center h-screen w-screen'>
                        <span className="loader "></span>
                    </div>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin