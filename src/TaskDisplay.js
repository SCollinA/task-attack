import React from 'react'

export default function TaskDisplay({ tasks, selectTask, selectedTask, children }) {
    return (
        <div className='TaskDisplay'>
            {tasks.map((task, index) => (
                <div className='taskCell' key={index} onClick={() => selectTask(task)}>
                    <h4>{task.name}</h4>
                    {(selectedTask && task.id === selectedTask.id) && children}
                </div>
            ))}
        </div>
    )
}