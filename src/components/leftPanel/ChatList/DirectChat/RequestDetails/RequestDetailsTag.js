import React from 'react'
import { useHistory } from 'react-router-dom'

const RequestDetailsTag = ({el}) => {
    let history = useHistory();

    const redirect = () => {
        history.push("/Friends/Pendings");
    }

    return (
        <div onClick={redirect} className="chatdeltag" id={"deleted"+el.username}>
            <div className="pte">
                    <h4>{el.username} {el.message}</h4>
            </div>
            {/* <div className="pbt">
                <button onClick={deletedeltag}>
                    <DeleteIcon />
                </button>
            </div> */}
        </div>
    )
}

export default RequestDetailsTag
