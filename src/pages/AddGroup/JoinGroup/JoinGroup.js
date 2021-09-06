import React, { useContext, useState } from 'react'
import { UserContext } from '../../../components/AuthProvider/AuthProvider'
import { FireContext } from '../../../Config/Firebase/Firebase'

const JoinGroup = () => {
    const [grval, setgrval] = useState("")
    const {currentUser,username} = useContext(UserContext)
    const {db,fire} = useContext(FireContext)

    const handleinput = (e) => {
        setgrval(e.target.value)
    }

    const checkgr = () => {
        if(grval){
            db.ref("groupsname/"+ grval).once("value").then((snapshot)=>{
                let grtyp = snapshot.val().jointype;
                let grnam = snapshot.val().grname;
                if(grtyp === "closed"){
                    alert("Group is closed");
                }
                else if(grtyp === "reqtojoin" || grtyp === "passtojoin"){
                    db.ref("grrequests/" + grval + "/received").child(currentUser.uid).set({
                        username : username
                    }).then(()=>{
                        db.ref("requests/" + currentUser.uid + "/grpendings/sent").child(grval).set({
                            jointype : grtyp
                        }).then(()=>{
                            alert("Group request sent");
                        });
                    });
                }
                else if(grtyp === "open"){
                    alert("Joined group!");
                    db.ref("users/"+currentUser.uid+"/groups").child(grval).set({
                        name : grnam,
                        type:"active"
                    });
                    db.ref("groups/"+grval+"/grprof").child("mem").transaction((mem)=>{
                        return (mem || 0) + 1
                    });
                    db.ref("groups/"+grval+"/grprof/users/users").update({
                        [username]:fire.database.ServerValue.TIMESTAMP
                    })
                }
                setgrval("");
            }).catch((err)=>{
                if(err === "TypeError: Cannot read property 'jointype' of null"){
                    alert("Group not found");
                }
                setgrval("");
            });
        }
    }

    return (
        <section className="configSect">
            <p className="confTitle">Groups</p>
            <div className="profile">
                <h3>Enter group id to join</h3>
                    <div className="mid">
                        <input onChange={handleinput} value={grval} id="checkgrin" className="themeinput" placeholder="Enter Group Id.." />
                    </div>
                <button className="changePic" onClick={checkgr}>Join Group</button>
            </div>
        </section>
    )
}

export default JoinGroup
