import React, { useContext } from 'react'
import { ChatNotificationContext } from '../../../../../Hooks/ChatNotification/ChatNotification'
import RequestDetailsTag from './RequestDetailsTag'

const RequestDetails = () => {
    const {herenot} = useContext(ChatNotificationContext)

    return (
        herenot.map(el=>(
            <RequestDetailsTag key={el} el={el}/>
        ))
    )
}

export default RequestDetails