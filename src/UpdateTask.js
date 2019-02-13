import React from 'react'
import TaskDelete from './TaskDelete'
import TaskCancel from './TaskCancel'

export default function UpdateTask({ task, updateTaskForm, selectedTask, selectTask, updateTask, deleteTask }) {
    let taskTimeStartString = task.time_start.map(number => {
        return number < 10 ?
        `0${number}` :
        number.toString()
    }).join(':')
    let taskTimeEndString = task.time_end.map(number => {
        return number < 10 ?
        `0${number}` :
        number.toString()
    }).join(':')
    return (
        <div className='UpdateTaskContainer'>
            <TaskDelete task={task} deleteTask={deleteTask}/>
            <form id='UpdateTaskForm' 
                onSubmit={event => {
                    event.preventDefault()
                    if (event.target.timeStart.value > event.target.timeEnd.value) {
                        window.alert('time end must be after time start')
                        updateTaskForm({time_start: event.target.timeEnd.value.split(':')})
                    } else {
                        updateTask({
                            id: task.id,
                            name: event.target.name.value,
                            timeStart: event.target.timeStart.value,
                            timeEnd: event.target.timeEnd.value,
                            mandatory: event.target.mandatory.checked,
                            active: event.target.active.checked
                        })
                    }
                }}
                onReset={() => updateTaskForm(selectedTask)}
            >
                <label name='name'>new name
                    <input type='text' name='name' value={task.name} onChange={event => updateTaskForm({name: event.target.value})}/>
                </label>
                <label name='timeStart'>time start
                    <input type='time' name='timeStart' 
                        value={taskTimeStartString} 
                        max={taskTimeEndString} 
                        onChange={event => {
                            event.target.value < event.target.form.timeEnd.value && 
                                updateTaskForm({
                                    time_start: event.target.value.split(':').map(number => parseInt(number))
                                })
                        }}
                    />
                </label>
                <label name='timeEnd'>time end
                    <input type='time' name='timeEnd' 
                        value={taskTimeEndString}
                        min={taskTimeStartString}
                        onChange={event => {
                            event.target.value > event.target.form.timeStart.value && 
                                updateTaskForm({
                                    time_end: event.target.value.split(':').map(number => parseInt(number))
                                })
                        }}
                    />
                </label>
                <div className='updateTaskChecks'>
                    <label name='mandatory'>mandatory
                        <input type='checkbox' name='mandatory' checked={task.mandatory} onChange={event => updateTaskForm({mandatory: event.target.checked})}/>
                    </label>
                    <label name='active'>active
                        <input type='checkbox' name='active' checked={task.active} onChange={event => updateTaskForm({active: event.target.checked})}/>
                    </label>
                </div>
                <div className='updateTaskButtons'>
                    <input type='reset' value='reset'/>
                    <input type='submit' value='update'/>
                </div>
            </form>
            <TaskCancel task={selectedTask} selectTask={selectTask} updateTaskForm={updateTaskForm}/>
        </div>
    )
} 
