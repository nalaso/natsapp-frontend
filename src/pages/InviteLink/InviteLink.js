import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { UserContext } from '../../components/AuthProvider/AuthProvider';
import { FireContext } from '../../Config/Firebase/Firebase';
import InviteLinkConfirmation from './InviteLinkConfirmation';
import { useHistory } from "react-router-dom"

const InviteLink = ({match}) => {
    let history = useHistory();
    const {db} = useContext(FireContext)
    const {currentUser} = useContext(UserContext)
    const [link] = useState(match.params.link)
    const [fruid, setFruid] = useState("")
    const [isfriend, setIsfriend] = useState(false)
    const [isvalid, setIsvalid] = useState(false)

    useEffect(() => {
        db.ref("invitelinks/frlinks/" + link).once("value").then((snapshot)=>{
            setFruid(snapshot.val().uid);
            if(snapshot.val().uid === currentUser.uid){
                alert("Well you can't be your friend lol, Use 'My message' to save your private massages!.");
                history.push("/");
            }
            else if(snapshot.val().uid !== null){
                db.ref("users/"+currentUser.uid+"/friends").once("value",(chisnap)=>{
                    if(chisnap.val() !== null){
                        chisnap.forEach(babsnapshot => {
                            if(babsnapshot.key === snapshot.val().uid){
                                    setIsfriend(true);
                            }
                        });
                    }
                }).then(()=>{
                    let cdate = new Date().getTime();
                    if(snapshot.val().enddate >= cdate && snapshot.val().maxmem !== 0 && !isfriend){
                        setIsvalid(true);
                    }
                    else if(snapshot.val().maxmem === 0){
                        alert("Link doesnot support anymore request!");
                        history.push("/");
                    }
                    else if(snapshot.val().enddate < cdate){
                        alert("Link expired!");
                        history.push("/");
                    }
                    else if(isfriend){
                        alert("This user is already your Friend");
                        history.push("/");
                    }
                    // history.push("/");
                });
              }
              else{
                alert("Link is Not valid");
                history.push("/");
              }
        }).catch((err)=>{
            alert("Link is Not valid");
            history.push("/");
        });
    }, [link])
    return (
        isvalid && (
            <InviteLinkConfirmation fruid={fruid} link={link} />
        )
    )
}

export default InviteLink
