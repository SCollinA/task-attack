import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TaskDoor from './TaskDoor'

export default function TaskHeader({ username, isLoggedIn, selectUser, logout }) {
    return (
        <div className='TaskHeader'>
            {isLoggedIn && (
                <div className='updateUserIcon' onClick={selectUser}>
                    {/* <FontAwesomeIcon id='closedDoorIcon' size='2x' icon={['fas', 'door-closed']}/> */}
                    <FontAwesomeIcon id='userIcon' size='2x' icon={['fas', 'user-astronaut']}/>
                    <h6>{username}</h6>
                </div>
            )}
            <h1>TaskAttack</h1>
            {isLoggedIn && (
                <div className='logoutIcon'
                    onClick={() => isLoggedIn && logout()}
                >
                    <TaskDoor />
                    <h6>logout</h6>
                </div>
            )}
        </div>
    )
}