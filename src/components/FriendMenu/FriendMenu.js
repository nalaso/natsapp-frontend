import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { FireContext } from '../../Config/Firebase/Firebase';
import { DirectChatListContext } from '../../Hooks/DirectChatList/DirectChatList';
import { GroupChatListContext } from '../../Hooks/GroupChatList/GroupChatList';
import { ChatOpenContext } from '../../Hooks/IsChatOpen/IsChatopen';

const FriendMenu = ({props,cuid,username}) => {
    let history = useHistory();
    const {db} = useContext(FireContext)
    const {changetochatopen,changemobclick} = useContext(ChatOpenContext)
    const {removefriend} = useContext(DirectChatListContext)
    const {removegroup} = useContext(GroupChatListContext)

    const blockuser = () => {
        db
        .ref("users/"+cuid+"/friends")
        .child(props.uid)
        .remove();
        db
        .ref("users/"+props.uid+"/friends")
        .child(cuid)
        .remove();
        db
        .ref("users/"+props.uid+"/deletedfriends")
        .child(username)
        .set({
            uid:cuid
        })
        .then(()=>{
            changetochatopen(false);
            changemobclick();
            removefriend(props.uid);
        });
    }

    const leavegroup = () => {
        db
        .ref("groups/"+props.grid+"/grprof/users"+props.userstatus)
        .child(username)
        .remove();
        db
        .ref("users/"+cuid+"/groups")
        .child(props.grid)
        .remove();
        db
        .ref("groups/"+props.grid+"/grprof")
        .child("mem")
        .transaction((mem)=>{
            return (mem || 0) - 1
        }).then(()=>{
            changetochatopen(false);
            changemobclick();
            removegroup(props.grid);
        });
    }

    const seefrdetail = () => {
        history
        .push("/Friend/Profile")
    }

    const seegrdetail = () => {
        history
        .push("/Group/"+props.grid+"/details")
    }

    return (
        <div 
        className="moreMenu" 
        id="submenu">
            {
                props.chattype==="group" ?(
                    <button 
                    className="option frabout" 
                    onClick={seegrdetail}>
                        See Info
                    </button>
                ):(
                    <button 
                    className="option frabout" 
                    onClick={seefrdetail}>
                        See Info
                    </button>
                )
            }    
            {
                props.chattype==="group" ?(
                    props.grid!=="natsapp" ?(
                        <button 
                        className="option notify" 
                        onClick={leavegroup}>
                            Leave Group
                        </button>
                    ):(
                        <></>
                    )
                ):(
                    <button 
                    className="option notify" 
                    onClick={blockuser}>
                        Block User
                    </button>
                )
            }            
        </div>
    )
}

export default FriendMenu