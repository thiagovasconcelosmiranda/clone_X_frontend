"use client"
import { createContext, ReactNode, useState } from "react";

type Props = {
    children: ReactNode;
}

type UserContextType = {
  userInfo: any,
  setUserInfo: (info: any) => void
}

const initialValue = {
   userInfo: '',
   setUserInfo: () => {}
}

export const AuthContext = createContext<UserContextType>(initialValue);

export const UserContextProvider = ({ children }: Props) => {
    const [userInfo, setUserInfo] = useState(initialValue.userInfo);

    return (
        <AuthContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </AuthContext.Provider>
    )
}