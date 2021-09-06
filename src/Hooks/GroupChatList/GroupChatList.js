import React, { createContext, useEffect,useContext ,useState} from 'react'
import { FireContext } from "./../../Config/Firebase/Firebase"
import { UserContext } from "./../../components/AuthProvider/AuthProvider"

export const GroupChatListContext = createContext();

const GroupChatList = (props) => {
    const {db} = useContext(FireContext)
	const {currentUser} = useContext(UserContext)
    const [Groupslist, setGroupslist] = useState([])

    useEffect(() => {
        db.ref("users/"+currentUser.uid+"/groups").on("child_added",(snapshot)=>{
            setGroupslist(oldgroups=>(
                [...oldgroups,{
                    grid:snapshot.key,
                    grname:snapshot.val().name
                }]
            ))
        });
        // db.ref("users/"+currentUser.uid+"/groups").on("child_removed",function(snapshot){
        //     setGroupslist(Groupslist.filter(group=>(group.grid===snapshot.key)))
        // });
        // db.ref("users/"+cuid+"/deletedgroups").child(props.grid)
    }, [])

    const removegroup = (value) =>{
		setGroupslist(Groupslist.filter(group=>group.grid!==value))
	}

    return (
        <GroupChatListContext.Provider value={{Groupslist,removegroup}}>
            {props.children}
        </GroupChatListContext.Provider>
    )
}

export default GroupChatList
