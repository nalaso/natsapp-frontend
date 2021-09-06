import axios from './../../../Config/axios/axios'
import React, { useEffect, useState,useRef } from 'react'

const BotMessagePanel = ({props,botmsg,changebotmsg,issame}) => {
    const messagesEndRef = useRef(null)
    const [msgs, setmsgs] = useState([])
    const [pending, setPending] = useState(false)
    const [bottime, setBottime] = useState("")
    const [pendmsg, setpendmsg] = useState(".")
    
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ block: 'end',behavior: "smooth" })
    }

    const gettime = () => new Date().toLocaleString()

    const textQuery = async (text) => {
        const textQueryVariables = {
            text
        }
        try {
            const response = await axios.post('/textQuery', textQueryVariables)
            setmsgs(oldmsgs=>(
                [...oldmsgs,{
                    isme:false,
                    msg:response.data,
                    time:gettime()
                }]
            ))
        } finally{
            setPending(pre=>!pre)
            setpendmsg(".")
        }
    }

    const eventQuery = async (event) => {
        const eventQueryVariables = {
            event
        }
        try {
            const response = await axios.post('/eventQuery', eventQueryVariables)
            setmsgs(oldmsgs=>(
                [...oldmsgs,{
                    isme:false,
                    msg:response.data,
                    time:gettime()
                }]
            ))
            
        } finally{
            setPending(pre=>!pre)
            setpendmsg(".")
        }
    }

    useEffect(() => {
        if(pending){
            const timedf = setInterval(() => {
                console.log("timer");
                setpendmsg(pendmsg+".")
            }, 400);
            return () => clearInterval(timedf);
        }
    }, [pending])

    useEffect(() => {
        if(botmsg!==""){
            setPending(pre=>!pre)
            setmsgs(oldmsgs=>(
                [...oldmsgs,{
                    isme:true,
                    msg:botmsg,
                    time:gettime()
                }]
            ))
            setBottime(gettime());
            textQuery(botmsg)
        }
    }, [botmsg,issame,props.id])
    console.log(props);
    useEffect(() => {
        setmsgs([{
                isme:false,
                msg:props.msg,
                time:gettime()
            }]
        )
        return () => {
            setmsgs([]);
            changebotmsg("");
        }
    }, [props.id])

    const handleScroll =() =>{
        
    }

    useEffect(() => {
        scrollToBottom()
    }, [msgs])

    return (
        <div className="convHistory userBg" id="msgbox"  onScroll={handleScroll}>
           
            {msgs.map(msg=>(
                    <div key={msg.time} className={msg.isme?(
                        "msg messageSent"
                    ):(
                        "msg messageReceived"
                    )}>
                        <h3>{msg.msg}</h3>
                        <h5 className="timestamp">{msg.time}</h5>
                    </div>
            ))}
            {
                pending && (
                    <div className="msg messageReceived">
                        <h3>{pendmsg}</h3>
                        <h5 className="timestamp">{bottime}</h5>
                    </div>
                )
            }
             <div className="msg" style={{opacity:0,padding:"0px",margin:"0px"}} ref={messagesEndRef} />
		</div>
    )
}

export default BotMessagePanel
