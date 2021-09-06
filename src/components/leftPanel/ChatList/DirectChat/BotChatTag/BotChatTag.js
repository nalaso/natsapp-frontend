import React, { useContext, useState } from 'react'
import LockIcon from '@material-ui/icons/Lock'
import {ChatOpenContext} from '../../../../../Hooks/IsChatOpen/IsChatopen'
import IsMobile from '../../../../../Hooks/IsMobile/IsMobile';

const BotChatTag = ({props}) => {
    const {changetochatopen,storechatdet,changemobclick} = useContext(ChatOpenContext)
    const [status] = useState(true)
    const {isMobile} = IsMobile();

    const handleclick =()=>{
        changetochatopen(true);
        storechatdet({
            chattype:"bot",
            name:props.botname,
            id:props.botid,
            uid:props.botid,
            msg:props.botmsg,
            status:status
        });
        if(isMobile){
            changemobclick();
        }
    }
   
    return (
        <div className="chatButton" data-dispname={props.botname} data-username={props.botid} id={props.botid} name="useritem" onClick={handleclick} >
            <div id="usertag">
                <div className="chatInfo">
                    <img alt="img" className="image" src={props.botphoto} />
                    <p className="name">
                        {props.botname}
                    </p>
                    <p className="message">
                        {props.botdesc || props.botid}
                    </p>
                </div>
                <div className="status normal">
                    <p className="date"></p>
                    {/* <LockIcon className="read" /> */}
                    <i className="material-icons fixed">loyalty</i>
                </div>
            </div>
        </div>
    )
}

export default BotChatTag
