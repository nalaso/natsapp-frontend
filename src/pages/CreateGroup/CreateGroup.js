import React, { useState,useContext, useEffect } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link, useHistory } from 'react-router-dom';
import IdPassLay from '../../components/OverLay/IdPassLay/IdPassLay';
import { FireContext } from '../../Config/Firebase/Firebase';
import { UserContext } from '../../components/AuthProvider/AuthProvider';

const CreateGroup = () => {
    let history = useHistory();
    const [ispasstojoin, setIspasstojoin] = useState(false)
    const {currentUser,username} = useContext(UserContext)
    const {db,fire} = useContext(FireContext)
    const [jointype, setjointype] = useState("open")
    const [grname, setGrname] = useState("")
    const [grpass, setGrpass] = useState("")
    const [grid, setGrid] = useState("")
    const [toid, setToid] = useState(false)
    const [gridready, setGridready] = useState(false)
    const [error, setError] = useState("Groupid")

    useEffect(() => {
        if(grid===""){
            setError("Enter a valid group id");
        }
    }, [error])

    const changejointype = (e) => {
        setjointype(e.target.value);
        if(e.target.value === "passtojoin"){
            setIspasstojoin(true)
        }else{
            setIspasstojoin(false)
        }
    }

    const Togrid = () => {
        if((grname !== "") && (((jointype === "passtojoin") && (grpass !== "")) || (jointype !== "passtojoin"))){
            setToid(preval=>!preval)
        }
    }

    async function getid(val) {
        let idrec;
        await db.ref("groupsname/"+val).once("value",(snap)=>{
            idrec = snap.val()
        });
        return idrec
    }

    const checkusernamelocal = async(val) =>{
        setGridready(false);
        if(val===""){
            setError("Enter group id");
        }
        else if(!isNaN(parseInt(val))){
          setError("Should not start with number");
          setGridready(false);
        }
        else if(val.indexOf(' ') >= 0){
          setError("Should not contain space");
          setGridready(false);
        }
        else if(val.length<=4){
            setError("Should be more than 4 character");
            setGridready(false);
        }
        else if(val.indexOf("natsapp")>= 0){
          setError("Should not contain natsapp");
          setGridready(false);
        }
        else{
            getid(val).then((data) => {
                if(data){
                    setError(val+" is in use!");
                    setGridready(false);
                }else{
                    setError(val+" is available");
                    setGridready(true);
                }
            })
        }
    }

    const gridHandler = (event) =>{
        event.target.value = event.target.value.toLowerCase()
        setGrid(event.target.value)
        checkusernamelocal(event.target.value)
    }

    const checkready = (event) =>{
        event.preventDefault();
        if(gridready){
            submitGroup();
        }
        else{
            setError("Enter a valid group id");
        }
    }

    const submitGroup = () => {
        db.ref("groupsname").child(grid).set({
            grname: grname,
            jointype:jointype
        }).then(()=>{
            db.ref("groups/"+grid+"/grprof").set({
                createdate:fire.database.ServerValue.TIMESTAMP,
                createdby: username,
                users:{
                    admins:{
                        [username]:fire.database.ServerValue.TIMESTAMP
                    }
                },
                grid: grid,
                grname: grname,
                mem : 1,
                pass: grpass,
                jointype:jointype,
                status:true
            }).then(()=>{
                db.ref("users/"+currentUser.uid+"/groups").child(grid).set({
                    name : grname,
                    type:"active"
                }).then(()=>{
                    alert("Group Created!")
                    history.push("/")
                });
            });
        })
    }

    return (<>
        <section className="Grcr">

                <section className="configSect">     
                    <p className="confTitle configtitle">
                        <Link to="/Groups/Add">
                            <button className="tbButton" id="backfrr">
                                <ArrowBackIcon />
                            </button>
                        </Link>
                    Create Group</p>
                </section>

                <section className="configSect">
                    <div className="profile">
                        <h3>Enter Group display name</h3>
                        <div className="mid">
                        <input value={grname} onChange={(e)=>{setGrname(e.target.value)}} id="grnamein" type="text" className="themeinput" placeholder="Enter group name.." />
                        </div>
                    </div>	
                    <br />
                    <div className="profile">
                        <h3>Enter Group joining type</h3>
                        <div className="mid">
                            <input type="radio" id="open"  name="grouptype" value="open" checked={jointype==="open"} onChange={changejointype}/>
                                <label htmlFor="open">open</label><br />
                            <input type="radio" id="passtojoin"  name="grouptype" value="passtojoin" checked={jointype==="passtojoin"} onChange={changejointype} />
                                <label htmlFor="passtojoin">passtojoin</label><br />
                            <input type="radio" id="reqtojoin" name="grouptype" value="reqtojoin" checked={jointype==="reqtojoin"} onChange={changejointype} />
                                <label htmlFor="reqtojoin">reqtojoin</label><br />
                            <input type="radio" id="closed"  name="grouptype" value="closed" checked={jointype==="closed"} onChange={changejointype} />
                                <label htmlFor="closed">closed</label>
                        </div>
                    </div>
                    <br />
                    {
                        ispasstojoin?(
                            <div className="profile">
                                <h3>Enter Group password</h3>
                                <div className="mid">
                                <input value={grpass} onChange={(e)=>{setGrpass(e.target.value)}}  id="grpassin" type="text" className="themeinput" placeholder="Enter group pass.." />
                                </div>
                            </div>
                        ):(
                            <div></div>
                        )
                    }
                    <br />
                    <div className="profile">
                        <button className="changePic" onClick={Togrid}>Create Group</button>
                    </div>
                </section>
            
            </section>
            {toid?(<>
                <IdPassLay />
                    <section className="Grcridck">
                        <section className="configSect">
                            <p className="confTitle configtitle">
                                <button className="tbButton" id="backfrr" onClick={()=>{setToid(preval=>!preval)}}>
                                    <ArrowBackIcon />
                                </button>
                            Group id</p>		
                        </section>

                        <section className="configSect">
                            <div className="profile">
                                <div className="mid">
                                <p className="confTitle" id="result">{error}</p>	
                                <input value={grid} onChange={event=>gridHandler(event)} id="gridin" type="text" className="themeinput" placeholder="Enter group id.." />
                                </div>
                            </div>
                            <div className="profile">
                                <button className="changePic" onClick={checkready}>Continue</button>
                            </div>
                        </section>
                    </section> 
            </>):(
                <div></div>
        )}
         
    </>)
}

export default CreateGroup
