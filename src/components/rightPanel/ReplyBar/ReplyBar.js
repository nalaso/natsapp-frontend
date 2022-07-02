import React, { useContext, useEffect, useState } from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import SendIcon from '@material-ui/icons/Send'
import { FireContext } from '../../../Config/Firebase/Firebase'

const ReplyBar = ({props,cuid,cuname,changebotmsg,changefile}) => {
	const {db,fire} = useContext(FireContext)
	const [msg, setmsg] = useState("");
	const [chatid, setchatid] = useState("");

	const handlemsg = (e) => {
		setmsg(e.target.value)
	}

	useEffect(() => {
		if(props.chattype === "group"){
            setchatid("groups/"+props.grid)
        }
        else if(props.chattype === "direct"){
            if(cuid<props.uid){
				setchatid("onetoone/" + cuid+"-"+props.uid);
			}
			else{
				setchatid("onetoone/" + props.uid+"-"+cuid);
			}
        }
		return () => {
			setmsg("");
			setchatid("");
		}
	}, [props])

	const enterlistener = (event) =>{
		if(event.key === "Enter"){
			sendmsg();
		}
	}

	const Encrypt = (value,tstamp) => {
		var result="";
		for(let i=0;i<value.length;i++)
		{
			result+=String.fromCharCode(value.charCodeAt(i)-(tstamp-i)*2);
		}
		return result;
	}

	const sendmsg = () => {
		if(msg !== ""){
			if(props.chattype === "bot"){
				changebotmsg(msg);
			}
			else{
				var loctime = new Date().toLocaleString();
				var loctstamp = new Date().getTime();
				var encrptmsg = Encrypt(msg,loctstamp%10)
				if(props.chattype === "group"){
					db.ref("messages/"+chatid).push().set({
						"message": encrptmsg,
						"senderusname": cuname,
						"timestamp" : loctstamp,
						"sendloctime": loctime
					});
				}
				else{
					db.ref("messages/"+chatid).push().set({
						"message":encrptmsg,
						"senderuid": cuid,
						"timestamp": loctstamp,
						"sendloctime": loctime
					});
				}
			}
			setmsg("");
		}
	}
	
	const uploadnewimg = (e) => {
		changefile(e.target.files);
	}
	
    return (
        <div className="replyBar">
			<input type="file" name="" id="file" className="changePic" accept=".png, .jpg, .jpeg" style={{display: "none"}} onChange={uploadnewimg}/>	
			<button className="attach">
				<label htmlFor="file" id="fileselector" style={{cursor: "pointer"}}>
				<AttachFileIcon />
				</label>
			</button>
			
			<input value={msg} onKeyDown={enterlistener} onChange={handlemsg} type="text" className="replyMessage" id="sendmsg" placeholder="Type your message..."/>
			
			<div className="emojiBar">
				<div className="emoticonType">
				<button id="panelEmoji">Emoji</button>
				<button id="panelStickers">Stickers</button>
				<button id="panelGIFs">GIFs</button>
				</div>
				
				
				{/* <!-- Emoji panel --> */}
				<div className="emojiList">
					{/* <button id="pick1" className="pick" onclick="sendemoji(1)"></button>
					<button id="pick2" className="pick" onclick="sendemoji(2)"></button>
					<button id="pick3" className="pick" onclick="sendemoji(3)"></button>
					<button id="pick4" className="pick" onclick="sendemoji(4)"></button>
					<button id="pick5" className="pick" onclick="sendemoji(5)"></button>
					<button id="pick6" className="pick" onclick="sendemoji(6)"></button>
					<button id="pick7" className="pick" onclick="sendemoji(7)"></button>
					<button id="pick8" className="pick" onclick="sendemoji(8)"></button>
					<button id="pick9" className="pick" onclick="sendemoji(9)"></button> */}
				</div>
				
				{/* <!-- the best part of telegram ever: STICKERS!! --> */}
				<div className="stickerList">
					<button id="smileface" className="pick"></button>
					<button id="grinningface" className="pick"></button>
					<button id="tearjoyface" className="pick"></button>
				</div>
			</div>
			
			<div className="otherTools">
				<button className="toolButtons emoji">
					<EmojiEmotionsIcon />
				</button>
				
				<button className="toolButtons audio"  onClick={sendmsg}>
					{/* <!--<i className="material-icons">mic</i>--> */}
					<SendIcon />
				</button>
			</div>
		</div>
    )
}

export default ReplyBar
