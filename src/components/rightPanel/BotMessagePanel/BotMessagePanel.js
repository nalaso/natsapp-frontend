import {mainAxios,botAxios} from './../../../Config/axios/axios'
import React, { useEffect, useState,useRef } from 'react'
import { makeStyles } from '@material-ui/core'

const BotMessagePanel = ({props,botmsg,changebotmsg,issame,defaulvalue,reader,convert}) => {
    const messagesEndRef = useRef(null)
    const [msgs, setmsgs] = useState([])
    const [pending, setPending] = useState(false)
    const [bottime, setBottime] = useState("")
    const [pendmsg, setpendmsg] = useState(".")
    
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ block: 'end',behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [msgs])

    useEffect(() => {
        if (convert) {
            setPending(pre=>!pre)
            downloadjpeg()
        }
    }, [convert])

    // useEffect(() => {
    //     reader = new FileReader();
    //     console.log(reader);
    //     if(files){
    //         reader.readAsDataURL(files)
    //     }
        
    // }, [files])

    const gettime = () => new Date().toLocaleString()

    const textQuery = async (text) => {
        const textQueryVariables = {
            text
        }
        try {
            const response = await mainAxios.post('/textQuery', textQueryVariables)
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
            defaulvalue()
        }
    }

    const downloadjpeg = async () => {
        let ts =gettime()
        setmsgs(oldmsgs=>(
            [...oldmsgs,{
                isme:true,
                msg:reader.result,
                time:ts,
                name:"natsapp_"+ts+".png"
            }]
        ))
        let src ;
        try {
            const response = await botAxios.post('/jpegtopng0821', {base64:reader.result})
            console.log(response.data);
            src = response.data.base64;
        } finally{
            let tr = gettime()
            setmsgs(oldmsgs=>(
                [...oldmsgs,{
                    isme:false,
                    msg:src,
                    time:gettime(),
                    name:"natsapp_"+tr+".png"
                }]
            ))
            setPending(pre=>!pre)
            setpendmsg(".")
        }
    }

    useEffect(() => {
        if(pending){
            const timedf = setInterval(() => {
                setpendmsg(pendmsg=>pendmsg==="..."?".":pendmsg+".")
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

    return (
        <div className="convHistory userBg" id="msgbox">
           
            {msgs.map(msg=>(
                (msg.msg)?.startsWith("data:image/")?(
                    // <div key={msg.time} className="msg messageSent sentimg">
                    <div key={msg.time} className={msg.isme?(
                        "msg messageSent sentimg"
                    ):(
                        "msg messageReceived sentimg"
                    )}>
                        <a href={msg.msg} download={msg.name}>
                            <img id="imgimg" src={msg.msg} />
                        </a>
                        <h5 className="timestamp">{msg.time}</h5>
                    </div>
                ):(
                    <div key={msg.time} className={msg.isme?(
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
