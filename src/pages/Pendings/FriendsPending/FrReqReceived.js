import React from 'react'
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

const FrReqReceived = ({request,username,uid,db,removerequestreceived}) => {

    const fracc = () => {
        remofrpen();
        setstatus("accepted"); 
        db.ref("users/"+uid+"/friends").child(request.fruid).set({
            type : "active"
        });
        db.ref("users/"+request.fruid+"/friends").child(uid).set({
            type : "active"
        }); 
    }

    const frrej = () => {
        remofrpen();
        setstatus("rejected");
    }

    const setstatus = (val) => {
        db.ref("requests/"+request.fruid+"/frpendingsstatus/sent").child(uid).set({
            frname:username,
            status:val
        });
    }

    const remofrpen = () => {
        removerequestreceived(request.frname)
        db.ref("requests/"+uid+"/frpendings/received/"+request.fruid).remove();
        db.ref("requests/"+request.fruid+"/frpendings/sent/"+uid).remove();
    }

    return (
        <div className="reqtag">{request.frname}
            <button className="regtagbtn reject" onClick={frrej}>
                <ClearIcon />
            </button>
            <button className="regtagbtn accept" onClick={fracc}>
                <DoneIcon />
            </button>
        </div>
    )
}

export default FrReqReceived
