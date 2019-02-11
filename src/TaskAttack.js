import React from 'react'
import './TaskAttack.css'
import Login from './Login';

export default class TaskAttack extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            tasks: []
        }
    }

    _submitLogin = (name, password) => {
        fetch('/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        })
        .then(res => res.json())
        .then(data => {
                this.setState({ ...data })
        })
    }
    
    render() {
        const isLoggedIn = this.state.user && true
        return (
            <div id='TaskAttack'>
                {!isLoggedIn && <Login submitLogin={this._submitLogin}/>}
            </div>
        )
    }
}