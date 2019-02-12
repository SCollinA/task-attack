import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class TaskDoor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            doorOpen: false
        }
    }

    render() {
        return (
            <div className='TaskDoor' 
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