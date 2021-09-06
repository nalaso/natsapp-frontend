import React, { useState } from 'react'
import MessagePanel from './MessagePanel/MessagePanel'
import BotMessagePanel from './BotMessagePanel/BotMessagePanel'
import ReplyBar from './ReplyBar/ReplyBar'
import TopBar from './TopBar/TopBar'

const RightPanel = ({props,cuid,cuname}) => {
	const [botmsg, setBotmsg] = useState("")
	const [issame, setIssame] = useState(0)
	const changebotmsg = (val) =>{
		if(botmsg===val){
			setIssame(pre=>pre+1)
		}
		setBotmsg(val);
	}

    return (
        <div className="rightPanel" id="rightpanel">
			 <TopBar props={props} cuid={cuid}/>
			 {
				props.chattype==="bot" ?(
					<BotMessagePanel props={props} changebotmsg={changebotmsg} issame={issame} botmsg={botmsg}/>
				):(
					<MessagePanel props={props} cuid={cuid} cuname={cuname}/>
				)
			 }
			 <ReplyBar props={props} cuid={cuid} cuname={cuname} changebotmsg={changebotmsg}/>
		</div>
    )
}

export default RightPanel