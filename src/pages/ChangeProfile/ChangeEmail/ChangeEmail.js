import React, { useContext, useState } from 'react'
import { FireContext } from '../../../Config/Firebase/Firebase';
import { UserContext } from "./../../../components/AuthProvider/AuthProvider";

const ChangeEmail = () => {
    const [newemail, setNewemail] = useState("")
    const [password, setPassword] = useState("")
    const [pending, setPending] = useState(false)
    const {currentUser} = useContext(UserContext)
    const {db,fire} = useContext(FireContext)

    const updateEmail = () => {
        setPending(true);
        if((newemail !== "") && (password !== "") && (currentUser.email !== newemail)){      
            currentUser.reauthenticateWithCredential(fire.auth.EmailAuthProvider.credential(currentUser.email, password)).then(()=>{
                currentUser.updateEmail(newemail).then(()=>{
                    db.ref('users/' + currentUser.uid +"/userprof").update({
                        email: newemail
                    }).then(()=>{
                        alert("Email Updated");
                        setPending(false);
                        setNewemail("");
                        setPassword("");
                    });
               }).catch((error)=>{
                  alert(error.message);
                  setPending(false);
               });
            }).catch((error)=>{
              alert(error.message);
              setPending(false);
            });
          }
          else if(currentUser.email === newemail){
            alert("Enter different email");
            setPending(false);
          }
          else{
            alert("Please enter the details");
            setPending(false);
          }
    }

    const warn = () =>{
        alert("Requires Premium Subscription");
    }

    return (
        <section className="configSect second">
            <div className="profile">
                <h3>New Email</h3>
                <div className="mid">
                    <input value={newemail} onChange={(e)=>setNewemail(e.target.value)} type="text" className="themeinput" id="updateemailin" placeholder="Enter email..." />
                </div>
            </div>
            <div className="profile">
                <h3>Currrent Password</h3>
                <div className="mid">
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" className="themeinput" id="emailcurrentpassin" placeholder="Enter password.." />
                </div>
            </div>
            <div className="profile">
                <div className="mid">
                    {
                        pending?(
                            <div></div>
                        ):(
                            <button className="changePic" id="updateemailbtn" onClick={warn}>Update</button>  
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default ChangeEmail
