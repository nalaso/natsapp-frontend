import React, { useContext ,useEffect ,useState } from 'react'
import axios, { mainAxios } from './../../Config/axios/axios'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../components/AuthProvider/AuthProvider'
import { FireContext } from '../../Config/Firebase/Firebase'
import { ChatOpenContext } from '../../Hooks/IsChatOpen/IsChatopen'
import GroupAdmins from './GroupAdmins'
import GroupMembers from './GroupMembers'

const GroupDetails = (props) => {
    let history = useHistory();
    const {db,fire} = useContext(FireContext)
    const {currentUser,username} = useContext(UserContext)
    const {chatdet} = useContext(ChatOpenContext)
    const [grdetails, setGrdetails] = useState({})
    const [isready, setIsready] = useState(false)
    const [isadmin, setIsadmin] = useState(false)
    const [moredet, setMoredet] = useState(false)
    const [admins, setAdmins] = useState([])
    const [members, setMembers] = useState([])
    const [jointype, setjointype] = useState("open")
    const [grname, setGrname] = useState("")
    const [cugrname, setCuGrname] = useState("")
    const [grpass, setGrpass] = useState("")
    const [ispasstojoin, setIspasstojoin] = useState(false)

    const makedate = val => new Date(val).getDate()+"/"+new Date(val).getMonth()+"/"+new Date(val).getFullYear();

    const makestatus = val => val?"Active":"Inactive"

    const maketype = val => val?"Closed":"Open"

    const changejointype = (e) => {
        setjointype(e.target.value);
        if(e.target.value === "passtojoin"){
            setIspasstojoin(true)
        }else{
            setIspasstojoin(false)
        }
    }

    const setlocuser = (username,status,date) => {
        if(status==="admins"){
            setAdmins(oldadmins=>(
                [...oldadmins,[username,date]]
            ))
        }else{
            setMembers(oldmembers=>(
                [...oldmembers,[username,date]]
            ))
        }
    }

    const removelocuser = (username,status) => {
        if(status==="admins"){
            setAdmins(admins.filter(x=>x[0]!==username))
        }else{
            setMembers(members.filter(x=>x[0]!==username))
        }
    }

    const removeuser = (username,status) => {
        db.ref("groups/"+chatdet.grid+"/grprof/users/"+status).child(username).remove().then(()=>{
            removelocuser(username,status)
        });
        db.ref("groups/"+chatdet.grid+"/grprof").child("mem").transaction((mem)=>{
            return (mem || 0) - 1
        })
        db.ref("username/"+username).once("value",snap=>{
            db.ref("users/"+snap.val().uid+"/groups").child(grdetails.grid).remove();
        })
    }

    const toadmin = (username,date) => {
        removelocuser(username,"members");
        db.ref("groups/"+chatdet.grid+"/grprof/users/users").child(username).remove().then(()=>{
            setlocuser(username,"admins",date);
        });
        db.ref("groups/"+chatdet.grid+"/grprof/users/admins").update({
            [username]:fire.database.ServerValue.TIMESTAMP
        })
    }

    const tomember = (username,date) => {
        removelocuser(username,"admins");
        db.ref("groups/"+chatdet.grid+"/grprof/users/admins").child(username).remove().then(()=>{
            setlocuser(username,"members",date);
        });
        db.ref("groups/"+chatdet.grid+"/grprof/users/users").update({
            [username]:fire.database.ServerValue.TIMESTAMP
        })
    }

    const Toupdate = () => {
        if((grname !== "") && (((jointype === "passtojoin") && (grpass !== "")) || (jointype !== "passtojoin"))){
            submitGroup();
        }
    }

    const submitGroup = () => {
        db.ref("groupsname").child(chatdet.grid).update({
            grname: grname,
            jointype:jointype
        }).then(()=>{
            db.ref("groups/"+chatdet.grid+"/grprof").update({
                grname: grname,
                pass: grpass,
                jointype:jointype,
                status:true
            }).then(()=>{
                alert("Changes will reflect within few minutes")
                if(cugrname!==grname){
                    mainAxios.post("/changegrname?grid="+chatdet.grid+"&grname="+grname).then((response)=>{
                        if(response){
                            alert("Details "+response.data+"!");
                            alert("Please reload to see the changes");
                        }
                    });
                }
            });
        })
    }

    useEffect(() => {
        if(chatdet.grid === props.match.params.id){
            db.ref("groups/"+chatdet.grid+"/grprof").once("value",(snapshot)=>{
                setIsready(true);
                setjointype(snapshot.val().jointype);
                setGrname(snapshot.val().grname);
                setCuGrname(snapshot.val().grname)
                setGrpass(snapshot.val().pass)
                setGrdetails({
                    grid: snapshot.val().grid,
                    grname: snapshot.val().grname,
                    createdby: snapshot.val().createdby,
                    createdon: makedate(snapshot.val().createdate),
                    members: snapshot.val().mem,
                    status: makestatus(snapshot.val().status),
                    jointype: snapshot.val().jointype
                })
                if(snapshot.val().users.users){
                    setMembers(Object.entries(snapshot.val().users.users))
                }
                if(snapshot.val().users.admins){
                    setAdmins(Object.entries(snapshot.val().users.admins))
                }
            })
            db.ref("groups/"+chatdet.grid+"/grprof/users/admins").child(username).once("value",snap=>{
                if(snap.val()){
                    setIsadmin(true)
                }
            })
        }
        else{
            history.push("/")
        }
    }, [])

    return (
        <section className="addfrlink" style={{border: "grey 2px solid"}}>
            {
                isready ? (<>
                    <section className="configSect second">
                        <div className="profile">
                            <p className="confTitle">Group Details</p>
                            <br />
                            
                            <img alt="img" id="frlinkimage" src={"https://cdn.iconscout.com/icon/premium/png-512-thumb/user-group-559908.png"} className="meimage"></img>
                            
                            <div className="side">
                            <br /><br />
                                <p className="name" id="frlinkname">Group Name : {grdetails.grname}</p>
                                <p className="name" id="frlinkid">Group id : {grdetails.grid}</p>
                            </div>
                            <br />
                            <ul>
                                <li>Members: <span className="blue username" id="frlinkrole">{grdetails.members}</span></li>
                                <li>Created on : <span className="blue username" id="frlinkemail">{grdetails.createdon}</span></li>
                                <li>Created by : <span className="blue username" id="frlinkscore">{grdetails.createdby}</span></li>
                                <li>Status : <span className="blue username" id="frlinkranks">{grdetails.status}</span></li>
                                <li>JoinType : <span className="blue" id="frlink">{grdetails.jointype}</span></li>
                            </ul>
                            {
                                isadmin && !moredet && <button className="changePic addfrlinkfr" onClick={()=>{setMoredet(true)}}>More details</button>
                            }    
                        </div>
                    </section>	
                    {
                        moredet && (<>
                            <section className="configSect second">
                                <div className="profile">
                                <p className="confTitle">Group Members</p>
                                <div className="reqbox" id="frreqsstabx">
                                    {
                                        admins.map(admin=>(
                                            <GroupAdmins key={admin[0]} db={db} admin={admin} mainadmin={grdetails.createdby} tomember={tomember} removeuser={removeuser}/>
                                        ))
                                    }
                                    {
                                        members.map(user=>(
                                            <GroupMembers key={user[0]} db={db} user={user} toadmin={toadmin} removeuser={removeuser}/>
                                        ))
                                    }
                                </div>
                                </div>
                            </section>
                            <section className="configSect">
                                <div className="profile">
                                <p className="confTitle">Group Settings</p>
                                <br />
                                    <h3>Enter Group display name</h3>
                                    <br />
                                    <div className="mid">
                                    <input value={grname} onChange={(e)=>{setGrname(e.target.value)}} id="grnamein" type="text" className="themeinput" placeholder="Enter group name.." />
                                    </div>
                                </div>	
                                <br />
                                <div className="profile">
                                    <h3>Edit Group joining type</h3>
                                    <br />
                                    <div className="mid">
                                        <input type="radio" id="open"  name="grouptype" value="open" checked={jointype==="open"} onChange={changejointype}/>
                                            <label for="open">open</label><br />
                                        <input type="radio" id="passtojoin"  name="grouptype" value="passtojoin" checked={jointype==="passtojoin"} onChange={changejointype} />
                                            <label for="passtojoin">passtojoin</label><br />
                                        <input type="radio" id="reqtojoin" name="grouptype" value="reqtojoin" checked={jointype==="reqtojoin"} onChange={changejointype} />
                                            <label for="reqtojoin">reqtojoin</label><br />
                                        <input type="radio" id="closed"  name="grouptype" value="closed" checked={jointype==="closed"} onChange={changejointype} />
                                            <label for="closed">closed</label>
                                    </div>
                                </div>
                                <br />
                                {
                                    ispasstojoin && (
                                        <div className="profile">
                                            <h3>Edit Group password</h3>
                                            <div className="mid">
                                                <input value={grpass} onChange={(e)=>{setGrpass(e.target.value)}}  id="grpassin" type="text" className="themeinput" placeholder="Enter group pass.." />
                                            </div>
                                            <br />
                                        </div>
                                    )
                                }
                                <div className="profile">
                                    <button className="changePic" onClick={Toupdate}>Update</button>
                                </div>
                            </section>
                        </>)
                    }
                </>):(
                    <section className="configSect second">
                        <div className="profile">
                            <p className="confTitle">Loading...</p>
                        </div>
                    </section>	
                )
            }
        </section>
    )
}

export default GroupDetails
