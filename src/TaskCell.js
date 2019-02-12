import React from 'react'
import UpdateTask from './UpdateTask';

export default function TaskCell({ task, selectTask, selectedTask, updateTask, deleteTask }) {
    const isSelected = selectedTask && selectedTask.id === task.id
    return (
        <div className='TaskCellWrapper'>
            <div className={`TaskCell${isSelected ? ' selectedTask' : ''}`} 
                onClick={() => selectTask(task)}
            >
                <h4 >{task.name}</h4>
            </div>
            {isSelected && 
                <UpdateTask 
                task={selectedTask} 
                selectTask={selectTask}
                updateTask={updateTask} 
                deleteTask={deleteTask}
                />}
        </div>
    )
}