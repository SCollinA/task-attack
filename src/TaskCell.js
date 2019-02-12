import React from 'react'

export default function TaskCell({ task, selectTask, selectedTask, children }) {
    return (
        <div className='TaskCell'>
            <h4 onClick={() => selectTask(task)}>{task.name}</h4>
            {(selectedTask && task.id === selectedTask.id) && children}
        </div>
    )
}