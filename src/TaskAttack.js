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
        this.autoScroll = setInterval(() => {
            const taskHourPadding = document.getElementsByClassName('taskHourPadding')[0]
            !this.props.selectedTask && taskHourPadding.scrollIntoView()
        }, 30 * 1000)  // 30 seconds
    }

    componentDidMount() {
        fetch('/attack')
        .then(res => res.json())
        .then(data => this.scrubData({ ...data, username: data.user && data.user.name }))
    }

    componentWillUnmount() {
        clearInterval(this.autoScroll)
    }

    scrubData(data) {
        this.setState({
            ...data,
            // tasks: data.tasks ? data.tasks.map(task => {
            //     return {
            //         ...task,
            //         time_start: task.time_start
            //             .split(':')
            //             .map(number => parseInt(number))
            //             .slice(0, 2),
            //         time_end: task.time_end
            //             .split(':')
            //             .map(number => parseInt(number))
            //             .slice(0, 2),
            //     }
            // }) : this.state.tasks
        })
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

    _addTask = (newTask) => {
        fetch('addTask', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then(res => res.json())
        // will need to receive all tasks here
        .then(tasks => this.scrubData({ tasks, selectedTask: tasks.find(task => task.name === 'new task') }))
    }

    // RETRIEVE
    _login = (loginAttempt) => {
        fetch('login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginAttempt)
        })
        .then(res => res.json())
        .then(data => this.scrubData({ ...data, username: data.user.name }))
    }

    _selectUser = () => this.setState({ 
        updatingUser: !this.state.updatingUser,
        selectedTask: null
    })

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
        // will need to receive all tasks here
        .then(tasks => this.scrubData({ 
            tasks,
            // selectedTask: null
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
                    <Login login={this._login} register={this._register}/>) 
                || (
                    <div className='TaskAttack'
                        onClick={() => this.setState({ updatingUser: false })}
                        onScroll={() => { // reset auto scroll after user scrolls
                            clearInterval(this.autoScroll)
                            this.autoScroll = setInterval(() => {
                                const taskHourPadding = document.getElementsByClassName('taskHourPadding')[0]
                                !this.props.selectedTask && taskHourPadding.scrollIntoView()
                            }, 30 * 1000)  // 30 seconds
                        }}
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
                            updateTask={this._updateTask}
                            addTask={this._addTask}
                            deleteTask={this._deleteTask}
                        />
                    </div>
                )}
            </div>
        )
    }
}