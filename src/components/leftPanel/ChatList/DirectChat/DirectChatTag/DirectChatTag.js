import React, { useContext, useEffect, useState } from 'react'
import LockIcon from '@material-ui/icons/Lock'
import {ChatOpenContext} from '../../../../../Hooks/IsChatOpen/IsChatopen'
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { FireContext } from '../../../../../Config/Firebase/Firebase';
import IsMobile from '../../../../../Hooks/IsMobile/IsMobile';

const DirectChatTag = ({props}) => {
    const {chatdet,changetochatopen,storechatdet,changemobclick} = useContext(ChatOpenContext)
    const {db} = useContext(FireContext)
    const [status, setStatus] = useState(false)
    const {isMobile} = IsMobile();

    const handleclick =()=>{
        changetochatopen(true);
        storechatdet({
            chattype:"direct",
            name:props.name,
            id:props.uname,
            uid:props.uid,
            status:status
        });
        if(isMobile){
            changemobclick();
        }
    }

    useEffect(() => {
        db.ref("users/" + props.uid + "/status").on("value",(chisnapshot)=>{
            setStatus(chisnapshot.child("isonline").val())
        });
        return () => {
            db.ref("users/" + props.uid + "/status").off();
        }
    }, [])

    useEffect(() => {
        if(chatdet.uid===props.uid){
            storechatdet({
                name:props.name,
                id:props.uname,
                uid:props.uid,
                status:status
            });
        }
        
    }, [status])
    
    return (
        <div className="chatButton" data-dispname={props.name} data-username={props.uname} id={props.uname} name="useritem" onClick={handleclick} >
            <div id="usertag">
                <div className="chatInfo">
                    <img alt="img" className="image" src={props.photo} />
                    <p className="name">
                        {props.name}
                    </p>
                    <p className="message">
                        {props.uname}
                    </p>
                </div>
                <div className="status normal">
                    <p className="date"></p>
                    {
                        props.name==="My messages"?(
                            <LockIcon className="read" />
                        ):(
                            <Brightness1Icon  className={status?("counton"):("countoff")} />
                        )
                    }
                    <i className="material-icons fixed">loyalty</i>
                </div>
            </div>
        </div>
    )
}

export default DirectChatTag
