import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TaskCancel({ task, selectTask }) {
    return (
        <div className='TaskCancel' onClick={() => selectTask(task)}>
            <FontAwesomeIcon size='2x' icon={['fas', 'ban']}/>
        </div>
    )
}