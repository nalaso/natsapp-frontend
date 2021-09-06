import React, { createContext,useState ,useEffect, useContext} from 'react'
import { UserContext } from '../../components/AuthProvider/AuthProvider';
import { FireContext } from '../../Config/Firebase/Firebase';

export const RequestPendingContext = createContext();

const Pendings = props => {
    const {db} = useContext(FireContext)
    const {currentUser} = useContext(UserContext)
    const [requestssend, setrequestssend] = useState([])
    const [requestsreceived, setrequestsreceived] = useState([])

    useEffect(() => {
        db.ref("requests/"+currentUser.uid+"/frpendings/sent").on("child_added",(snapshot)=>{
            setrequestssend(oldArr=>(
                [...oldArr,
                    {
                        fruid:snapshot.key,
                        frname:snapshot.val().username
                    }
                ]
            ))
        });
        db.ref("requests/"+currentUser.uid+"/frpendings/received").on("child_added",(snapshot)=>{
            setrequestsreceived(oldArr=>(
                [...oldArr,
                    {
                        fruid:snapshot.key,
                        frname:snapshot.val().username
                    }
                ]
            ))
        });
    }, [])

    const removerequestreceived = (val) => {
        setrequestsreceived(requestsreceived.filter(request=>request.frname!==val));
    }

    const removerequestsend = (val) => {
        setrequestssend(requestssend.filter(request=>request.frname!==val));
    }

    return (
        <RequestPendingContext.Provider value={{requestssend,requestsreceived,removerequestreceived,removerequestsend}}>
            {props.children}
        </RequestPendingContext.Provider>
    )
}

export default Pendings
