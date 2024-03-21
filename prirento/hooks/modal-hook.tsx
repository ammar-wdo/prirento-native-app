import { ReactNode, createContext, useContext, useState } from "react";



type ModalContextType = {
    open:boolean,
    control:(val:boolean)=>void
}

const ModalContext = createContext<ModalContextType>({open:false,control:()=>{}})



export const ModalProvider = ({children}:{children:ReactNode})=>{
const [open, control] = useState(false)

    return <ModalContext.Provider value={{open,control}}>
        {children}
    </ModalContext.Provider>






}


export const useModal = ()=>useContext(ModalContext)