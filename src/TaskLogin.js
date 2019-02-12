import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TaskDoor from './TaskDoor';

export default function Login({ login, register }) {
    return (
        <form className='Login' onSubmit={event => {
            event.preventDefault()
            login({ name: event.target.name.value, password: event.target.password.value })
        }}>
            <input type='text' name='name'/>
            <input type='password' name='password'/>
            <div className='loginButtons'>
                <div className='registerButton'>
                    <FontAwesomeIcon size='2x' icon={['fas', 'user-plus']}
                        onClick={() => {
                            const registerButton = document.getElementById('registerButton')
                            registerButton.click()
                        }}
                    />
                    <h4>register</h4>
                </div>
                <input type='button' value='register' id='registerButton'
                    onClick={event => register({ 
                        name: event.target.form.name.value,
                        password: event.target.form.password.value 
                    })}
                    style={{visibility: "hidden", position: "absolute"}}
                />
                <div className='loginButton'>
                    <TaskDoor isLoggedIn={false} logout={() => null} 
                        onClick={() => {
                            const loginButton = document.getElementById('loginButton')
                            loginButton.click()
                        }}
                    />
                    <h4>login</h4>
                </div>
                <input type='submit' value='login' id='loginButton'
                    style={{visibility: "hidden", position: "absolute"}}
                />
            </div>
        </form>
    )
}