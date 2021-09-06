import React from 'react'
import { useHistory } from 'react-router-dom';

const GroupRequest = () => {
    let history = useHistory();
    const handleroute = ()=>{
        history.push("/Groups/Pendings");
    }

    return (
        <section className="configSect">
            <p className="confTitle">Group Requests</p>
            <div className="profile">
                {/* <button className="changePic reqgr" onclick="getgrreqs();">Requests Pending</button> */}
                <button className="changePic reqgr" onClick={handleroute}>Requests Pending</button>
            </div>
        </section>
    )
}

export default GroupRequest
