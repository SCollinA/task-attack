import React from 'react'

export default function TaskDisplay({ tasks, selectTask, selectedTask, children }) {
    return (
        <div className='TaskDisplay'>
            {tasks.map((task, index) => (
                <div className='taskCell' key={index} >
                    <h4 onClick={() => selectTask(task)}>{task.name}</h4>
                    {(selectedTask && task.id === selectedTask.id) && children}
                </div>
            ))}
            
        </div>
    )
}