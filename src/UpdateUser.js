import React from 'react'

export default function UpdateUser({ user, updateUser }) {
    return (
        <form id='UpdateUserForm' className='modal-hidden' onSubmit={event => {
            event.preventDefault()
            updateUser({
                newName: event.target.newName.value,
                newPassword: event.target.newPassword.value,
                oldPassword: event.target.oldPassword.value
            })
        }}>
            <label name='newName'>new name
                <input type='text' name='newName' defaultValue={`${user.name}`}/>
            </label>
            <label name='newPassword'>new password
                <input type='password' name='newPassword' defaultValue={`${user.name}`}/>
            </label>
            <label name='oldPassword'>old password
                <input type='password' name='oldPassword' defaultValue={`${user.name}`} required/>
            </label>
            <input type='submit' value='update'/>
            <input type='reset' value='reset'/>
        </form>
    )
} 

export function toggleUserModal(logout=false) {
    const updateUserForm = document.getElementById('UpdateUserForm')
    // if form does not contain modal-hidden class or logging out
    !updateUserForm.classList.contains('modal-hidden') || logout ?
        // add the modal-hidden class
        updateUserForm.classList.add('modal-hidden') :
        // remove the modal hidden class
        updateUserForm.classList.remove('modal-hidden')
}