import axios from "axios"
import useAuth from "./useAuth.js"
// import { useNavigate } from "react-router-dom"

const useLogout = () => {
    const { setAuth } = useAuth()
    // const navigate = useNavigate()
    const logout = async () => {
        setAuth({})
        try {
            const response = await axios.post('https://careconnect-8ap0.onrender.com/api/v1/user/logout', {
                withCredentials: true
            })
        } catch (err) {
            console.log(err);
        }
    }
    return logout;
}

export default useLogout