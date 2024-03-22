import { ReactNode, createContext, useContext, useState } from "react";



type ModalContextType = {
    open:boolean,
    control:(val:boolean)=>void
    passwordOpen:boolean,
    passwordControl:(val:boolean)=>void
    logout:boolean,
    setLogout:(val:boolean)=>void
}

const ModalContext = createContext<ModalContextType>({open:false,control:()=>{},passwordOpen:false,passwordControl:()=>{},logout:false,setLogout:()=>{}})



export const ModalProvider = ({children}:{children:ReactNode})=>{
const [open, control] = useState(false)
const [passwordOpen, passwordControl] = useState(false)
const [logout, setLogout] = useState(false)

    return <ModalContext.Provider value={{open,control,passwordOpen,passwordControl,logout,setLogout}}>
        {children}
    </ModalContext.Provider>






}


export const useModal = ()=>useContext(ModalContext)