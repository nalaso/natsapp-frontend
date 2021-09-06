import React,{useContext,useEffect,useState} from 'react'
import { GroupChatListContext } from '../../../../Hooks/GroupChatList/GroupChatList'
import { UserContext } from '../../../AuthProvider/AuthProvider'
import GroupChatTag from './GroupChatTag/GroupChatTag'
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { SearchChatListContext } from '../../../../Hooks/SearchChat/SearchChat';

const GroupChat = () => {
	const {Groupslist} = useContext(GroupChatListContext)
	const {ispremium} = useContext(UserContext)
	const {schvalue,otherchange} = useContext(SearchChatListContext)
	const [chatval, setChatval] = useState(0)
	const [children, setChildren] = useState([])

	const premiumGroup = {
		grid: "natsapp",
		grname: "Nalasky Premium Group"
	}

	useEffect(() => {
		searchvalue();
	}, [schvalue])

	useEffect(() => {
		setChatval(document.getElementById("chats").childElementCount);
		setChildren(document.getElementById("chats").children);
	}, [Groupslist,otherchange])

	const searchvalue = () => {
		for (let i = 0; i < chatval; i++) {
			children[i].style.display = "none";
			let scval = schvalue.toLowerCase()
			let nameval = children[i].getAttribute("data-grname");
			let idval = children[i].getAttribute("data-grid");
			idval = idval.toLowerCase();
			nameval = nameval.toLowerCase();
			if(nameval.startsWith(scval) || idval.startsWith(scval) ){
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
			{
				ispremium?(
					<GroupChatTag key={premiumGroup.grid} props={premiumGroup} />
				):(
					<div className="chatButton active" data-grid="Nalasky dev" data-grname="Nalasky dev" name="useritem admintag">
						<div className="chatInfo">
							<div className="image my-image">
							</div>
							<p className="name">
								Nalasky Premium Group
							</p>
							<p className="message">
								Requires Premium
							</p>
						</div>
						<div className="status onTop">
							<p className="date">00:00</p>
							<Brightness1Icon style={{marginTop:"30px",color:"#303030"}} />
                            <svg className="fixed" viewBox="0 0 24 24">
                                <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                            </svg>
						</div>
					</div>
				)
			}
			{
				Groupslist.map(group=>(
					<GroupChatTag key={group.grid} props={group} />
				))
			}
		</>
    )
}

export default GroupChat
