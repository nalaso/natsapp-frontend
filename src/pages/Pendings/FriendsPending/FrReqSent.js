import React from 'react'
import ClearIcon from '@material-ui/icons/Clear';

const FrReqSent = ({request,username,uid,db,removerequestsend}) => {

    const frcanl = () => {
        removerequestsend(request.frname);
        db.ref("requests/"+uid+"/frpendings/sent/"+request.fruid).remove();
        db.ref("requests/"+request.fruid+"/frpendings/received/"+uid).remove();
        db.ref("requests/"+request.fruid+"/frpendingsstatus/received").child(uid).set({
            frname:username,
            status:"cancelled"
        });
    }

    return (
        <div className="reqtag">{request.frname}
            <button className="regtagbtn reject" onClick={frcanl}>
                <ClearIcon />
            </button>
        </div>
    )
}

export default FrReqSent
