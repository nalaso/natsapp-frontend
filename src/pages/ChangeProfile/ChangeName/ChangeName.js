import React, { useContext, useState } from 'react'
import { FireContext } from '../../../Config/Firebase/Firebase';
import { UserContext } from "./../../../components/AuthProvider/AuthProvider";

const ChangeName = () => {
    const [name, setname] = useState("")
    const [pending, setPending] = useState(false)
    const {currentUser} = useContext(UserContext)
    const {db} = useContext(FireContext)

    const updateName = () => {
        setPending(true);
        if((name !== "") && (name !== currentUser.displayName)){
            currentUser.updateProfile({
              displayName: name
          }).then(()=>{
            db.ref('users/' + currentUser.uid +"/userprof").update({
              displayName: name
            }).then(()=>{
              alert("DisplayName Updated Successfully!");
              setPending(false)
              setname("");
            });
          });
        }
        else{
            alert("Please input new displayname");
            setPending(false);
            setname("");
        }
    }

    return (
        <section className="configSect second">		
            <div className="profile">
                <h3>New Display name</h3>
                <div className="mid">
                <input value={name} onChange={(e)=>{setname(e.target.value)}} type="text" className="themeinput" id="updatednamein" placeholder="Enter display name.." />                    
                </div>
            </div>
            <div className="profile">
                <div className="mid">
                    {
                        pending?(
                            <div></div>
                        ):(
                            <button className="changePic" id="updatednamebtn" onClick={updateName}>Update</button>   
                        )
                    }
                    
                </div>
            </div>		
        </section>
    )
}

export default ChangeName
