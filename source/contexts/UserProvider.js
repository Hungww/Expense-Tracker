import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

 export const userContext = createContext()

    export const UserProvider = ({ children }) => {
        const [user_info, setUser_info] = useState(null);
        const [user_uid, setUser_uid] = useState("");
        const [user_transactions, setUser_transactions] = useState(null);

        const logout = () => {
          setUser_uid("");
          setUser_info(null);
        };

        const get_transactions = async () => {
          try {
              const response = await axios.get(`https://expense-tracker-server-xi.vercel.app/api/v1/transactions/get_transactions/${user_uid}`);
              response.data.sort(function (a, b) {
                  return a.date < b.date
                      ? 1
                      : a.date > b.date
                      ? -1
                      : 0;
              });
              setUser_transactions(response.data);
          } catch (error) {
              console.error('Error:', error);
          }
      };

        async function getUserInfo(retries = 10, interval = 500) {
            try {
              const response = await axios.get(`http://expense-tracker-server-xi.vercel.app/api/v1/user/get_user/${user_uid}`);
              setUser_info(response.data);
            } catch (error) {
              if (retries > 0) {
                setTimeout(() => getUserInfo(retries - 1, interval), interval);
              } else {
                console.error('Error:', error);
              }
            }
          }
        useEffect(() => {
            console.log("UserProvider is running")
            console.log(user_uid)
            
            if (user_uid) {
                getUserInfo();
              }
        }, [user_uid])
        
        const User ={
            user_uid: user_uid,
            setUser_uid: setUser_uid,
            user_info: user_info,
            getUserInfo: getUserInfo,
            logout: logout,
            user_transactions: user_transactions,
            get_transactions: get_transactions
        }
        return (
            <userContext.Provider value={User}>
                {children}
            </userContext.Provider>
        )
    }
