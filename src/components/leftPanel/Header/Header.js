import React , {useContext, useEffect} from 'react'
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import {IsGroupContext} from "./../../../Hooks/IsGroup/IsGroup";
import { SearchChatListContext } from '../../../Hooks/SearchChat/SearchChat';
import { Link } from 'react-router-dom';

const Header = ({surpriseopen}) => {
    const {isGroup,changeisgroup} = useContext(IsGroupContext)
    const {schvalue,setsearchvalue,setchangevalue} = useContext(SearchChatListContext)
    
    const handlsch = (e) => {
		setsearchvalue(e.target.value)
    }
    
    useEffect(() => {
        if (!surpriseopen) {
            setchangevalue()
        }
    }, [surpriseopen])

    return (
        <header>
            <Link to="/SideMenu">
                <button className="trigger">
                    <svg viewBox="0 0 24 24">
                        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                    </svg>
                </button>
            </Link>

            <input value={schvalue} onChange={handlsch} className="searchChats" type="search" placeholder="Search..."/>

            {isGroup?(
                <PersonIcon onClick={changeisgroup} className="og" />
            ):(
                <GroupIcon onClick={changeisgroup} className="og" />
            )}
            
        </header>
    )
}

export default Header
