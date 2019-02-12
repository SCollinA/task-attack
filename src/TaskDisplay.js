import React from 'react'
import TaskCell from './TaskCell'

export default function TaskDisplay({ tasks, selectTask, selectedTask, children }) {
    return (
        <div className='TaskDisplay'>
            {tasks.map(task => (
                <TaskCell key={task.id}
                    task={task} 
                    selectTask={selectTask} 
                    selectedTask={selectedTask}
                >
                    {children}
                </TaskCell>
            ))}
        </div>
    )
}