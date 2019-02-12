import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toggleUserModal } from './UpdateUser'

export default class TaskDoor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            doorOpen: false
        }
    }

    render() {
        const { isLoggedIn, logout } = this.props
        return (
            <div className='TaskDoor' 
                onClick={() => {
                    if (isLoggedIn) {
                        toggleUserModal(logout)
                        logout()
                    }
                }} 
                onMouseEnter={() => this.setState({ doorOpen: true })}
                onMouseLeave={() => this.setState({ doorOpen: false})}
            >
                {this.state.doorOpen ?
                <FontAwesomeIcon id='openDoorIcon' size='2x' icon={['fas', 'door-open']}/> :
                <FontAwesomeIcon id='closedDoorIcon' size='2x' icon={['fas', 'door-closed']}/>}
            </div>
            )
    }
}