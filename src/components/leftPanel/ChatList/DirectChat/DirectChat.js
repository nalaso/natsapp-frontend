import React ,{useContext,useEffect,useState} from 'react'
import { DirectChatListContext } from "./../../../../Hooks/DirectChatList/DirectChatList";
import DirectChatTag from "./DirectChatTag/DirectChatTag";
import DeleteChatTag from "./DeleteChatTag/DeleteChatTag";
import { SearchChatListContext } from '../../../../Hooks/SearchChat/SearchChat';
import { UserContext } from '../../../AuthProvider/AuthProvider';
import AdminChatTag from './AdminChatTag/AdminChatTag';
import BotChatTag from "./BotChatTag/BotChatTag";

const DirectChat = () => {
	const {friendslist,delfriendslist,botlist,isboton} = useContext(DirectChatListContext)
	const {schvalue,otherchange} = useContext(SearchChatListContext)
	const {currentUser,username,photoUrl,adminuid} = useContext(UserContext)
	const [chatval, setChatval] = useState(0)
	const [children, setChildren] = useState([])
	const owndata = {
		name:"My messages",
		uid:currentUser.uid,
		photo:currentUser.photoURL||photoUrl,
        uname:username
	}
	const admindata = {
		name:"Nalasky Admin",
		uid:adminuid,
		uname:"admin"
	}
	const chatbotdata = {
		botname:"Chat Bot",
		botid:"chatbot1stbot",
		botmsg:"Greetings! How can I help you?",
		botdesc:"Chatbot",
		botphoto:"https://cdn.imgbin.com/22/22/21/imgbin-computer-icons-internet-bot-robot-robot-PnjrxjqeFKzs0hkRWBWQxb1Hh.jpg"
	}

	useEffect(() => {
		searchvalue();
	}, [schvalue])

	useEffect(() => {
		setChatval(document.getElementById("chats").childElementCount);
		setChildren(document.getElementById("chats").children);
	}, [friendslist,otherchange])

	const searchvalue = () => {
		for (let i = 0; i < chatval; i++) {
			children[i].style.display = "none";
			let scval = schvalue.toLowerCase()
			let isval = children[i].getAttribute("data-username");
			isval = isval.toLowerCase();
			let nameval = children[i].getAttribute("data-dispname");
			nameval = nameval.toLowerCase();
			if(nameval.startsWith(scval) || isval.startsWith(scval)){
				children[i].style.display = "block";
			}
			nameval = nameval.split(" ");
			nameval.forEach(name => {
				if(name.startsWith(scval)){
					children[i].style.display = "block";
				}
			});
		}
	}

    return (
        <>
			<AdminChatTag props={admindata} />
			<BotChatTag props={chatbotdata} />
			<DirectChatTag key={username} props={owndata}/>
			{
				delfriendslist.map(delfriend=>(
					<DeleteChatTag key={delfriend.uid} props={delfriend} myuid={currentUser.uid}/>
				))
			}
			{
				isboton && (
					botlist.map(bot=>(
						<BotChatTag key={bot.id} props={bot}/>					
					))
				)
			}	
			{
				friendslist.map(friend=>(
					<DirectChatTag key={friend.uname} props={friend}/>					
				))
			}	
		</>
    )
}

export default DirectChat