import React from 'react'

export default function Login({ submitLogin }) {
    return (
        <form className='Login' onSubmit={event => {
            event.preventDefault()
            submitLogin(event.target.name.value, event.target.password.value)
        }}>
            <input type='text' name='name'/>
            <input type='password' name='password'/>
            <input type='submit'/>
        </form>
    )
}