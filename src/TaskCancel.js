import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TaskCancel({ task, selectTask, updateTaskForm }) {
    return (
        <div className='TaskCancel' 
            onClick={event => {
                event.stopPropagation()
                updateTaskForm(task)
                selectTask({selectedTask: task, selectedHour: null})
            }}
        >
            <FontAwesomeIcon size='2x' icon={['fas', 'ban']}/>
        </div>
    )
}