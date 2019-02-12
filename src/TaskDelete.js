import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TaskDelete({ task, deleteTask }) {
    return (
        <div className='TaskDelete' onClick={() => {
                window.confirm('really delete this task?') &&
                    deleteTask(task)
            }}
        >
            <FontAwesomeIcon size='2x' icon={['fas', 'trash-alt']}/>
        </div>
    )
}