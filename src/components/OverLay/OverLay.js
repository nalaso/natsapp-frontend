import React from 'react'
import { useHistory } from "react-router-dom"

const OverLay = () => {
    let history = useHistory();

    const handleoverlay = ()=>{
        history.push("/")
    }

    return (
        <section className="overlay" onClick={handleoverlay}>
            <div id="mobilecheck"></div>
        </section>
    )
}

export default OverLay
