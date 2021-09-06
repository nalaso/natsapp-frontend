import React, { useContext } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { FireContext } from '../../../../../Config/Firebase/Firebase';
import { DirectChatListContext } from '../../../../../Hooks/DirectChatList/DirectChatList';

const DeleteChatTag = ({props,myuid}) => {
    const {removedelfriend} = useContext(DirectChatListContext)
	const {db} = useContext(FireContext)

    const deletedeltag = () =>{
        removedelfriend(props.uid);
        db.ref("users/"+myuid+"/deletedfriends").child(props.username).remove();
    }

    return (
        <div className="chatdeltag" id={"deleted"+props.username}>
            <div className="pte">
                    <h4>{props.username} blocked you   : (</h4>
            </div>
            <div className="pbt">
                <button onClick={deletedeltag}>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    )
}

export default DeleteChatTag