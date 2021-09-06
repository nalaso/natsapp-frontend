import React, { useState ,createContext ,useEffect ,useContext } from 'react'
import { UserContext } from '../../components/AuthProvider/AuthProvider';

export const SearchChatListContext = createContext();

const SearchChat = (props) => {
    const [schvalue, setschvalue] = useState("")
    const [otherchange, setOtherchange] = useState(0)
    const {setpremium} = useContext(UserContext)

    const setsearchvalue = (val) => {
        setschvalue(val)
    }

    const setchangevalue = () => {
        setOtherchange(otherchange=>otherchange+1)
    }

    useEffect(() => {
        if(schvalue==="https://natsapp.web.app/wtrmark.png" || schvalue==="https://natsapp.now.sh/wtrmark.png" || schvalue==="https://natsapp.nalasky.now.sh/wtrmark.png"){
            setpremium(true);
            setschvalue("")
        }
        else if(schvalue==="#https://natsapp.web.app/wtrmark.png" || schvalue==="#https://natsapp.now.sh/wtrmark.png" || schvalue==="#https://natsapp.nalasky.now.sh/wtrmark.png"){
            setpremium(false);
            setschvalue("")
        }
    }, [schvalue])

    return (
        <SearchChatListContext.Provider value={{schvalue,otherchange,setchangevalue,setsearchvalue}}>
            {props.children}
        </SearchChatListContext.Provider>
    )
}

export default SearchChat