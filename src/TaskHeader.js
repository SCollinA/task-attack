import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toggleUserModal } from './UpdateUser'

export default function TaskHeader({ isLoggedIn, logout }) {
    return (
        <div className='TaskHeader'>
            {isLoggedIn && (
                <div className='updateUserIcon' onClick={() => toggleUserModal()}>
                    {/* <FontAwesomeIcon id='closedDoorIcon' size='2x' icon={['fas', 'door-closed']}/> */}
                    <FontAwesomeIcon id='userIcon' size='2x' icon={['fas', 'user-astronaut']}/>
                </div>
            )}
            <h1>TaskAttack</h1>
            {isLoggedIn && (
                <div className='logoutDoor' onClick={() => {
                        toggleUserModal(logout)
                        logout()
                    }}>
                    {/* <FontAwesomeIcon id='closedDoorIcon' size='2x' icon={['fas', 'door-closed']}/> */}
                    <FontAwesomeIcon id='openDoorIcon' size='2x' icon={['fas', 'door-open']}/>
                </div>
            )}
        </div>
    )
}