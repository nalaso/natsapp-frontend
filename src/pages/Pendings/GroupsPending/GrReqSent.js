import React from 'react'
import ClearIcon from '@material-ui/icons/Clear';

const GrReqSent = ({request,uid,db}) => {

    const grcanl = () => {
        db.ref("requests/"+uid+"/grpendings/sent/"+request.grid).remove();
        db.ref("grrequests/" + request.grid + "/received/"+uid).remove();
    }

    const openGrPassPanel = () => {

    }

    return (
        <div className="reqtag">
            <div className="req2t">
                <button className="regtagbtn reject" onClick={grcanl}>
                    <ClearIcon />
                </button>
                <h4 style={{marginTop: 0}}>{request.grid}</h4>
            </div>
            {
                request.type==="passtojoin" && (
                    <button className="tton" onClick={openGrPassPanel}>Know password?</button>
                )
            }
        </div>
    )
}

export default GrReqSent
