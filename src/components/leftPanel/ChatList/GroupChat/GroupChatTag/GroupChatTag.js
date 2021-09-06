import React, { useContext, useEffect, useState } from 'react'
import {ChatOpenContext} from '../../../../../Hooks/IsChatOpen/IsChatopen'
import { FireContext } from '../../../../../Config/Firebase/Firebase';
import IsMobile from '../../../../../Hooks/IsMobile/IsMobile';
import Brightness1Icon from '@material-ui/icons/Brightness1';

const GroupChatTag = ({props}) => {
    let {isMobile} = IsMobile();
    const {changetochatopen,storechatdet,changemobclick} = useContext(ChatOpenContext)
    const {db} = useContext(FireContext)
    const [mem, setMem] = useState(0)

    const handleclick =()=>{
        changetochatopen(true);
        storechatdet({
            chattype:"group",
            grname:props.grname,
            grid:props.grid,
            mem:mem
        });
        if(isMobile){
            changemobclick();
        }
    }

    useEffect(() => {
        db.ref("groups/" + props.grid + "/grprof").once("value").then((snapshot)=>{
            setMem(snapshot.child("mem").val());
        });
    }, [])
    
    return (
        <div className="chatButton" data-grname={props.grname} data-grid={props.grid} name="useritem" onClick={handleclick} >
            <div id="usertag">
                <div className="chatInfo">
                    <img alt="img" className="image" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/user-group-559908.png"/>
                    <p className="name">
                        {props.grname}
                    </p>
                    <p className="message">
                        {props.grid}
                    </p>
                </div>
                <div className="status onTop">
                    <p className="date"></p>
                    {
                        props.grid=="natsapp" && (<>
                            <Brightness1Icon style={{marginTop:"30px",color:"#303030"}} />
                            <svg className="fixed" viewBox="0 0 24 24">
                                <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                            </svg>
                        </>)
                    }
                </div>
            </div>
        </div>
    )
}

export default GroupChatTag
