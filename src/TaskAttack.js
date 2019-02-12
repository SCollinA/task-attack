import React from 'react'
import './TaskAttack.css'
import TaskHeader from './TaskHeader'
import Login from './TaskLogin';
import TaskDisplay from './TaskDisplay';
import UpdateUser from './UpdateUser';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus, faUserAstronaut, faDoorClosed, faDoorOpen, faPlus, faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus, faUserAstronaut, faDoorClosed, faDoorOpen, faPlus, faTrashAlt, faBan)

export default class TaskAttack extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            username: '',
            tasks: [],
            selectedTask: null,
            updatingUser: false
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
        .then(user => this.setState({ user, username: user.name }))
    }

    _addTask = () => {
        const newTask = {
            name: 'new task', 
            timeStart: new Date().toLocaleTimeString(),
            timeEnd: new Date().toLocaleTimeString(),
            mandatory: false,
            active: false
        }
        fetch('addTask', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then(res => res.json())
        .then(task => this.setState({ tasks: [ ...this.state.tasks, task ], selectedTask: task}))
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
        .then(data => this.setState({ ...data, username: data.user.name }))
    }

    _selectUser = () => this.setState({ updatingUser: !this.state.updatingUser, selectedTask: null })

    _selectTask = (selectedTask) => {
        !this.state.selectedTask || this.state.selectedTask.id !== selectedTask.id ?
        this.setState({ selectedTask }) :
        this.setState({ selectedTask: null })
    }

    _goHome = () => this.setState({ updatingUser: false, selectedTask: null })

    // UPDATE
    _updateUsername = (username) => this.setState({ username })

    _updateUser = (updatedUser) => {
        fetch('updateUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(user => this.setState({ user, updatingUser: false }))
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
        .then(task => this.setState({ 
            tasks: [ 
                ...this.state.tasks.filter(oldTask => oldTask.id !== task.id),
                 task 
                ],
            selectedTask: null
        }))
    }

    // DELETE
    _deleteTask = (deletedTask) => {
        fetch(`deleteTask/${deletedTask.id}`, {
            method: 'delete'
        })
        .then(() => this.setState({ 
            tasks: this.state.tasks.filter(task => task.id !== deletedTask.id),
            selectedTask: null
         }))
    }

    _logout = () => {
        fetch('logout', { method: 'post' })
        .then(() => this.setState({ user: null, tasks: [], selectedTask: null, updatingUser: false }))
    }
    
    render() {
        const isLoggedIn = this.state.user && true
        return (
            <div id='TaskAttack'>
                <TaskHeader 
                    username={this.state.username}
                    isLoggedIn={isLoggedIn}
                    goHome={this._goHome}
                    selectUser={this._selectUser}
                    isUpdating={this.state.updatingUser}
                    logout={this._logout}
                />
                {/* show login form if not logged in */}
                {(!isLoggedIn && 
                    <Login login={this._submitLogin} register={this._register}/>) 
                || (
                    <div className='TaskAttack'>
                        {this.state.updatingUser ?
                            <UpdateUser 
                                user={this.state.user} 
                                username={this.state.username}
                                updateUser={this._updateUser}
                                updateUsername={this._updateUsername}
                            /> :
                            <TaskDisplay 
                                tasks={this.state.tasks} 
                                selectTask={this._selectTask}
                                selectedTask={this.state.selectedTask}
                                updateTask={this._updateTask}
                                addTask={this._addTask}
                                deleteTask={this._deleteTask}
                            />
                        }
                        {/* <TaskBar tasks={this.state.tasks} updateTask={this._updateTask}/> */}
                    </div>
                )}
            </div>
        )
    }
}