import React from 'react'
import TaskDelete from './TaskDelete'
import TaskCancel from './TaskCancel'

export default function UpdateTask({ task, updateTaskForm, selectedTask, selectTask, updateTask, availableTimes, deleteTask }) {
    const availableHours = []
    const availableMinutesStart = []
    const availableMinutesEnd = []
    availableTimes.forEach(time => { // for each available time
        // for each hour of availability
        for (let i = time.start.hour; i <= time.end.hour; i++) {
            availableHours.push(i) // add that to available hours
            // if this hour is the selected hour, find the minutes for this hour
            if (i === task.start.hour) {
                // for each minute starting from available or 0 if this is not first hour of availability
                for (let j = i === time.start.hour ? time.start.minute : 0; j <= time.start.minute || j < 60; j++) {
                    availableMinutesStart.push(j)
                }
            } else if (i === task.end.hour) {
                // for each minute starting from available or 0 if this is not first hour of availability
                for (let j = 0; j < 60 || (i === time.end.hour && j <= time.end.minute); j++) {
                    availableMinutesEnd.push(j)
                }
            }
        }
    })
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
                            hour: event.target.startHour.value,
                            minute: event.target.startMin.value 
                        },
                        end: {
                            hour: event.target.endHour.value,
                            minute: event.target.endMin.value
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
                                console.log(event.target.value)
                                updateTaskForm({ start: { hour: event.target.value }})
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
                            onChange={event => updateTaskForm({ start: { minute: event.target.value }})}
                        >
                            {availableMinutesStart.filter(minute => minute <= task.end.minute)
                            .map(minute => {
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
                            onChange={event => updateTaskForm({ end: { hour: event.target.value }})}
                            >
                            {availableHours.filter(hour => hour >= task.start.hour)
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
                            onChange={event => updateTaskForm({ end: {minute: event.target.value }})}
                        >
                            {availableMinutesEnd.filter(minute => minute > task.start.minute)
                            .map(minute => {
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
