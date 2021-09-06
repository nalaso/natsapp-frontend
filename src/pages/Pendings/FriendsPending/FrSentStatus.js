import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';

const FrSentStatus = ({status,uid,db,removerequeststatus}) => {

    const removerefsta = () => {
        removerequeststatus(status.frname);
        db.ref("requests/"+uid+"/frpendingsstatus/sent").child(status.fruid).remove();
    }

    return (
        <div className="reqtag">{status.frname} {status.frstatus} you
            <button className="regtagbtn reject" onClick={removerefsta}>
                <DeleteIcon />
            </button>
        </div>
    )
}

export default FrSentStatus
