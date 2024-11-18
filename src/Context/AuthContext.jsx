//guardar globalmente un estado que dice si estamos o no authentificados
//decimos authentificado a cualquier usuario que tenga acces_token cargado en el local/session storage
import React from "react";
import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const access_token = sessionStorage.getItem('access_token')
    //Estado Booleano
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(
        Boolean(access_token)
    )
    
    useEffect(
        () => {
            const access_token = sessionStorage.getItem('access_token')
            if(access_token) {
                setIsAuthenticatedUser(true)
            }
        },
        []
    )
    const logout = () =>{
        sessionStorage.removeItem('access_token')
        setIsAuthenticatedUser(false)
    }
    return(
        <AuthContext.Provider value={{
            logout,
            isAuthenticatedUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext) //devuelve un objeto con {logout, isauthenticated}
}

