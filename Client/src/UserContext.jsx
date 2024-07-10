import axios from "axios";
import { createContext, useEffect, useState } from "react";

// user context to give the user details under the child used to check the user is the state of logged in or not

export const UserContext=createContext({})

export function UserContextProvider({children})
{
    const [user,setUser]=useState(null)
    const [ready,setReady]=useState(false)
    useEffect(()=>{
        if(!user){
            const{data}=axios.get('/profile').then(({data})=>{
                setUser(data)
                setReady(true)

            })
        }
    },[])
    return(
        <UserContext.Provider value={{ready,user,setUser}}>
            {children}
        </UserContext.Provider>
    );
}