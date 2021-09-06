import React, { useContext, useEffect, useState } from 'react'
import LockIcon from '@material-ui/icons/Lock'
import {ChatOpenContext} from '../../../../../Hooks/IsChatOpen/IsChatopen'
import Brightness1Icon from '@material-ui/icons/Brightness1';
import IsMobile from '../../../../../Hooks/IsMobile/IsMobile';

const AdminChatTag = ({props}) => {
    const {changetochatopen,storechatdet,changemobclick} = useContext(ChatOpenContext)
    const {isMobile} = IsMobile();

    const handleclick =()=>{
        changetochatopen(true);
        storechatdet({
            chattype:"direct",
            name:props.name,
            id:props.uname,
            uid:props.uid,
            status:"busy"
        });
        if(isMobile){
            changemobclick();
        }
    }
    
    return (
        <div className="chatButton" data-dispname="Nalasky Admin" data-username={props.uname} id={props.uname} name="useritem admintag" onClick={handleclick} >
            <div className="chatInfo">
                <img alt="img" className="image" src="data:image/jpeg;base64,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" />
                <p className="name">
                    {props.name}
                </p>
                <p className="message">
                    Server Support ...
                </p>
            </div>
            <div className="status onTop">
                <p className="date">00:00</p>
                <Brightness1Icon style={{marginTop:"30px"}} />
                <LockIcon className="read" />
                <svg className="fixed" viewBox="0 0 24 24">
                        <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                </svg>
            </div>
        </div>
    )
}

export default AdminChatTag
