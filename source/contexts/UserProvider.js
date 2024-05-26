import React, { createContext, useState } from 'react'

 export const userContext = createContext()

    export const UserProvider = ({ children }) => {
        const [user_uid, setUser_uid] = useState("");
        const User ={
            user_uid: user_uid,
            setUser_uid: setUser_uid
        }
        return (
            <userContext.Provider value={User}>
                {children}
            </userContext.Provider>
        )
    }