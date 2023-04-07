import React, { useContext, useEffect, useState } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { UserContext } from '../../components/AuthProvider/AuthProvider';
import { FireContext } from '../../Config/Firebase/Firebase';
import { Link } from "react-router-dom";

const GenerateLink = () => {
    const {db} = useContext(FireContext)
    const {currentUser,username,clink,setlink} = useContext(UserContext)
    const [validtill, setValidtill] = useState("")
    const [selecteddate, setSelecteddate] = useState(null)
    const [validfor, setvalidfor] = useState(0)
    const [requestno, setrequestno] = useState(0)
    const [linkType] = useState("open")
    const [pending, setPending] = useState(false)

    useEffect(() => {
        if(clink){
            db.ref("invitelinks/frlinks/" + clink).once("value").then((snap)=>{
                if(snap.val()){
                    setvalidfor(snap.val().maxmem);
                    let enddate =snap.val().enddate;
                    let todate=new Date(enddate).getDate();
                    let tomonth=new Date(enddate).getMonth()+1;
                    let toyear=new Date(enddate).getFullYear();
                    let original_cdate=todate+'/'+tomonth+'/'+toyear;
                    setValidtill(original_cdate);
                }
            });
        }
    }, [clink])

    const copylink =() =>{
        var aux = document.createElement("input");
        aux.setAttribute("value", "natsapp.web.app/invitefriend/"+clink);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        alert("Link Copied");
        document.body.removeChild(aux);
    }

    const randomlink = a =>{
        let ans = ''; 
        for (var i = 30; i > 0; i--) { 
            ans +=  a[Math.floor(Math.random() * a.length)]; 
        }
        return ans;
    }

    const generateLink = () =>{
        if(linkType !== null && requestno > 0){
            let linkenddate = selecteddate.getTime();
            setPending(true);
            let linkend = randomlink(currentUser.uid);
            let link = username+linkend;
            db.ref('invitelinks/frlinks/' + link).set({
                uid: currentUser.uid,
                enddate:linkenddate,
                maxmem:requestno
            }).then(()=>{
                if(clink){
                    db.ref('invitelinks/frlinks/' + clink).remove();
                }
                db.ref('users/' + currentUser.uid +"/userprof").update({
                    clink: link
                }).then(()=>{
                    setlink(link);
                    setPending(false);
                    alert("Link Generated!");
                    setrequestno(0);
                    setSelecteddate(null);
                });
            });
        }
        else if(requestno === 0){
            alert("Please enter request range");
        }
    }
    
    return (
        <section className="Addfrcr" style={{border: "grey 2px solid"}}>
            <section className="configSect">
                        
                <p className="confTitle configtitle">
                    <Link to="/Settings">
                        <button className="tbButton" id="backfrr">
                            <ArrowBackIcon />
                        </button>
                    </Link>
                Invite Link</p>		
            </section>

            {
                clink && (
                    <section className="configSect" id="ifclinksec">
                        <div className="profile">
                            <h2>Current link</h2><br />
                            <div className="mid">
                                <h4>Click below to copy link</h4>
                                <div style={{cursor: "pointer",width: "90%",overflow: "hidden",backgroundColor: "honeydew",color: "blue"}} type="text" className="themeinput" id="frlinkdiv" onClick={copylink}>natsapp.web.app/invitefriend/{clink}</div>
                                <div className="information">
                                    <ul>
                                        <li>Valid till: <span className="blue phone" id="frlinkend">{validtill}</span></li>
                                        <li>Valid for: <span className="blue username" id="frlinkmem">{validfor} requests</span></li>
                                    </ul>		
                                </div>		
                            </div>
                        </div>	
                    </section>	
                )
            }
            
            <section className="configSect">	
                <div className="profile">
                    <h2>Generate New Link</h2>
                    <br />
                    <div className="mid">
                        <div className="profile">
                            <h3>Enter no of requests to accept</h3>
                            <div className="mid">
                            <input value={requestno} onChange={(e)=>{setrequestno(e.target.value)}} maxLength="2" id="frlinkmemno" type="number" className="themeinput" onKeyDown={(event)=>event.key == "e" ? false : true} placeholder="Enter range. (1 - 99)" />
                            </div>
                        </div>
                        <br/>
                        <div className="profile">
                            <h3>Enter expiry date</h3>
                            <div className="mid">
                            {/* <input  id="frlinkdate" type="text" className="themeinput" onkeydown="formatdate(event)" onkeyup="formatdate(event)"placeholder="dd/mm/yyyy" maxlength="10" /> */}
                            <DatePicker 
                            selected={selecteddate}
                            onChange={date => setSelecteddate(date)}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            />
                            </div>
                        </div>
                        <br/>
                        <div className="profile">
                            <h3>Enter joinging type</h3>
                            <div className="mid">
                                {/* <input type="radio" id="passtolink" name="frlinktype" value="passtolink" /> */}
                                <label htmlFor="male">Password (Coming soon)</label><br />
                                <input type="radio" id="opentolink"  name="frlinktype" value="opentolink" defaultChecked="true" />
                                <label htmlFor="female">Open</label><br />
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="profile">
                    {
                        !pending && (
                            <button className="changePic" id="genfrbtn" onClick={generateLink} >Generate Link</button>
                        )
                    }
                </div>
            </section>
            
        </section> 
    )
}

export default GenerateLink
