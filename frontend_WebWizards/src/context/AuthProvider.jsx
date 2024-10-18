import { createContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [sidebar, setSidebar] = useState(true)
    const [auth, setAuth] = useState({})
    const [profile, setProfile] = useState(false)
    const [addProfile, setAddProfile] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const [sendEmail, setSendEmail] = useState(false)

    const [addReport, setAddReport] = useState(false)
    const [editReport, setEditReport] = useState(false)
    const [profileData, setProfileData] = useState({})


    return (
        <AuthContext.Provider value={{  editReport, setEditReport, addReport, setAddReport, editProfile, setEditProfile, addProfile, setAddProfile, sidebar, setSidebar, auth, setAuth, profile, setProfile, profileData, setProfileData,setSendEmail , sendEmail }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext