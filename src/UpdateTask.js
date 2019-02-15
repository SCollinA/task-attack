import React from 'react'
import TaskDelete from './TaskDelete'
import TaskCancel from './TaskCancel'

export default function UpdateTask({ task, updateTaskForm, selectedTask, selectTask, updateTask, availableTimes, deleteTask }) {
    const availableHours = []
    const availableMinutesStart = []
    const availableMinutesEnd = []
    // loop through time of task adding to availability
    for (let i = task.start.hour; i <= task.end.hour; i++) {
        availableHours.includes(i) || availableHours.push(i)
        if (i === task.start.hour && task.start.hour === task.end.hour) {
            for (let j = task.start.minute; j <= task.end.minute; j++) {
                availableMinutesStart.includes(j) || availableMinutesStart.push(j)
                availableMinutesEnd.includes(j) || availableMinutesEnd.push(j)
            }
        } else if (i === task.start.hour) {
            for (let j = task.start.minute; j < 60; j++) {
                availableMinutesStart.includes(j) || availableMinutesStart.push(j)
            }
        } else if (i === task.end.hour) {
            for (let j = 0; j <= task.end.minute; j++) {
                availableMinutesEnd.includes(j) || availableMinutesEnd.push(j)
            }
        }
    }
    availableHours.sort((a, b) => a - b)
    availableMinutesEnd.sort((a, b) => a - b)
    availableMinutesStart.sort((a, b) => a - b)
    return (
        <div className='UpdateTaskContainer'>
            <form id='UpdateTaskForm' 
                onSubmit={event => {
                    event.preventDefault()
                    event.stopPropagation()
                    updateTask({
                        id: task.id,
                        name: event.target.name.value,
                        start: { 
                            hour: parseInt(event.target.startHour.value),
                            minute: parseInt(event.target.startMin.value) 
                        },
                        end: {
                            hour: parseInt(event.target.endHour.value),
                            minute: parseInt(event.target.endMin.value),
                        },
                        mandatory: event.target.mandatory.checked,
                        active: event.target.active.checked
                    })
                    selectTask({selectedTask, selectedHour: null})
                }}
                onReset={() => updateTaskForm(selectedTask)}
                onClick={event => event.stopPropagation()}
            >
                <label name='name'>task name
                    <input type='text' name='name' value={task.name} 
                        onChange={event => updateTaskForm({name: event.target.value})}
                    />
                </label>
                <div className='timeStart'>
                    <label name='startHour'>start hour
                        <select name='startHour' 
                            value={task.start.hour} 
                            onChange={event => {
                                updateTaskForm({ start: { hour: parseInt(event.target.value) }})
                            }}
                        >
                            {availableHours.filter(hour => hour < task.end.hour)
                            .map(hour => {
                                return (
                                    <option key={hour}
                                        value={hour}
                                    >
                                        {hour}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                    <label name='startMin'>start minutes
                        <select name='startMin' 
                            value={task.start.minute} 
                            onChange={event => updateTaskForm({ start: { minute: parseInt(event.target.value) }})}
                        >
                            {availableMinutesStart.map(minute => {
                                return (
                                    <option key={minute}
                                        value={minute}
                                    >
                                        {minute}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                </div>
                <div className='timeEnd'>
                    <label name='endHour'>end hour
                        <select name='endHour' 
                            value={task.end.hour}
                            onChange={event => updateTaskForm({ end: { hour: parseInt(event.target.value) }})}
                            >
                            {availableHours.filter(hour => hour > task.start.hour)
                            .map(hour => {
                                return (
                                    <option key={hour}
                                        value={hour}
                                    >
                                        {hour}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                    <label name='endMinutes'>end minutes
                        <select name='endMinutes' 
                            value={task.end.minute}
                            onChange={event => updateTaskForm({ end: {minute: parseInt(event.target.value) }})}
                        >
                            {availableMinutesEnd.map(minute => {
                                return (
                                    <option key={minute}
                                        value={minute}
                                    >
                                        {minute}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                </div>
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
            <div className='taskUpdateIcons'>
                <TaskDelete task={task} deleteTask={deleteTask}/>
                <TaskCancel task={selectedTask} 
                    selectTask={selectTask} 
                    updateTaskForm={updateTaskForm}
                />
            </div>
        </div>
    )
} 
