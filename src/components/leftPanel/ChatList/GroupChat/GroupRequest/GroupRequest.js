import React, { useContext, useEffect, useState } from 'react'
import { FireContext } from '../../../../../Config/Firebase/Firebase';
import GroupRequestTag from './GroupRequestTag';

const GroupRequest = ({grid}) => {
    const {db} = useContext(FireContext)
    const [requestlist, setRequestlist] = useState([])

    useEffect(() => {
        db.ref("grrequests/"+grid+"/received").on("child_added",(snapshot)=>{
            setRequestlist(oldlist=>(
                [...oldlist,{
                    uid:snapshot.key,
                    username:snapshot.val().username
                }]
            ))
        });
        db.ref("grrequests/"+grid+"/received").on("child_removed",(snapshot)=>{
            setRequestlist(requestlist.filter(request=>(request.uid!==snapshot.key)))
        });
        return () => {
            db.ref("grrequests/"+grid+"/received").off();
            db.ref("grrequests/"+grid+"/received").off();
            setRequestlist([])
        }
    }, [grid])

    const grrej = (useruid) => {
        db.ref("requests/"+useruid+"/grpendings/sent/"+grid).remove();
        db.ref("grrequests/" + grid + "/received/"+useruid).remove().then(()=>{
            alert("User rejected!");
        });
    }

    const gracc =  (useruid) => {
        db.ref("users/"+useruid+"/groups").child(grid).set({
            type : "active"
        }).then(()=>{
            db.ref("requests/"+useruid+"/grpendings/sent/"+grid).remove();
            db.ref("groups/"+grid+"/grprof").child("mem").transaction((mem)=>{
                return (mem || 0) + 1
            }).then(()=>{
                db.ref("grrequests/" + grid + "/received/"+useruid).remove().then(()=>{
                    alert("User added!");
                });
            })
        });
    }

    return (
        requestlist.map((request)=>(
            <GroupRequestTag key={request.uid} request={request} accept={gracc} reject={grrej}/>
        ))
    )
}

export default GroupRequest
