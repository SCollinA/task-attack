import React from 'react'
import TaskCell from './TaskCell'

export default function TaskHour({ tasks, hour, selectTask, selectedTask, addTask, updateTask, timeIsTaken, deleteTask }) {
    const zoomLevel = 1
    return (
        <div className='taskHour'
            style={{
                height: `
                    ${zoomLevel * 100}px
                `
            }}
        >
            <div className='taskHourTime'>
                <h1>{hour > 9 ? hour : `0${hour}`}:00</h1>
            </div>
            {tasks.reverse().map(task => (
                <TaskCell key={task.id || 
                        Math.floor(Math.random() * Math.pow(tasks.length, 10))}
                    hour={hour}
                    task={task} 
                    selectTask={selectTask} 
                    selectedTask={selectedTask}
                    addTask={addTask}
                    updateTask={updateTask}
                    timeIsTaken={timeIsTaken}
                    deleteTask={deleteTask}
                />
            ))}
        </div>
    )
}