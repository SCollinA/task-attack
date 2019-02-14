import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TaskDelete({ task, deleteTask }) {
    return (
        <div className='TaskDelete' onClick={event => {
                event.stopPropagation()
                window.confirm('really delete this task, chief?') &&
                    deleteTask(task)
            }}
        >
            <FontAwesomeIcon size='2x' icon={['fas', 'trash-alt']}/>
        </div>
    )
}