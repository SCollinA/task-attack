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
            <label name='newPassword'>old password
                <input type='password' name='oldPassword' defaultValue={`${user.name}`} required/>
            </label>
            <input type='submit' value='update'/>
            <input type='reset' value='reset'/>
        </form>
    )
} 