import React from 'react'
import ClearIcon from '@material-ui/icons/Clear';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const GroupMembers = ({user,toadmin,removeuser}) => {
    const makedate = val => new Date(val).getDate()+"/"+new Date(val).getMonth()+"/"+new Date(val).getFullYear();
    return (
        <div className="reqtag" style={{width:"100%",backgroundColor:"#039be5"}}>
            {user[0]} from {makedate(user[1])}
            <button className="regtagbtn reject" onClick={()=>{removeuser(user[0],"users",user[1])}}>
                <ClearIcon />
            </button>
            <button className="regtagbtn accept" onClick={()=>{toadmin(user[0],user[1])}}>
                <ArrowDropUpIcon />
            </button>
        </div>
    )
}

export default GroupMembers
