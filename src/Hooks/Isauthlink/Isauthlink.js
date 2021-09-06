import React, { useContext } from 'react'
import { UserContext } from '../../components/AuthProvider/AuthProvider'
import { Redirect } from "react-router-dom";

const Isauthlink = () => {
    const {unAuthlink} = useContext(UserContext)

    if(unAuthlink === "newuser"){
        return(<Redirect to="/" />)
    }else if(unAuthlink){
        return(<Redirect to={unAuthlink} />)
    }else{
        return(<></>)
    }
}

export default Isauthlink
