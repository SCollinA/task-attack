import React from 'react'

export default function UpdateTask({ task, updateTask }) {
    return (
        <form id='UpdateTaskForm' className='modal-hidden' onSubmit={event => {
            event.preventDefault()
            updateTask({})
        }}>
            <input type='text' name='name' defaultValue={`${task.name}`}/>
        </form>
    )
}