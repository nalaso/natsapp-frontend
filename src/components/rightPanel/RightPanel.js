import React, { useState } from 'react'
import MessagePanel from './MessagePanel/MessagePanel'
import BotMessagePanel from './BotMessagePanel/BotMessagePanel'
import ReplyBar from './ReplyBar/ReplyBar'
import TopBar from './TopBar/TopBar'

const RightPanel = ({props,cuid,cuname}) => {
	const [botmsg, setBotmsg] = useState("")
	const [issame, setIssame] = useState(0)
	// const [files, setFiles] = useState([])
	const [convert, setConvert] = useState(false)
	const [reader, setReader] = useState({})

	const changebotmsg = (val) =>{
		if(botmsg===val){
			setIssame(pre=>pre+1)
		}
		setBotmsg(val);
	}

	const defaulvalue = () => {
		setConvert(false)
		setReader({})
	}

	const changefile = (val) => {
		let r = new FileReader();
		setReader(r)
		r.onload = () =>{
			setConvert(true)
		}
		r.readAsDataURL(val[0])
	}

    return (
        <div className="rightPanel" id="rightpanel">
			 <TopBar props={props} cuid={cuid}/>
			 {
				props.chattype==="bot" ?(
					<BotMessagePanel props={props} changebotmsg={changebotmsg} issame={issame} botmsg={botmsg} defaulvalue={defaulvalue} reader={reader} convert={convert}/>
				):(
					<MessagePanel props={props} cuid={cuid} cuname={cuname}/>
				)
			 }
			 <ReplyBar props={props} cuid={cuid} cuname={cuname} changebotmsg={changebotmsg} changefile={changefile}/>
		</div>
    )
}

export default RightPanel