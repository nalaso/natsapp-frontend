import React, { createContext, useState, useContext,useEffect } from 'react'
import { PendingStatusContext } from '../Pendings/PendingsStatus';

export const ChatNotificationContext = createContext();

const ChatNotification = props=> {
    const {requestssendstatus} = useContext(PendingStatusContext)
    const [herenot, setHerenot] = useState([])
    const [currentlength, setCurrentlength] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setCurrentlength(1);
        }, 5000);
    }, [])
    
    useEffect(() => {
        if(requestssendstatus.length>0){
            if(currentlength){  
                setHerenot([
                    {
                        username: requestssendstatus[requestssendstatus.length-1].frname,
                        message: requestssendstatus[requestssendstatus.length-1].frstatus+ " you"
                    }
                ])
            }
        }
        const timer = setTimeout(() => {
            setHerenot([]);
        }, 5000);
        return () => {
            clearTimeout(timer)
        }
    }, [requestssendstatus])

    return (
        <ChatNotificationContext.Provider value={{herenot}}>
            {props.children}
        </ChatNotificationContext.Provider>
    )
}

export default ChatNotification