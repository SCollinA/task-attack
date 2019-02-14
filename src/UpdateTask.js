import React from 'react'
import TaskDelete from './TaskDelete'
import TaskCancel from './TaskCancel'

export default function UpdateTask({ task, updateTaskForm, selectedTask, selectTask, updateTask, deleteTask }) {
    return (
        <div className='UpdateTaskContainer'>
            <div className='taskUpdateIcons'>
                <TaskDelete task={task} deleteTask={deleteTask}/>
                <TaskCancel task={selectedTask} 
                    selectTask={selectTask} 
                    updateTaskForm={updateTaskForm}
                />
            </div>
            <form id='UpdateTaskForm' 
                onSubmit={event => {
                    event.preventDefault()
                    event.stopPropagation()
                    updateTask({
                        id: task.id,
                        name: event.target.name.value,
                        time_start: event.target.time_start.value,
                        time_end: event.target.time_end.value,
                        mandatory: event.target.mandatory.checked,
                        active: event.target.active.checked
                    })
                    selectTask(selectedTask)
                }}
                onReset={() => updateTaskForm(selectedTask)}
                onClick={event => event.stopPropagation()}
            >
                <label name='name'>task name
                    <input type='text' name='name' value={task.name} 
                        onChange={event => updateTaskForm({name: event.target.value})}
                    />
                </label>
                <label name='time_start'>time start
                    <input type='time' name='time_start' 
                        value={task.time_start} 
                        max={task.time_end} 
                        onChange={event => updateTaskForm({ time_start: event.target.value })}
                    />
                </label>
                <label name='time_end'>time end
                    <input type='time' name='time_end' 
                        value={task.time_end}
                        min={task.time_start}
                        onChange={event => updateTaskForm({ time_end: event.target.value })}
                    />
                </label>
                <div className='updateTaskChecks'>
                    <label name='mandatory'>mandatory
                        <input type='checkbox' name='mandatory' 
                            checked={task.mandatory} 
                            onChange={event => updateTaskForm({mandatory: event.target.checked})}
                        />
                    </label>
                    <label name='active'>active
                        <input type='checkbox' name='active' 
                            checked={task.active} 
                            onChange={event => updateTaskForm({active: event.target.checked})}
                        />
                    </label>
                </div>
                <div className='updateTaskButtons'>
                    <input type='reset' value='reset'/>
                    <input type='submit' value='update'/>
                </div>
            </form>
        </div>
    )
} 
