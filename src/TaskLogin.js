import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login({ login, register }) {
    return (
        <form className='Login' onSubmit={event => {
            event.preventDefault()
            login({ name: event.target.name.value, password: event.target.password.value })
        }}>
            <input type='text' name='name'/>
            <input type='password' name='password'/>
            <input type='submit' value='login'/>
            <FontAwesomeIcon size='3x' icon={['fas', 'user-plus']}
                onClick={() => {
                    const registerButton = document.getElementById('registerButton')
                    registerButton.click()
                }}
            />
            <input type='button' value='register' id='registerButton'
                onClick={event => register({ 
                    name: event.target.form.name.value,
                    password: event.target.form.password.value 
                })}
                style={{visibility: "hidden", position: "absolute"}}
            />
        </form>
    )
}