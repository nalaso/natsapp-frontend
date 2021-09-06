import React, { useContext, useState } from 'react'
import { FireContext } from '../../../Config/Firebase/Firebase';
import { UserContext } from "./../../../components/AuthProvider/AuthProvider";

const ChangeAvatar = () => {
    const [pending, setPending] = useState(true)
    const {currentUser,username} = useContext(UserContext)
    const {db,stor,fire} = useContext(FireContext)
    const [file, setFile] = useState({})
    const [uploaddivtext, setuploaddivtext] = useState("Upload Image")

    const uploadnewimg = (e) =>{
        setFile(e.target.files[0]);
        setuploaddivtext("Selected Image : "+ e.target.files[0].name);
        setPending(false)
    }

    const submit = () =>{
        let storageRef = stor.ref("users/"+username);
        let uploadTask = storageRef.child('profpic/user.jpg').put(file);
      
        uploadTask.on('state_changed', (snapshot)=>{
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setuploaddivtext('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case fire.storage.TaskState.PAUSED: // or 'paused'
            setuploaddivtext("Upload is paused");
              break;
            case fire.storage.TaskState.RUNNING: // or 'running'
            setuploaddivtext('Upload is running');
              break;
              default : break;
          }
        },(error)=>{
            setuploaddivtext("Failed! Try again");
          alert(error.message);
        },()=>{
            setuploaddivtext("Updated Successfully");
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
          db.ref('users/' + currentUser.uid +"/userprof").update({
            profile_picture: downloadURL
          }).then(()=>{
            currentUser.updateProfile({
              photoURL: downloadURL
            });
            alert("Updated Successfully");
          });
          });
          setuploaddivtext("Upload Image");
        });
        setPending(true);
    }
    
    return (
        <section className="configSect">
            <div className="profile">
                <p className="confTitle">Change Avatar</p> 
            
                <input type="file" name="" id="file" className="changePic" accept=".png, .jpg, .jpeg" style={{display: "none"}} onChange={uploadnewimg}/>	
                <button className="changePic"><p><label htmlFor="file" id="fileselector" style={{cursor: "pointer"}}>{uploaddivtext}</label></p></button>
                {
                        pending?(
                            <div></div>
                        ):(
                            <button style={{marginLeft: "10px"}} className="changePic" onClick={submit} id="submitpropicbtn">Submit</button>	  
                        )
                }
            </div>
        </section>
    )
}

export default ChangeAvatar
