import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TaskDoor from './TaskDoor'

export default function TaskHeader({ username, isLoggedIn, goHome, selectUser, isUpdating, logout }) {
    return (
        <div className={`TaskHeader${isLoggedIn ? ' loggedInHeader' : ''}`}>
            {isLoggedIn && (
                <div className={`updateUserIcon${isUpdating ? ' updatingUser' : ''}`} 
                    onClick={selectUser}
                >
                    {/* <FontAwesomeIcon id='closedDoorIcon' size='2x' icon={['fas', 'door-closed']}/> */}
                    <FontAwesomeIcon id='userIcon' size='2x' icon={['fas', 'user-astronaut']}/>
                    <h6>{username}</h6>
                </div>
            )}
            <h1 onClick={isLoggedIn ? goHome : undefined}>task attack</h1>
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