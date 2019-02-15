import React from 'react'
import TaskCell from './TaskCell'

export default function TaskHour({ tasks, hour, selectTask, selectedTask, selectedHour, addTask, updateTask, availableTimes, timeIsTaken, deleteTask }) {
    return (
        <div className='taskHour'>
            <div className='taskHourTime'>
                <h1>{hour > 9 ? hour : `0${hour}`}:00</h1>
            </div>
            {tasks.reverse().map(task => {
                return (
                    <TaskCell key={parseInt(`${task.start.hour}${task.start.minute}`)}
                        hour={hour}
                        task={task} 
                        selectTask={selectTask} 
                        selectedTask={selectedTask}
                        selectedHour={selectedHour}
                        addTask={addTask}
                        updateTask={updateTask}
                        availableTimes={availableTimes}
                        timeIsTaken={timeIsTaken}
                        deleteTask={deleteTask}
                    />
                )
            })}
        </div>
    )
}