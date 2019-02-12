import React from 'react'

export default function Login({ login, register }) {
    return (
        <form className='Login' onSubmit={event => {
            event.preventDefault()
            login({ name: event.target.name.value, password: event.target.password.value })
        }}>
            <input type='text' name='name'/>
            <input type='password' name='password'/>
            <input type='submit' value='login'/>
            <input type='button' value='register' onClick={event => register({ name: event.target.form.name.value, password: event.target.form.password.value })}/>
        </form>
    )
}