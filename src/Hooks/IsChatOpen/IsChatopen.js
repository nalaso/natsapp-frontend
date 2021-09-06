import React, { createContext,useState ,useEffect, useContext} from 'react'
import { DirectChatListContext } from '../DirectChatList/DirectChatList';

export const ChatOpenContext = createContext();

const IsChatopen = props => {
    const [isOpen, setIsOpen] = useState(false)
    const {delcheck} = useContext(DirectChatListContext)
    const [isFrdetopen, setIsFrdetopen] = useState(false)
    const [chatdet, setChatdet] = useState({})
    const [mobchatclick, setMobchatclick] = useState(false)

    useEffect(() => {
        if(isFrdetopen){
            document.addEventListener("click",()=>{
                setIsFrdetopen(false)
            }, {once : true})
        }
    }, [isFrdetopen])

    useEffect(() => {
        if(delcheck){
            if(chatdet.uid===delcheck){
                changetochatopen(false);
                changemobclick();
            }
        }
    }, [delcheck])

    const changetochatopen = (val) => {
        setIsOpen(val)
    }

    const changemobclick = () => {
        setMobchatclick(pre=>!pre)
    }

    const storechatdet = (det) => {
        setChatdet(det);
    }

    const friendprof = () => {
        setIsFrdetopen(true);
    }

    return (
        <ChatOpenContext.Provider value={{isOpen,chatdet,mobchatclick,isFrdetopen,friendprof,changetochatopen,storechatdet,changemobclick}}>
            {props.children}
        </ChatOpenContext.Provider>
    )
}

export default IsChatopen
