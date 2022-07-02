import React, { createContext, useEffect,useContext ,useState} from 'react'
import { FireContext } from "./../../Config/Firebase/Firebase"
import { UserContext } from "./../../components/AuthProvider/AuthProvider"

export const DirectChatListContext = createContext();

const DirectChatList = props=> {
    const {db} = useContext(FireContext)
	const {currentUser} = useContext(UserContext)
	const [friendslist, setfriendslist] = useState([])
	const [botlist, setBotlist] = useState([])
	const [delfriendslist, setDelfriendslist] = useState([])
	const [delcheck, setDelcheck] = useState("")
	const [isboton, setIsboton] = useState(true)

	const changeboton = () =>{
		console.log(isboton);
		setIsboton(prev=>!prev)
	}

	useEffect(() => {
		db.ref("users/"+currentUser.uid+"/friends").on("child_added",(snapshot)=>{
			db.ref("users/" + snapshot.key).orderByKey().limitToLast(2).once("value").then((babsnapshot)=>{
				let frdata = babsnapshot.val();
				let photosrc = "prof.png";
				if(frdata.userprof.profile_picture !== ""){
				  photosrc = frdata.userprof.profile_picture;
				}
				setfriendslist(oldfriends=>(
					[...oldfriends,
						{
							uname:frdata.userprof.username,
							name:frdata.userprof.displayName,
							photo:photosrc,
							uid:frdata.userprof.uid,
							usersta:frdata.userrole.usersta,
							score:frdata.userrole.score
						}
					]
			    ))
			});
		});
	}, [])

	useEffect(() => {
		db.ref("users/"+currentUser.uid+"/deletedfriends").on("child_added",(snapshot)=>{
			let deluid = snapshot.val().uid;
			let deluname = snapshot.key;
			removefriend(deluid);
			setDelcheck(deluid);
			setDelfriendslist(olddel=>(
				[...olddel,
					{
						username:deluname,
						uid:deluid
					}
				]
			))
		});
	}, [])

	useEffect(() => {
		db.ref("bots/natsappweb").on("child_added",(snapshot)=>{
			setBotlist(oldbot=>(
				[...oldbot,
					{
						botname:snapshot.key,
						botid:snapshot.val().id,
						botdesc:snapshot.val().desc,
						botphoto:snapshot.val().photo,
						botmsg:snapshot.val().msg
					}
				]
			))
		});
	}, [])

	const removefriend = (value) =>{
		setfriendslist(friendslist.filter(friend=>friend.uid!==value))
	}

	const removedelfriend = (value) =>{
		setDelfriendslist(delfriendslist.filter(delfriend=>delfriend.uid!==value))
	}

    return (
        <DirectChatListContext.Provider value={{friendslist,delfriendslist,botlist,delcheck,isboton,changeboton,removedelfriend,removefriend}}>
            {props.children}
        </DirectChatListContext.Provider>
    )
}

export default DirectChatList
