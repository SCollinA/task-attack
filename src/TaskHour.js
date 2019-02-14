import React from 'react'
import TaskCell from './TaskCell'
// import UpdateTask from './UpdateTask'

export default function TaskHour({ tasks, hour, selectTask, selectedTask, addTask, updateTask, timeIsTaken, deleteTask }) {
    const zoomLevel = 1
    return (
        <div className='taskHour'
            style={{
                minHeight: `
                    ${zoomLevel * 100}px
                `
            }}
        >
            <div className='taskHourTime'>
                <h1>{hour > 9 ? hour : `0${hour}`}:00</h1>
            </div>
            {tasks.reverse().map(task => {
                // const isSelected = selectedTask && selectedTask.id === task.id
                return (
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
                >
                {/* {isSelected && 
                    <UpdateTask 
                        task={task}
                        updateTaskForm={this._updateTaskForm}
                        selectedTask={selectedTask} 
                        selectTask={selectTask}
                        updateTask={updateTask} 
                        deleteTask={deleteTask}
                    />} */}
                </TaskCell>
                )
            })}
        </div>
    )
}