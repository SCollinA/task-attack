import React from 'react'
import UpdateTask from './UpdateTask';

export default function TaskCell({ task, selectTask, selectedTask, updateTask, deleteTask }) {
    const isSelected = selectedTask && selectedTask.id === task.id
    return (
        <div className={`TaskCell${isSelected ? ' selectedTask' : ''}`}>
            <h4 onClick={() => selectTask(task)}>{task.name}</h4>
            {(selectedTask && task.id === selectedTask.id) && 
                <UpdateTask 
                task={selectedTask} 
                selectTask={selectTask}
                updateTask={updateTask} 
                deleteTask={deleteTask}
            />}
        </div>
    )
}