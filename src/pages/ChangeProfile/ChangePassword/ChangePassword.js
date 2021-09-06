import React, { useContext, useState } from 'react'
import { FireContext } from '../../../Config/Firebase/Firebase';
import { UserContext } from "./../../../components/AuthProvider/AuthProvider";

const ChangePassword = () => {
    const [newpass, setNewpass] = useState("")
    const [password, setPassword] = useState("")
    const [pending, setPending] = useState(false)
    const {currentUser} = useContext(UserContext)
    const {fire} = useContext(FireContext)

    const updateEmail = () => {
        setPending(true);
        if((newpass !== "") && (password !== "")){
            currentUser.reauthenticateWithCredential(fire.auth.EmailAuthProvider.credential(currentUser.email, password)).then(()=>{
                currentUser.updatePassword(newpass).then(()=>{
                    alert("Password Updated");
                    setPending(false);
                    setNewpass("");
                    setPassword("");
               }).catch((error)=>{
                  alert(error.message);
                  setPending(false);
               });
            }).catch((error)=>{
              alert(error.message);
              setPending(false);
            });
        }
        else{
            alert("Please enter the details");
            setPending(false);
        }
    }
    
    return (
        <section className="configSect second">		
            <div className="profile">
                <h3>New Password</h3>
                <div className="mid">
                    <input value={newpass} onChange={(e)=>setNewpass(e.target.value)} type="text" className="themeinput" id="updatepassin" placeholder="New password.."/>
                </div>
            </div>
            <div className="profile">
                <h3>Currrent Password</h3>
                <div className="mid">
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" className="themeinput" id="passcurrentpassin" placeholder="Currrent password.."/>
                </div>
            </div>
            <div className="profile">
                <div className="mid">
                    {
                        pending?(
                            <div></div>
                        ):(
                            <button className="changePic" id="updateemailbtn" onClick={updateEmail}>Update</button>  
                        )
                    }
                </div>
            </div>
                
        </section>
    )
}

export default ChangePassword
