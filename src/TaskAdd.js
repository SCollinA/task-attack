import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TaskAdd({ addTask }) {
    return (
        <div className='TaskAdd' onClick={() => addTask()}>
            <FontAwesomeIcon size='1x' icon={['fas', 'plus']}/>
        </div>
    )
}