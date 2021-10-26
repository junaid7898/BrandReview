import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { statusAction } from '../../Redux/statusSlice'

function Notification() {
    const {notification} = useSelector(state => state.status)
    const firstRender = useRef(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if(firstRender.current){
            setTimeout(() => {
                dispatch(statusAction.removeNotification())
              }, 5000);
        }
        firstRender.current = true
    }, [notification])

    return (
        !!notification ?
        notification.show ?
                <div className="notification-container" style={{backgroundColor: notification.color}}>
                    <div className="notification">
                        <p>{notification.message}</p>
                    </div>
                </div>
                :
                    null
            :
                null
    )
}

export default Notification
