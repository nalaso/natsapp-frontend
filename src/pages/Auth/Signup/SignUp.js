import React, { useContext, useEffect, useState } from "react";
import './SignUp.css';
import { Link } from "react-router-dom";
import { FireContext } from "../../../Config/Firebase/Firebase";
import {UserContext} from "../../../components/AuthProvider/AuthProvider";

const SignUp = (props) => {
  const [darkMode] = useState(false);
  const {auth,db} = useContext(FireContext);
  const {setphotourl,setAuthlink,setprov,adminuid} = useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [usernameready, setUsernameready] = useState(false)

  const checkpass = (event)=>{
    if(event.target.value == "nalaway"){
        setPending(true);
        // auth.signInWithEmailAndPassword("visitor@natsapp.user", "visitor");
    }
    else{
      onChangeHandler(event)
    }
  }

  useEffect(() => {
    if(props.location.pathname=="/Activate"){
      setPending(true);
      setprov(false);
      const query = new URLSearchParams(props.location.search);
      let token = query.get('token')
      let username = query.get('username')
      let email = username+"@natsapp.in"
      auth.signInWithCustomToken(token).then((userCredential) => {
        const {user} = userCredential;
        if(userCredential.additionalUserInfo.isNewUser){
          setphotourl("https://firebasestorage.googleapis.com/v0/b/natsapp-402b2.appspot.com/o/photos%2Fimages%2Fprof.png?alt=media&token=6366d2c5-1efa-4839-8c8a-5a8e1cba94b8")
          user.updateProfile({
            email:email,
            displayName: username,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/natsapp-402b2.appspot.com/o/photos%2Fimages%2Fprof.png?alt=media&token=6366d2c5-1efa-4839-8c8a-5a8e1cba94b8"
          })
          db.ref("username/" + username).set({
            uid: user.uid
          })
          db.ref("users/"+adminuid+"/friends").child(user.uid).set({
            type : "active"
          })
          db.ref('users/' + user.uid).set({
            userprof:{
                clink:"",
                displayName: username,
                username: username,
                uid: user.uid,
                email: email,
                profile_picture : "https://firebasestorage.googleapis.com/v0/b/natsapp-402b2.appspot.com/o/photos%2Fimages%2Fprof.png?alt=media&token=6366d2c5-1efa-4839-8c8a-5a8e1cba94b8"
            },                
            createtime:user.metadata,
            userrole:{
                score:0,
                usersta:"Member",
                ranks:["Member","Tester"]
            },
          })
          setAuthlink("newuser");
        }else{
          setAuthlink("newuser");
        }
      }).catch(error => {
          setPending(false)
          setError(error.message);
          console.error("Error generating custom token", error);
      });
    }
  }, [props])

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
          setError("Perfect username");
        }
      })
    }
  }

  const usernameHandler = (event) =>{
    event.target.value = event.target.value.toLowerCase()
    checkusernamelocal(event.target.value)
    onChangeHandler(event)
  }

  const checkready = (event) =>{
    if(displayName.length<=3){
      setError("Display name must be more than 3 character");
    }
    else if(!usernameready){
      setError("Enter a valid username");
    }
    else if(password.length<=6){
      setError("Password must be more than 6 character");
    }
    else{
      createUserWithEmailAndPasswordHandler(event)
    }
  }

  const createUserWithEmailAndPasswordHandler = (event) => {
    setPending(true);
    setprov(false);
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then((credential)=>{
      const {user} = credential;
      setAuthlink("newuser");
      if(credential.additionalUserInfo.isNewUser){
        setphotourl("https://firebasestorage.googleapis.com/v0/b/natsapp-402b2.appspot.com/o/photos%2Fimages%2Fprof.png?alt=media&token=6366d2c5-1efa-4839-8c8a-5a8e1cba94b8")
      }
      user.updateProfile({
        displayName: displayName,
        photoURL: "https://firebasestorage.googleapis.com/v0/b/natsapp-402b2.appspot.com/o/photos%2Fimages%2Fprof.png?alt=media&token=6366d2c5-1efa-4839-8c8a-5a8e1cba94b8"
      })
      db.ref("username/" + userName).set({
        uid: user.uid
      })
      db.ref("users/"+adminuid+"/friends").child(user.uid).set({
        type : "active"
      })
      db.ref('users/' + user.uid).set({
        userprof:{
            clink:"",
            displayName: displayName,
            username: userName,
            uid: user.uid,
            email: email,
            profile_picture : "https://firebasestorage.googleapis.com/v0/b/natsapp-402b2.appspot.com/o/photos%2Fimages%2Fprof.png?alt=media&token=6366d2c5-1efa-4839-8c8a-5a8e1cba94b8"
        },                
        createtime:user.metadata,
        userrole:{
            score:0,
            usersta:"Member",
            ranks:["Member","Tester"]
        },
      })
      
      // generateUserDocument(user, {displayName});
    }).catch((error)=>{
      setPending(false)
      setError('Error Signing up with email and password');
    });
      
    setEmail("");
    setPassword("");
    setDisplayName("");
  }

  const createAnonymousUserHandler = () => {
    setPending(true);
    setprov(false);
    auth.signInAnonymously().then((credential)=>{
      const {user} = credential;
      setAuthlink("newuser");
      let createTime = new Date().getTime();
      let anonymName = "Guest "+createTime;
      let anonymid = "quest"+createTime;
      let anonymemail = createTime+"@natsapp.in";
      if(credential.additionalUserInfo.isNewUser){
        setphotourl("https://firebasestorage.googleapis.com/v0/b/natsapp-402b2.appspot.com/o/photos%2Fimages%2Fanonymprof.png?alt=media&token=d4e1f4fc-a546-4189-83f5-994fba18315d")
      }
      user.updateProfile({
        displayName: anonymName,
        photoURL: "https://firebasestorage.googleapis.com/v0/b/natsapp-402b2.appspot.com/o/photos%2Fimages%2Fanonymprof.png?alt=media&token=d4e1f4fc-a546-4189-83f5-994fba18315d"
      })
      db.ref("username/" + anonymid).set({
        uid: user.uid
      })
      db.ref("users/"+adminuid+"/friends").child(user.uid).set({
        type : "active"
      })
      db.ref('users/' + user.uid).set({
        userprof:{
            clink:"",
            displayName: anonymName,
            username: anonymid,
            uid: user.uid,
            email: anonymemail,
            profile_picture : "https://firebasestorage.googleapis.com/v0/b/natsapp-402b2.appspot.com/o/photos%2Fimages%2Fanonymprof.png?alt=media&token=d4e1f4fc-a546-4189-83f5-994fba18315d"
        },                
        createtime:user.metadata,
        userrole:{
            score:0,
            usersta:"Guest",
            ranks:["Guest","Visitor"]
        },
      })
      // generateUserDocument(user, {anonymName});
    }).catch((error)=>{
      setError('Error Signing up anonymously');
    });
      
    setEmail("");
    setPassword("");
    setDisplayName("");
  }

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    } else if (name === "userName") {
      setUserName(value);
      setEmail(value+"@natsapp.in");
    }
  }

  if (pending) {
    return(<h1 style={{color:"whitesmoke",textAlign:"center",paddingTop:"45vh"}}>Welcome to Natsapp</h1>)
  }
  
  return (<>
    <div  className={darkMode ? "dark-mode-ter container" : "light-mode-ter container"}>
    <div className="form-structor"> 
    <div className="signup">
    <h2 className={darkMode ? "dark-mode-ter form-title" : "light-mode-ter form-title"}>Sign Up</h2>
      <div className="form-holder">
          {error !== null && (
            <div className="input">
              {error}
            </div>
          )}
          
          {/* <label htmlFor="userEmail" className="block">
            Email:
          </label> */}
          <input
            type="name"
            className="input"
            name="userName"
            value={userName}
            placeholder="Username  (nalasky)"
            id="username"
            onChange={event => usernameHandler(event)}
          />
          <input
            type="text"
            className="input"
            name="displayName"
            value={displayName}
            placeholder="Display Name  (Nala Sky)"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          <input
            type="password"
            className="input"
            name="userPassword"
            value={password}
            placeholder="Password"
            id="userPassword"
            onChange={event => checkpass(event)}
          />
        </div>  
        <button
            className="submit-btn"
            onClick={event => {
              checkready(event);
            }}
          >Sign up
        </button>
        <h5 className="textacc" style={{paddingTop:0}}>Or</h5>
        <button
            className="submit-btn"
            onClick={() => {
              createAnonymousUserHandler();
            }}
          >Sign up Anonymously
        </button>

        <p className={darkMode ? "dark-mode-ter textacc" : "light-mode-ter textacc"} style={{paddingTop:0,marginBottom:"15px"}}>
          <br/>Already have an account?<br/>{" "}
          <Link to="/SignIn" className="textsignin">
            Sign in here
          </Link>{" "}
        </p>
    </div>  
    </div>
    </div> 

  </>);
}
export default SignUp;