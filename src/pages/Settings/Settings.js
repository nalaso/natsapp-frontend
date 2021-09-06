import React, { useContext , useState} from 'react'
import { UserContext } from '../../components/AuthProvider/AuthProvider'
import { Link } from 'react-router-dom'
import { FireContext } from '../../Config/Firebase/Firebase'
import GitHubIcon from '@material-ui/icons/GitHub';
import { DirectChatListContext } from '../../Hooks/DirectChatList/DirectChatList';

const Settings = () => {
    const {currentUser,username,github} = useContext(UserContext)
    const [pending, setpending] = useState(false)
    const [password, setPassword] = useState("")
    const {auth,fire} = useContext(FireContext)
    const {isboton,changeboton} = useContext(DirectChatListContext)

    const deleteUser = () => {
        setpending(true);
        if(currentUser.isAnonymous){
            auth.signOut();
            alert("User Deleted!");
        }
        else{
            if(password !== ""){
                var credential = fire.auth.EmailAuthProvider.credential(currentUser.email, password);
                currentUser.reauthenticateWithCredential(credential).then(()=>{
                    currentUser.delete().then(()=>{
                        alert("User Deleted!");
                    }).catch((error)=>{
                        alert(error.message);
                        setpending(false);
                    });    
                }).catch((error)=>{
                    alert(error.message);
                    setpending(false);
                });
            }
            else{
                alert("Please input details");
                setpending(false);
            }
        }
    }
    
    return (
        <section className="config">
            <section className="configSect">
                <div className="profile">
                <p className="confTitle">Settings</p>
                
                <img alt="img" id="meimage2" className="meimage" src={currentUser.photoURL} ></img>
                
                <div className="side">
                <p className="name" id="dispname2">{currentUser.displayName}</p>
                <p className="name" id="usname2">@{username}</p>
                </div>
                
            </div>
            </section>
            
            <section className="configSect second">
                
                <p className="confTitle">Your Info</p>
                
                <div className="information">
                    <ul>
                        <li>Name: <span className="blue phone" id="dispname3">{currentUser.displayName}</span></li>
                        <li>Username: <span className="blue username" id="usname3">@{username}</span></li>
                        <li>Email: <span className="blue username" id="menuemail">{currentUser.email || username+"@natsapp.quest"}</span></li>
                        <li>Score: <span className="blue username" id="uscore">0</span></li>
                        <li>Current Role: <span className="blue username" id="urole">Beta Tester</span></li>
                        <li>Ranks: <span className="blue username" id="uranks">Visitor</span></li>
                        <li>Uid: <span className="blue username" id="Uid">{currentUser.uid}</span></li>
                        <li>Profile: <span className="blue" id="userlink">natsapp.now.sh/@{username}</span></li>
                        {github && <li>Github: <span className="blue" id="userlink">github.com/@{github}</span></li>}
                    </ul>
                </div>
                <div className="profile">
                <Link to="/ChangeProfile">
                    <button className="changePic" id="changeprofinfo">Edit Profile</button>
                </Link>
                </div>
            </section>

            <section className="configSect second">
                <p className="confTitle">Bots (Alpha)</p>
                
                <div className="optionWrapper deskNotif">
                    <input type="checkbox" onChange={changeboton} id="isboton" className="toggleTracer" checked={isboton} />

                    <label className="check deskNotif" htmlFor="isboton">
                        <div className="tracer"></div>
                    </label>
                    <p>Enable Bots</p>
                </div>
            </section>

            <section className="configSect second">
                <p className="confTitle">Notifications (Beta)</p>
                
                <div className="optionWrapper deskNotif">
                    <input type="checkbox" id="deskNotif" className="toggleTracer" defaultChecked />

                    <label className="check deskNotif" htmlFor="deskNotif">
                        <div className="tracer"></div>
                    </label>
                    <p>Enable Notifications</p>
                </div>
                
                <div className="optionWrapper showSName">
                    <input type="checkbox" id="showSName" className="toggleTracer" />

                    <label className="check" htmlFor="showSName">
                        <div className="tracer"></div>
                    </label>
                    <p>Show Sender Name</p>
                </div>
                
                <div className="optionWrapper showPreview">
                    <input type="checkbox" id="showPreview" className="toggleTracer" />

                    <label className="check" htmlFor="showPreview">
                        <div className="tracer"></div>
                    </label>
                    <p>Show Message Preview</p>
                </div>
                
                <div className="optionWrapper playSounds">
                    <input type="checkbox" id="playSounds" className="toggleTracer" />

                    <label className="check" htmlFor="playSounds">
                        <div className="tracer"></div>
                    </label>
                    <p>Play Sounds</p>
                </div>
            </section>

            <section className="configSect">
                <p className="confTitle">Invite Link (Add friends in a click)</p>
                <div className="profile">
                    <Link to="/GenerateLink">
                        <button className="edit" id="frlinkgenopbtn" style={{backgroundColor: "#0008ff",color: "#ffffff"}}>Invite Link</button>
                    </Link>
                </div>
            </section>

            {/* <section className="configSect">
                <p className="confTitle">Role Game (To increase your Score and Rank)</p>
                <div className="profile"><button className="edit" id="gamepre">Role Game</button></div>
            </section> */}

            {!github && <section className="configSect">
                <p className="confTitle">Link Account</p>
                
                <div className="linkbuttons">
                    <button onClick={()=>alert("Coming soon..")} style={{backgroundColor:"#000",borderColor:"#fff"}}>
                        <div className="linkbtn">
                            <GitHubIcon />
                            <span>Link with Github</span>
                        </div>
                    </button>
                    {/* <button style="background: ivory;border-color: #ffffff;color: red;">
                        <div className="linkbtn">
                            <i className="fa fa-google"></i>
                            <span>Sign in with Google</span>
                        </div>
                    </button>
                    <button style="background: #4154d9;border-color: #4154d9;">
                        <div className="linkbtn">
                            <i className="fa fa-facebook-official"></i>
                            <span>Sign in with Facebook</span>
                        </div>
                    </button>
                    <button style="background: #d94141;color: #ffffff;">
                        <div className="linkbtn">
                            <i className="fa fa-envelope"></i>
                            <span>Sign in with Email</span>
                        </div>
                    </button>
                    <button style="background: black;border-color: #f6f6f6;
                    color: white;">
                        <div className="linkbtn">
                            <i className="fa fa-apple"></i>
                            <span>Sign in with Apple</span>
                        </div>
                    </button>
                    <button style="background: #00acee;border-color: #00acee;">
                        <div className="linkbtn">
                            <i className="fa fa-twitter-square"></i>
                            <span>Sign in with Twitter</span>
                        </div>
                    </button>
                    <button style="background: #ffffff;border-color: #6d6d6d;
                    color: #da2424">
                        <div className="linkbtn">
                            <i className="fa fa-th-large"></i>
                            <span>Sign in with Microsoft</span>
                        </div>
                    </button>
                    <button style="background: #6e2bda;border-color: #6e2bda;">
                        <div className="linkbtn">
                            <i className="fa fa-yahoo"></i>
                            <span>Sign in with Yahoo</span>
                        </div>
                    </button>
                    <button style="background: #000000;border-color: #ffffff;
                    border-color: white;">
                        <div className="linkbtn">
                            <i className="fa fa-github-square"></i>
                            <span>Sign in with Github</span>
                        </div>
                    </button>
                    
                    
                    
                    <button style="background: #3dbb3b;border-color: #ffffff;">
                        <div className="linkbtn">
                            <i className="fa fa-phone-square"></i>
                            <span>link with Phone</span>
                        </div>
                    </button> */}
                </div>
            </section>
            }
            <section className="configSect">
                <p className="confTitle">Delete Account</p>
                <div className="profile">
                    {
                        !currentUser.isAnonymous && (<>
                            <h3 id="delcurrentpassh3">Enter Password To Delete Account</h3>
                            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="passdel" className="themeinput" id="delcurrentpassin" placeholder="Enter password.." />
                        </>)
                    }
                    {
                        !pending && (
                            <button className="deluser" id="deluserid" onClick={deleteUser}>Delete Account</button>
                        )
                    }
                </div>
            </section>
        </section>
    )
}

export default Settings
