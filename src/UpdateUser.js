import React from 'react'

export default function UpdateUser({ user, updateUser }) {
    return (
        <form id='UpdateUserForm' onSubmit={event => {
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
            <div className='updateUserButtons'>
                <input type='submit' value='update'/>
                <input type='reset' value='reset'/>
            </div>
        </form>
    )
} 