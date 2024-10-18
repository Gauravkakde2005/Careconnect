// import axios from "axios"
import useAuth from "./useAuth.js"
import axios from "../api/axios.js"
function useRefreshToken() {

    const { setAuth } = useAuth()

    const refresh = async () => {
        const response = await axios.post("https://careconnect-8ap0.onrender.com/api/v1/user/refresh-token", {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        })
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.data.accessToken);
            return { ...prev, accessToken: response.data.data.accessToken }
        })
        return response.data.data.accessToken
    }
    return refresh;


}

export default useRefreshToken