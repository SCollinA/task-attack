import React from 'react'

export default function UpdateUser({ user, username, updateUser, updateUsername }) {
    return (
        <form id='UpdateUserForm' 
            onSubmit={event => {
                event.preventDefault()
                updateUser({
                    newName: event.target.newName.value,
                    newPassword: event.target.newPassword.value,
                    oldPassword: event.target.oldPassword.value
                })
            }}
            onReset={() => updateUsername(user.name)}
            onClick={event => event.stopPropagation()}
        >
            <label name='newName'>change name:
                <input type='text' name='newName' value={username} onChange={event => updateUsername(event.target.value)}/>
            </label>
            <label name='newPassword'>change password:
                <input type='password' name='newPassword' placeholder='new password'/>
            </label>
            <label name='oldPassword'>current password:
                <input type='password' name='oldPassword' placeholder='old password' required/>
            </label>
            <div className='updateUserButtons'>
                <input type='reset' value='reset'/>
                <input type='submit' value='update'/>
            </div>
        </form>
    )
} 