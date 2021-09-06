import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../components/AuthProvider/AuthProvider';
import { FireContext } from '../../Config/Firebase/Firebase';

const AddFriend = () => {
    const {db} = useContext(FireContext);
    const {currentUser,username} = useContext(UserContext);
    const [fruname, setfruname] = useState("");

    let history = useHistory();
    const handleroute = ()=>{
        history.push("/Friends/Pendings");
    }

    const addFriend = () =>{
        if(fruname){
            db.ref("username/"+ fruname).once("value").then((snapshot)=>{
                let frid = snapshot.val().uid;
                if(frid !== null){
                    db.ref("requests/" + frid + "/frpendings/received").child(currentUser.uid).set({
                        username : username
                    }).then(()=>{
                        db.ref("requests/" + currentUser.uid + "/frpendings/sent").child(frid).set({
                            username : fruname
                        }).then(()=>{
                            alert("friend request sent");
                            setfruname("");
                        });
                    });
                }
            }).catch((err)=>{
                if(err === "TypeError: Cannot read property 'uid' of null"){
                    alert("User not found");
                }
                
            });
        }
    }

    const handleinput = event=>{
        setfruname(event.target.value)
    }

    return (
        <section className="Friendsconfig">
            <section className="configSect">
                <p className="confTitle">Add Friends</p>
                <div className="profile">
                    <h3>
                        Enter Friend's username
                    </h3>
                    
                    <div className="mid">
                        <input value={fruname} onChange={handleinput} type="text" className="themeinput" placeholder="Enter username.." />
                    </div>
                        
                    <button className="changePic" onClick={addFriend}>
                        Add Friend
                    </button>

                </div>
            </section>

            <section className="configSect">
                <p className="confTitle">Friends Requests</p>
                <div className="profile">
                    {/* <button className="changePic reqfr" onclick="getfrreqr();getfrreqs();">Requests Pending</button> */}
                    <button className="changePic reqfr" onClick={handleroute}>Requests Pending</button>
                </div>
            </section>
        </section>
    )
}

export default AddFriend
