import React, { useEffect, useState } from 'react'
import OverLay from '../../components/OverLay/OverLay'
import { useHistory, useLocation } from 'react-router-dom'
import ReqOverLay from '../../components/OverLay/ReqOverLay/ReqOverLay';

const PathListener = () => {
    let location = useLocation();
    let history = useHistory();
    const [isoverlay, setIsoverlay] = useState(false)
    const [isreqoverlay, setIsreqoverlay] = useState(false)

    useEffect(() => {
        if(location.pathname !== "/"){
            let path = location.pathname.split('/');
            setIsoverlay(true)
            if(path[2] === "Create" || path[2] === "Pendings"){
                setIsreqoverlay(true);
            }else if(path[1][0]=="@"){
                history.push("/user/"+path[1].substring(1)+"/details")
            }else{
                setIsreqoverlay(false);
            }
        }else{
            setIsoverlay(false)
            setIsreqoverlay(false)
        }
    }, [location.pathname])

    return(<>
        {
            isoverlay && (
                <OverLay />
            )
        }
        {
            isreqoverlay && (
                <ReqOverLay />
            )
        }
    </>)
}

export default PathListener
