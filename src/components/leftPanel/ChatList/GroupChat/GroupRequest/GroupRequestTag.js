import React from 'react'
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

const GroupRequestTag = ({request,accept,reject}) => {

    return (
        <div className="grinsidereq grreqrec">
            <div className="reqtag">{request.username} want to join
                <button className="regtagbtn reject" onClick={()=>{reject(request.uid)}}>
                    <ClearIcon />
                </button>
                <button className="regtagbtn accept" onClick={()=>{accept(request.uid)}}>
                    <DoneIcon />
                </button>
            </div>
        </div>
    )
}

export default GroupRequestTag
