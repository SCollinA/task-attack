import React from 'react'
import TaskDelete from './TaskDelete'
import TaskCancel from './TaskCancel'

export default function UpdateTask({ task, updateTaskForm, selectedTask, selectTask, updateTask, deleteTask }) {
    return (
        <div className='UpdateTaskContainer'>
            <TaskDelete task={task} deleteTask={deleteTask}/>
            <form id='UpdateTaskForm' 
                onSubmit={event => {
                    event.preventDefault()
                    if (event.target.timeStart.value > event.target.timeEnd.value) {
                        window.alert('time end must be after time start')
                        updateTaskForm({time_start: event.target.timeEnd.value})
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
                        value={task.time_start} 
                        max={task.time_end} 
                        onChange={event => event.target.value < event.target.form.timeEnd.value && updateTaskForm({time_start: event.target.value})}
                    />
                </label>
                <label name='timeEnd'>time end
                    <input type='time' name='timeEnd' 
                        value={task.time_end}
                        min={task.time_start}
                        onChange={event => event.target.value > event.target.form.timeStart.value && updateTaskForm({time_end: event.target.value})}
                    />
                </label>
                <div className='updateTaskChecks'>
                    <label name='mandatory'>mandatory
                        <input type='checkbox' name='mandatory' defaultChecked={task.mandatory}/>
                    </label>
                    <label name='active'>active
                        <input type='checkbox' name='active' defaultChecked={task.active}/>
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
