import React from 'react'
import './TaskAttack.css'
import TaskHeader from './TaskHeader'
import Login from './TaskLogin';
import TaskDisplay from './TaskDisplay';
import UpdateUser from './UpdateUser';
import TaskLoad from './TaskLoad'

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
            selectedHour: null,
            updatingUser: false,
            currentTime: new Date(),
            isLoading: false,
        }
        this.timeUpdate = setInterval(() => {
            this.setState({ currentTime: new Date() })
        }, 1000)
    }

    componentDidMount() {
        this.setState({ isLoading: true }, () => {
            fetch('/attack')
            .then(res => res.json())
            .then(data => this.setState({ 
                ...data, 
                username: data.user && data.user.name 
            }))
            .then(() => {
                // const taskHourPadding = document.getElementsByClassName('taskHourPadding')[0]
                // !this.props.selectedTask && taskHourPadding.scrollIntoView()
                this.setState({ isLoading: false })
            })
        })
    }

    componentWillUnmount() {
        clearInterval(this.timeUpdate)
    }

    // CREATE
    _register = (newUser) => {
        this.setState({ isLoading: true }, () => {
            fetch('signup', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(user => this.setState({ user, username: user.name }))
            .then(() => this.setState({ isLoading: false }))
        })
    }

    _addTask = (newTask) => {
        this.setState({ isLoading: true }, () => {
            fetch('addTask', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
            .then(res => res.json())
            // will need to receive all tasks here
            .then(({tasks, newTask}) => this.setState({ tasks, selectedTask: newTask }))
            .then(() => this.setState({ isLoading: false }))
        })
    }

    // RETRIEVE
    _login = (loginAttempt) => {
        this.setState({ isLoading: true }, () => {
            fetch('login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginAttempt)
            })
            .then(res => res.json())
            .then(data => this.setState({ ...data, username: data.user.name }))
            .then(() => this.setState({ isLoading: false }))
        })
    }

    _selectUser = () => this.setState({ 
        updatingUser: !this.state.updatingUser,
        selectedTask: null
    })

    _selectTask = ({ selectedTask, selectedHour }) => {
        !this.state.selectedTask || this.state.selectedTask.id !== selectedTask.id ?
        this.setState({ selectedTask, selectedHour }, () => {
            const updateTaskForm = document.getElementById('UpdateTaskForm')
            updateTaskForm.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
        }) :
        this.setState({ selectedTask: null, selectedHour: null })
    }

    _goHome = () => this.setState({ updatingUser: false, selectedTask: null })

    // UPDATE
    _updateUsername = (username) => this.setState({ username })

    _updateUser = (updatedUser) => {
        this.setState({ isLoading: true }, () => {
            fetch('updateUser', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            })
            .then(res => res.json())
            .then(user => this.setState({ user, updatingUser: false }))
            .then(() => this.setState({ isLoading: false }))
        })
    }

    _updateTask = (updatedTask) => {
        this.setState({ isLoading: true}, () => {
            fetch(`updateTask/${updatedTask.id}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            })
            .then(res => res.json())
            // will need to receive all tasks here
            .then(tasks => this.setState({ 
                tasks,
                // selectedTask: null
            }))
            .then(() => this.setState({ isLoading: false }))
        })
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
        const { currentTime, isLoading } = this.state
        return (
            <div id='TaskAttack'>
                {isLoading && <TaskLoad />}
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
                    <Login login={this._login} register={this._register}/>) 
                || (
                    <div className='TaskAttack'
                        onClick={() => this.setState({ updatingUser: false })}
                    >
                        {this.state.updatingUser &&
                            <UpdateUser 
                                user={this.state.user} 
                                username={this.state.username}
                                updateUser={this._updateUser}
                                updateUsername={this._updateUsername}
                            />}
                        <TaskDisplay 
                            tasks={this.state.tasks} 
                            selectTask={this._selectTask}
                            selectedTask={this.state.selectedTask}
                            selectedHour={this.state.selectedHour}
                            updateTask={this._updateTask}
                            addTask={this._addTask}
                            deleteTask={this._deleteTask}
                            currentTime={currentTime}
                        />
                        <div className='TaskTime'>
                            <h1>
                                {`${currentTime.getHours() > 9 ?
                                currentTime.getHours() :
                                `0${currentTime.getHours()}`}`}
                            </h1>
                            {/* <h1> : </h1> */}
                            <h1>
                                {`${currentTime.getMinutes() > 9 ?
                                currentTime.getMinutes() :
                                `0${currentTime.getMinutes()}`}`}
                            </h1>
                            <h1>
                                {`${currentTime.getSeconds() > 9 ?
                                currentTime.getSeconds() :
                                `0${currentTime.getSeconds()}`}`}
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}