import React from 'react'
import './TaskAttack.css'
import TaskHeader, { toggleUserModal } from './TaskHeader'
import Login from './TaskLogin';
import TaskBar from './TaskBar';
import TaskDisplay from './TaskDisplay';
import UpdateUser from './UpdateUser';
import UpdateTask from './UpdateTask';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserAstronaut, faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
library.add(faUserAstronaut, faDoorClosed, faDoorOpen)

export default class TaskAttack extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            tasks: [],
            selectedTask: null
        }
    }

    // CREATE
    _register = (newUser) => {
        fetch('signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(user => this.setState({ user }))
    }

    _addTask = (newTask) => {
        fetch('addTask', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then(res => res.json())
        .then(task => this.setState({ tasks: [ ...this.state.tasks, task ]}))
    }

    // RETRIEVE
    _submitLogin = (loginAttempt) => {
        fetch('login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginAttempt)
        })
        .then(res => res.json())
        .then(data => this.setState({ ...data }))
    }

    // UPDATE
    _updateUser = (updatedUser) => {
        fetch('updateUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(user => this.setState({ user }, toggleUserModal()))
    }

    _updateTask = (updatedTask) => {
        fetch(`updateTask/${updatedTask.id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
        .then(res => res.json())
        .then(task => this.setState({ tasks: [ ...this.state.tasks.filter(oldTask => oldTask.id !== task.id), task ] }))
    }

    // DELETE
    _deleteTask = (deletedTask) => {
        fetch(`deleteTask/${deletedTask.id}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deletedTask.id)
        })
        .then(() => this.setState({ tasks: this.state.tasks.filter(task => task.id !== deletedTask.id) }))
    }

    _logout = () => {
        fetch('logout', { method: 'post' })
        .then(() => this.setState({ user: null, tasks: [] }))
    }
    
    render() {
        const isLoggedIn = this.state.user && true
        return (
            <div id='TaskAttack'>
                <TaskHeader isLoggedIn={isLoggedIn} updateUser={this._updateUser} logout={this._logout}/>
                {/* show login form if not logged in */}
                {(!isLoggedIn && <Login login={this._submitLogin} register={this._register}/>) || (
                    <div className='TaskAttack'>
                    <UpdateUser user={this.state.user} updateUser={this._updateUser} />
                    {this.state.selectedTask && <UpdateTask task={this.state.selectedTask} updateTask={this._updateTask} />}
                        <TaskDisplay tasks={this.state.tasks}/>
                        <TaskBar tasks={this.state.tasks} updateTask={this._updateTask}/>
                    </div>
                )}
            </div>
        )
    }
}