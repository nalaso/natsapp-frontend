import React, {useEffect, useState, useContext, createContext } from "react";
import { FireContext } from "./../../Config/Firebase/Firebase";

export const UserContext = createContext();

const AuthProvider = props=>{
  const {auth,db,isapion} = useContext(FireContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [clink, setclink] = useState("")
  const [pending, setPending] = useState(true)
  const [github, setGithub] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [unAuthlink, setUnAuthlink] = useState("")
  const [ispremium, setIspremium] = useState(false)
  const [prov, setProv] = useState(true)
  const [isrealuser, setIsrealuser] = useState(true)
  const [isgithubloginneeded, setisgithubloginneeded] = useState(false)
  const [usernameenter, setUsernameenter] = useState(false)
  const [adminuid, setAdminuid] = useState("")

  const signout = () =>{
    auth.signOut();
  }

  const setpremium = (val)=> {
    if(ispremium){
      if(val){
        alert("premium subscription already activated");
      }else{
        db.ref("users/" + currentUser.uid + "/userprof").update({
          ispremium:false
        }).then(()=>{
          db.ref("groups/"+"natsapp"+"/grprof").child("mem").transaction((mem)=>{
            return (mem || 0) - 1
          }).then(()=>{
            setIspremium(val)
            alert("Premium subscription deactivated!")
          })
        })
      }
    }else{
      db.ref("users/" + currentUser.uid + "/userprof").update({
        ispremium:true
      }).then(()=>{
        db.ref("groups/"+"natsapp"+"/grprof").child("mem").transaction((mem)=>{
          return (mem || 0) + 1
        }).then(()=>{
          setIspremium(val)
          alert("Premium subscription activated!")
        })
      })
    }
  }

  const setAuthlink = (val)=> {
    setUnAuthlink(val);
  }

  const setphotourl = (val) => {
    setPhotoUrl(val);
  }

  const setlink = (val) =>{
    setclink(val);
  }

  const setprov = (val) =>{
    setProv(val);
  }

  const setoprealuser = (val) =>{
    setIsrealuser(val)
  }

  const setgithubloginneeded = (val) =>{
    setisgithubloginneeded(val)
  }

  const setUnameenter = (val) =>{
    setUsernameenter(val)
  }

  const isOfflineForDatabase = {
      isonline: false
  }

  const isOnlineForDatabase = {
      isonline: true
  }

  const fetchuserprofile = (user) => {
    setUsername("");
    setlink("");
    setIspremium(false);
    db.ref("users/" + user.uid + "/userprof").once("value").then((snapshot)=>{
      if(snapshot.val()) {
        setUsername(snapshot.val().username);
        setlink(snapshot.val().clink);
        setIspremium(snapshot.val().ispremium || false);
        setGithub(snapshot.val().github)
      }else if(user.providerData[0].providerId === "github.com" && isrealuser){
        setoprealuser(false)
        setUnameenter(true)
      }
    });
  }

  const updatestatus = (uid) => {
    db.ref('/users/' + uid + "/status").onDisconnect().update(isOfflineForDatabase).then(()=>{
      db.ref('/users/' + uid + "/status").update(isOnlineForDatabase);
    });
  }
  
  useEffect(() => {
    if(isapion){
      setAuthlink(window.location.pathname)
      db.ref("adminuid").once("value").then((snapshot)=>{
        setAdminuid(snapshot.val().uid)
      })
      auth.onAuthStateChanged((user) => {
        console.log(user);
        setPending(false)
        setCurrentUser(user)
        if(user){
          db.ref('.info/connected').on('value',(snapshot)=>{
            if (snapshot.val() === false) {
              console.log("database disconnected");
                return;
            }
            updatestatus(user.uid);
            fetchuserprofile(user);
            setAuthlink("");
          });
        }
      });
    }
  }, [isapion]);

  if(pending){
    return (
      <div>
        {/* <h1 style={{color:"whitesmoke"}}>Loading...</h1> */}
        <div className="watermarkload">
            <img className="wtrmarkload" src="./wtrmark.png" />
        </div>
      </div>
    )
  }

    return (
      <UserContext.Provider value={{currentUser,username,adminuid,ispremium,github,photoUrl,unAuthlink,clink,prov,usernameenter,isrealuser,isgithubloginneeded,fetchuserprofile,updatestatus,setgithubloginneeded,setoprealuser,setprov,setAuthlink,setpremium,setphotourl,setlink,signout}}>
        {props.children}
      </UserContext.Provider>
    );
}
export default AuthProvider