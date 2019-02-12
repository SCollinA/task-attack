import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TaskDoor from './TaskDoor';

export default function Login({ login, register }) {
    return (
        <form id='LoginForm'>
            <div className='userInputs'>
                <input type='text' name='name' placeholder='name'/>
                <input type='password' name='password' placeholder='password'/>
            </div>
            <div className='loginButtons'>
                <div className='registerButton'
                    onClick={() => {
                        const loginForm = document.getElementById('LoginForm')
                        register({ 
                            name: loginForm.name.value,
                            password: loginForm.password.value 
                        })
                    }}
                >
                    <FontAwesomeIcon size='2x' icon={['fas', 'user-plus']}/>
                    <h4>register</h4>
                </div>
                {/* <input type='button' value='register' id='registerButton'
                    onClick={event => register({ 
                        name: event.target.form.name.value,
                        password: event.target.form.password.value 
                    })}
                    style={{visibility: "hidden", position: "absolute"}}
                /> */}
                <div className='loginButton'
                    onClick={() => {
                        const loginForm = document.getElementById('LoginForm')
                        login({ 
                            name: loginForm.name.value,
                            password: loginForm.password.value
                        })
                    }}
                >
                    <TaskDoor/>
                    <h4>login</h4>
                </div>
                {/* <input type='submit' value='login' id='loginButton'
                    style={{visibility: "hidden", position: "absolute"}}
                /> */}
            </div>
        </form>
    )
}