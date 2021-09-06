import React from 'react'
import ClearIcon from '@material-ui/icons/Clear';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const GroupAdmins = ({admin,mainadmin,tomember,removeuser}) => {
    const makedate = val => new Date(val).getDate()+"/"+new Date(val).getMonth()+"/"+new Date(val).getFullYear();
    return (
        <div className="reqtag" style={{width:"100%",backgroundColor:"#0D47A1",paddingLeft:"10px"}}>
            <VerifiedUserIcon style={{float:"left"}}/>
            {admin[0]} from {makedate(admin[1])}
            {
                mainadmin!==admin[0] && (<>
                    <button className="regtagbtn reject" onClick={()=>{removeuser(admin[0],"admins",admin[1])}}>
                        <ClearIcon />
                    </button>
                    <button className="regtagbtn reject" onClick={()=>{tomember(admin[0],admin[1])}}>
                        <ArrowDropDownIcon />
                    </button>
                </>)
            }
        </div>
    )
}

export default GroupAdmins