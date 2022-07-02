import React ,{useContext, useEffect, useState} from 'react'
import Header from './Header/Header'
import DirectChat from "./ChatList/DirectChat/DirectChat"
import GroupChat from "./ChatList/GroupChat/GroupChat"
import {IsGroupContext} from "./../../Hooks/IsGroup/IsGroup";
import { Link } from "react-router-dom";
import SearchChat from '../../Hooks/SearchChat/SearchChat';
import Surprise from './Surprise/Surprise';
import RequestDetails from './ChatList/DirectChat/RequestDetails/RequestDetails';

const LeftPanel = () => {
	const {isGroup} = useContext(IsGroupContext)
	const [surpriseopen, setSurpriseopen] = useState(false)

	useEffect(() => {
		if(localStorage.getItem("issurpriseclosed")=="yes"){
			setSurpriseopen(true)
		}
	}, [])

	const setsurprise =() =>{
		setSurpriseopen(false)
		localStorage.setItem("issurpriseclosed","yes")
	}
	
    return (
		<SearchChat>
        <div className="leftPanel" id="leftpanel">
			<Header surpriseopen={surpriseopen} />
			<div className="chats" id="chats">
				{
					surpriseopen && <Surprise setSurpriseopen={setsurprise} />
				}
				<RequestDetails />
				{isGroup?(<>
					{/* <Redirect to="/Groups"/> */}
					<GroupChat />
				</>):(<>
					{/* <Redirect to="/Friends"/> */}
					<DirectChat />
				</>)}
			</div>
			<div id="dragbar"></div>
			{isGroup?(
				<Link to="/Groups/Add">
				<button className="addchat newgr">
					<h4>Add Group</h4>
				</button>
				</Link>
			):(
				<Link to="/Friends/Add">
				<button className="addchat newfr">
					<h4>Add Friend</h4>
				</button>
				</Link>
			)}
		</div>
		</SearchChat>
    )
}

export default LeftPanel
