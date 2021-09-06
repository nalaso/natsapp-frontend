import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { UserContext } from './../../../components/AuthProvider/AuthProvider';
import { FireContext } from './../../../Config/Firebase/Firebase';

const GithubLogin = () => {
    let history = useHistory();
    const {db,fire} = useContext(FireContext)
    const {setAuthlink,setphotourl,setprov,isgithubloginneeded,updatestatus,fetchuserprofile,setoprealuser} = useContext(UserContext)
    const [pending, setPending] = useState(true)
    const [username, setUsername] = useState("")
    const [error, setError] = useState("Enter username")
    const [usernameready, setUsernameready] = useState(false)
    const [result, setResult] = useState({})

    const setnewuser = () => {
        const {user} = result;
        setAuthlink("newuser");
        setphotourl(user.photoURL)
        db.ref("username/" + username).set({
            uid: user.uid
        })
        db.ref("users/"+"5xFJaK0gG7gJwJ51QPR1YhVflzS2"+"/friends").child(user.uid).set({
            type : "active"
        })
        db.ref('users/' + user.uid).set({
            userprof:{
                clink:"",
                displayName: result.additionalUserInfo.username,
                username: username,
                uid: user.uid,
                email: user.email,
                profile_picture : user.photoURL,
                github:result.additionalUserInfo.username
            },                
            createtime:user.metadata,
            userrole:{
                score:0,
                usersta:"Member",
                ranks:["Member","Tester"]
            },
        })
        fetchuserprofile(user);
        updatestatus(user);
        user.updateProfile({
            displayName: result.additionalUserInfo.username,
        })
        setprov(true)
        setoprealuser(true);
    }

    const checkusernamelocal = (userName) =>{
        setUsernameready(true);
        if(!isNaN(parseInt(userName))){
          setError("Should not start with number");
          setUsernameready(false);
        }
        else if(userName.indexOf(' ') >= 0){
          setError("Should not contain space");
          setUsernameready(false);
        }
        else if(userName.indexOf("admin")>= 0){
          setError("Should not contain admin");
          setUsernameready(false);
        }
        else if(userName.length<=5){
          setError("Should be more than 5 character");
          setUsernameready(false);
        }
        else{
          db.ref("username/"+userName).once("value",(snap)=>{
            if(snap.val()){
              setError(userName+" is in use!");
              setUsernameready(false);
            }
            else{
              setError(userName+" is available");
            }
          })
        }
    }

    const usernameHandler = (event) =>{
        event.target.value = event.target.value.toLowerCase()
        checkusernamelocal(event.target.value)
        setUsername(event.target.value);
    }

    // setnewuser(result)
    const checkusername = (result) => {
        let uname = result.additionalUserInfo.username;
        uname = uname.toLowerCase()
        setUsername(uname);
        db.ref("username/"+uname).once("value",(snap)=>{
            if(snap.val()){
                setError(uname+" is in use!");
                setUsernameready(false);
            }
            else{
                setError(uname+" is available");
                setUsernameready(true);
            }
        })
    }
    
    const checkready = () => {
        if(usernameready){
            setnewuser();
        }
    }

    useEffect(() => {
        if(isgithubloginneeded){
            setoprealuser(false)
            var provider = new fire.auth.GithubAuthProvider();
            fire.auth().signInWithPopup(provider).then(function(result) {
                setPending(false);
                console.log(result.additionalUserInfo.isNewUser);
                if(result.additionalUserInfo.isNewUser){
                    setResult(result);
                    checkusername(result);
                }else{
                    setoprealuser(true);
                }
            }).catch(function(error) {
                setprov(true);
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                history.push("/");
            });
        }else{
            history.push("/");
        }
    }, [])

    if(pending){
        return (
            <></>
        )
    }

    return (
        <div  className={true ? "dark-mode-ter container" : "light-mode-ter container"}>
            <div className="form-structor"> 
                <div className="signup">
                    <h2 className={true ? "dark-mode-ter form-title" : "light-mode-ter form-title"}>Signup using Github</h2>
                    <div className="form-holder">
                        {error !== null && (
                            <div className="input">
                            {error}
                            </div>
                        )}
                        <input
                            type="name"
                            className="input"
                            name="userName"
                            value={username}
                            placeholder="username  (nalasky)"
                            id="username"
                            onChange={event => usernameHandler(event)}
                        />
                    </div>  
                    <button
                        className="submit-btn"
                        onClick={event => {
                        checkready(event);
                        }}
                    >Continue
                    </button>
                </div>  
            </div>
        </div> 
    )
}

export default GithubLogin
