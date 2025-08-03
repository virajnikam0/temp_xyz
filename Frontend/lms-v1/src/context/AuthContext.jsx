import React, { createContext, useContext, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'

const AuthContext = createContext();
export default function AuthProvider({children}) {

    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [userRole,setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const [myClassroom, setMyClassroom] = useState([]);
    const [fetchSidebar, setFetchSidebar] = useState(false);

    useEffect(()=>{

        const token = sessionStorage.getItem('token');
        if(token)
        {
            
            const payload = jwtDecode(token);
            setIsAuthenticated(true);
            setUserRole(payload.role);
        
        }

        setLoading(false);

    },[]);

    const login= (role)=>
    {
        setIsAuthenticated(true);
        setUserRole(role);
        console.log("Role set successfully")
    }

    const logout = async ()=>{
        setIsAuthenticated(false);
        setUserRole(null);
    }

    if (loading) return <div>Loading...</div>; // Or spinner

  return (
    <AuthContext.Provider value={{isAuthenticated,userRole,login,logout,myClassroom,setMyClassroom,fetchSidebar,setFetchSidebar}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);