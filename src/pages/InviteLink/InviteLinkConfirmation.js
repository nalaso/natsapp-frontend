import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../components/AuthProvider/AuthProvider'
import { FireContext } from '../../Config/Firebase/Firebase'
import { ChatOpenContext } from '../../Hooks/IsChatOpen/IsChatopen'
import GitHubIcon from '@material-ui/icons/GitHub';

const InviteLinkConfirmation = ({fruid,link,match}) => {
    let history = useHistory();
    const [frienddet, setFrienddet] = useState({})
    const {currentUser} = useContext(UserContext)
    const {chatdet} = useContext(ChatOpenContext)
    const [pending, setPending] = useState(false)
    const [isready, setIsready] = useState(false)
    const [frdetail, setfrdetail] = useState(true)
    const {db} = useContext(FireContext)

    const getdata = (val) => {
        db.ref("users/" + val).orderByKey().limitToLast(2).once("value").then((snapshot)=>{
            if(snapshot.val()){
                setIsready(true);
                setFrienddet({
                    username:snapshot.val().userprof.username,
                    name:snapshot.val().userprof.displayName,
                    email:snapshot.val().userprof.email,
                    score:snapshot.val().userrole.score,
                    github:snapshot.val().userprof.github,
                    photo:snapshot.val().userprof.profile_picture
                })
            }
        });
    }
    const openurl = () => {
        var win = window.open("https://github.com/"+frienddet.github, '_blank');
        win.focus();
    }

    useEffect(() => {
        if(link){
            setfrdetail(false)
            getdata(fruid);
        }else if(match.params.id){
            db.ref("username/" + match.params.id).once("value").then((snapshot)=>{
                getdata(snapshot.val().uid)
            }).catch(()=>{
                history.push("/");
            })
        }else{
            getdata(chatdet.uid);
        }
    }, [])

    const addFriend = () =>{
        setPending(true)
        db.ref("users/"+currentUser.uid+"/friends").child(fruid).set({
            type : "active"
        }).then(()=>{
            db.ref("users/"+fruid+"/friends").child(currentUser.uid).set({
                type : "active"
            }).then(()=>{
                db.ref("invitelinks/frlinks/" + link).child('maxmem').transaction((maxmem)=>{
                    return (maxmem || 0) - 1
                }).then(()=>{
                    alert("user added");
                    history.push("/");
                });
            });
        });
    }

    return (
        <section className="addfrlink" style={{border: "grey 2px solid"}}>
            <section className="configSect second">
            {isready ? (
                <div className="profile">
                    <p className="confTitle">User Profile</p>
                    <br />
                    <img alt="img" id="frlinkimage" src={frienddet.photo} className="meimage"></img>
                    {
                        frienddet.github && (
                            <div className="providersicons">
                                <GitHubIcon onClick={openurl} className="proicon"/>
                            </div>
                        )
                    }
                    <div className="side">
                        <p className="name" id="frlinkname">Name : {frienddet.name}</p>
                        <p className="name" id="frlinkid">Username : @{frienddet.username}</p>
                    </div>
                    
                    <br />
                    <ul>
                        <li>Email: <span className="blue username" id="frlinkemail">{frienddet.email}</span></li>
                        <li>Score: <span className="blue username" id="frlinkscore">{frienddet.score}</span></li>
                        <li>Current Role: <span className="blue username" id="frlinkrole">Beta Tester</span></li>
                        <li>Ranks: <span className="blue username" id="frlinkranks">Visitor</span></li>
                        <li>Profile: <span className="blue" id="frlink">natsapp.now.sh/@{frienddet.username}</span></li>
                    </ul>
                </div>
            ):(
                <div className="profile">
                    <p className="confTitle">Loading...</p>
                </div>
            )}
                {
                    !frdetail && (
                        <div className="profile">
                            {
                                !pending && (
                                    <button className="changePic addfrlinkfr" onClick={addFriend}>Add Friend</button>
                                )
                            }
                        </div>
                    )
                }
            </section>	
        </section>
    )
}

export default InviteLinkConfirmation
