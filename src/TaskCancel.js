import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TaskCancel({ task, selectTask, updateTaskForm }) {
    return (
        <div className='TaskCancel' 
            onClick={() => {
                updateTaskForm(task)
                selectTask(task)
            }}
        >
            <FontAwesomeIcon size='2x' icon={['fas', 'ban']}/>
        </div>
    )
}