import React from 'react'
import { useHistory } from 'react-router-dom';

const ToCreateGroup = () => {
    let history = useHistory();
    const handleroute = ()=>{
        history.push("/Groups/Create");
    }

    return (
        <section className="configSect">
            <div className="profile">
                <h3>Create New Group</h3>
                <button className="changePic crgr" onClick={handleroute}>Create Group</button>
            </div>
        </section>
    )
}

export default ToCreateGroup
