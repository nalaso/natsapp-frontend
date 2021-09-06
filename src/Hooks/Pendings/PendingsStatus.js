import React, { createContext, useContext,useEffect,useState } from 'react'
import { UserContext } from '../../components/AuthProvider/AuthProvider'
import { FireContext } from '../../Config/Firebase/Firebase'
import { RequestPendingContext } from './Pendings';

export const PendingStatusContext = createContext();

const PendingsStatus = props => {
    const {db} = useContext(FireContext)
    const {currentUser} = useContext(UserContext)
    const {removerequestsend,removerequestreceived} = useContext(RequestPendingContext)
    const [requestssendstatus, setrequestssendstatus] = useState([])

    useEffect(() => {
        db.ref("requests/"+currentUser.uid+"/frpendingsstatus/sent").on("child_added",(snapshot)=>{
            let val = snapshot.val().frname;
            removerequestsend(val);
            setrequestssendstatus(oldArr=>(
                [...oldArr,
                    {
                        fruid:snapshot.key,
                        frname:snapshot.val().frname,
                        frstatus:snapshot.val().status
                    }
                ]
            ))
        });
        db.ref("requests/"+currentUser.uid+"/frpendingsstatus/received").on("child_added",(snapshot)=>{
            removerequestreceived(snapshot.val().frname);
        });
        return () => {
            db.ref("requests/"+currentUser.uid+"/frpendingsstatus/sent").off();
            db.ref("requests/"+currentUser.uid+"/frpendingsstatus/received").off();
        }
    }, [])

    const removerequeststatus = (val) => {
        setrequestssendstatus(requestssendstatus.filter(request=>request.frname!==val));
    }

    return (
        <PendingStatusContext.Provider value={{requestssendstatus,removerequeststatus}}>
            {props.children}
        </PendingStatusContext.Provider>
    )
}

export default PendingsStatus
