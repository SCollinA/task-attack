import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TaskHeader({ isLoggedIn, logout }) {
    return (
        <div className='TaskHeader'>
            {isLoggedIn && (
                <div className='updateUserIcon' onClick={() => toggleModal()}>
                    {/* <FontAwesomeIcon id='closedDoorIcon' size='2x' icon={['fas', 'door-closed']}/> */}
                    <FontAwesomeIcon id='userIcon' size='2x' icon={['fas', 'user-astronaut']}/>
                </div>
            )}
            <h1>TaskAttack</h1>
            {isLoggedIn && (
                <div className='logoutDoor' onClick={() => {
                        toggleModal(logout)
                        logout()
                    }}>
                    {/* <FontAwesomeIcon id='closedDoorIcon' size='2x' icon={['fas', 'door-closed']}/> */}
                    <FontAwesomeIcon id='openDoorIcon' size='2x' icon={['fas', 'door-open']}/>
                </div>
            )}
        </div>
    )
}

function toggleModal(logout=false) {
    const updateUserForm = document.getElementById('UpdateUserForm')
    // if form does not contain modal-hidden class or logging out
    !updateUserForm.classList.contains('modal-hidden') || logout ?
        // add the modal-hidden class
        updateUserForm.classList.add('modal-hidden') :
        // remove the modal hidden class
        updateUserForm.classList.remove('modal-hidden')
}