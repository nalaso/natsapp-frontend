import React, { useContext,useEffect,useState } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { FireContext } from '../../../Config/Firebase/Firebase';
import { UserContext } from '../../../components/AuthProvider/AuthProvider';
import GrReqSent from './GrReqSent';

const GroupsPending = () => {
    const {db} = useContext(FireContext)
    const {currentUser} = useContext(UserContext)
    const [requestssend, setrequestssend] = useState([])

    useEffect(() => {
        db.ref("requests/"+currentUser.uid+"/grpendings/sent").on("child_added",(snapshot)=>{
            let grid = snapshot.key;
            let type = snapshot.val().jointype;
            setrequestssend(oldArr=>(
                [...oldArr,{grid,type}]
            ))
        });
        db.ref("requests/"+currentUser.uid+"/grpendings/sent").on("child_removed",(snapshot)=>{
            let grid = snapshot.key;
            setrequestssend(requestssend.filter(request=>(request.grid!==grid)))
        });
        return () => {
            db.ref("requests/"+currentUser.uid+"/grpendings/sent").off();
            db.ref("requests/"+currentUser.uid+"/grpendings/sent").off();
            setrequestssend([]);
        }
    }, [])

    return (
        <section className="Grrec">

            <section className="configSect">
                        
                <p className="confTitle configtitle">
                    <Link to="/Groups/Add">
                        <button className="tbButton" id="backgrr1">
                            <ArrowBackIcon />
                        </button>
                    </Link>
                Group Request Sent
                </p>		
            </section>

            <section className="configSect">
                <p className="configTitle">Request Pending</p>
                <div className="reqbox" id="grreqsbx">
                    {
                        requestssend.map(request=>(
                            <GrReqSent request={request} uid={currentUser.uid} db={db}/>
                        ))
                    }
                </div>		
            </section>
            
        </section> 
    )
}

export default GroupsPending
