import React from 'react'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const Surprise = ({setSurpriseopen}) => {

    const openupdates = () => {
        var win = window.open("https://natsappupdates.web.app/", '_nalasky');
        win.focus();
    }

    return (
        <div className="surprisetag" data-username="news" data-dispname="news updates surprise" >
            <div style={{height:"50px"}}>
                <CancelOutlinedIcon onClick={()=>setSurpriseopen(false)} style={{cursor: "pointer",float:"right",color:"whitesmoke",marginRight:"10px"}}/>
            </div>
            <div className="linkbuttons">
            <h1 style={{}}>News and Updates</h1>
                <button style={{textAlign:"center",marginTop:"45px"}} onClick={openupdates} className="changePic">Click here</button>
            </div>
        </div>
    )
}

export default Surprise