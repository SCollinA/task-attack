import React from 'react'
import TaskCell from './TaskCell'
import TaskAdd from './TaskAdd';

export default function TaskDisplay({ tasks, selectTask, selectedTask, updateTask, addTask }) {
    return (
        <div className='TaskDisplay'>
            {tasks.map(task => (
                <TaskCell key={task.id}
                    task={task} 
                    selectTask={selectTask} 
                    selectedTask={selectedTask}
                    updateTask={updateTask}
                />
            ))}
            <TaskAdd addTask={addTask} />
        </div>
    )
}