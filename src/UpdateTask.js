import React from 'react'
import TaskDelete from './TaskDelete'
import TaskCancel from './TaskCancel'

export default function UpdateTask({ task, selectTask, updateTask, deleteTask }) {
    return (
        <div className='UpdateTaskContainer'>
            <TaskDelete task={task} deleteTask={deleteTask}/>
            <form id='UpdateTaskForm' onSubmit={event => {
                event.preventDefault()
                updateTask({
                    id: task.id,
                    name: event.target.name.value,
                    timeStart: event.target.timeStart.value,
                    timeEnd: event.target.timeEnd.value,
                    mandatory: event.target.mandatory.checked,
                    active: event.target.active.checked
                })
            }}>
                <label name='name'>new name
                    <input type='text' name='name' defaultValue={`${task.name}`}/>
                </label>
                <label name='timeStart'>time start
                    <input type='time' name='timeStart' defaultValue={`${task.time_start}`}/>
                </label>
                <label name='timeEnd'>time end
                    <input type='time' name='timeEnd' defaultValue={`${task.time_end}`}/>
                </label>
                <label name='mandatory'>mandatory
                    <input type='checkbox' name='mandatory' defaultChecked={task.mandatory}/>
                </label>
                <label name='active'>active
                    <input type='checkbox' name='active' defaultChecked={task.active}/>
                </label>
                <input type='submit' value='update'/>
                <input type='reset' value='reset'/>
            </form>
            <TaskCancel task={task} selectTask={selectTask}/>
        </div>
    )
} 
