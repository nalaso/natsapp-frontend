import React, { useEffect,useContext, useState,useRef } from 'react'
import { FireContext } from '../../../Config/Firebase/Firebase'
import GroupRequest from '../../leftPanel/ChatList/GroupChat/GroupRequest/GroupRequest'

const MessagePanel = ({props,cuid,cuname}) => {
    const messagesEndRef = useRef(null)
    const {db} = useContext(FireContext)
    const [msgs, setmsg] = useState([])
    const [chatid, setchatid] = useState("");
    const [cuprops, setcuprops] = useState({uid:"12212",grid:"test"});
   
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ block: 'end',behavior: "smooth" })
    }

    const handleScroll = (e) => {
        // const istop = e.target.scrollTop === 0;
        // if (istop) {
        //     getmsg();
        // }
    }

    const Decrypt = (value,tstamp) => {
        var result="";
        for(let i=0;i<value.length;i++)
        {
            result+=String.fromCharCode(value.charCodeAt(i)+(tstamp-i)*2);
        }
        return result;
    } 

    const getmsg = ()=>{
        if(props.chattype === "group"){
            db.ref("messages/"+chatid).on('child_added', (snapshot) => {
                setmsg(oldmsg=>(
                    [...oldmsg,{
                        suid:"",
                        suname:snapshot.val().senderusname,
                        msg:Decrypt(snapshot.val().message,snapshot.val().timestamp%10),
                        time:snapshot.val().sendloctime,
                        stime:snapshot.val().timestamp
                    }]
                ))
                if (snapshot.val().senderusname !== cuname) {
                }
            });
        }
        else{
            db.ref("messages/"+chatid).on('child_added', (snapshot) => {
                setmsg(oldmsg=>(
                    [...oldmsg,{
                        suname:"",
                        suid:snapshot.val().senderuid,
                        msg:Decrypt(snapshot.val().message,snapshot.val().timestamp%10),
                        time:snapshot.val().sendloctime,
                        stime:snapshot.val().timestamp
                    }]
                ))
            });
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [msgs])

    useEffect(() => {
        if(props.chattype === "group"){
            if(props.grid!==cuprops.grid ){
                setcuprops(props)
            }
        }
        else{
            if(props.uid!==cuprops.uid ){
                setcuprops(props)
            }
        }
    }, [props])

    useEffect(() => {
        if(props.chattype === "group"){
            setchatid("groups/"+props.grid)
        }
        else{
            if(cuid<cuprops.uid){
                setchatid("onetoone/"+cuid+"-"+cuprops.uid);
            }
            else{
                setchatid("onetoone/"+cuprops.uid+"-"+cuid);
            }
        }
		return () => {
            setmsg([]);
            setchatid("");
		}
    }, [cuprops])

    useEffect(() => {
        if(chatid){
            getmsg();
        }
        return () => {
            db.ref("messages/"+chatid).off();
        }
    }, [chatid])
    
    return (
        <div className="convHistory userBg" id="msgbox"  onScroll={handleScroll}>
           
            {msgs.map(msg=>(
                    props.chattype === "group" ?(
                        <div key={msg.suname+msg.stime} className={(msg.suname===cuname)?(
                            "msg messageSent"
                        ):(
                            "msg messageReceived"
                        )}>
                            {
                                msg.suname!==cuname && (
                                    <h4 className="idstamp">{msg.suname}</h4>
                                )
                            }
                            <h3>{msg.msg}</h3>
                            <h5 className="timestamp">{msg.time}</h5>
                        </div>
                    ):(
                        <div key={msg.suid+msg.stime} className={(msg.suid===cuid)?(
                            "msg messageSent"
                        ):(
                            "msg messageReceived"
                        )}>
                            <h3>{msg.msg}</h3>
                            <h5 className="timestamp">{msg.time}</h5>
                        </div>
                    )
            ))}
            {
                props.chattype === "group" && (
                    <GroupRequest grid={props.grid} cuid={cuid}/>
                )
            }
             <div className="msg" style={{opacity:0,padding:"0px",margin:"0px"}} ref={messagesEndRef} />
		</div>
    )
}

export default MessagePanel