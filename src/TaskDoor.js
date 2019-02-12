import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toggleUserModal } from './UpdateUser'

export default function TaskDoor({ isLoggedIn, logout }) {
    return (
        <div className='TaskDoor' onClick={() => {
            if (isLoggedIn) {
                toggleUserModal(logout)
                logout()
            }
        }}>
        {/* <FontAwesomeIcon id='closedDoorIcon' size='2x' icon={['fas', 'door-closed']}/> */}
        <FontAwesomeIcon id='openDoorIcon' size='2x' icon={['fas', 'door-open']}/>
    </div>
    )
}