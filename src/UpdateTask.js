import React from 'react'
import TaskDelete from './TaskDelete'
import TaskCancel from './TaskCancel'

export default function UpdateTask({ task, updateTaskForm, selectedTask, selectTask, updateTask, availableTimes, deleteTask }) {
    const {start, end} = findTaskAvailable(task, availableTimes)
    const { availableHours, availableMinutesStart, availableMinutesEnd } = findAvailability({start, end})
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
                            minute: parseInt(event.target.startMinute.value) 
                        },
                        end: {
                            hour: parseInt(event.target.endHour.value),
                            minute: parseInt(event.target.endMinute.value),
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
                    <label name='startMinute'>start minutes
                        <select name='startMinute' 
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
                    <label name='endMinute'>end minutes
                        <select name='endMinute' 
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

function findAvailability(task) {
    const availableHours = []
    const availableMinutesStart = []
    const availableMinutesEnd = []
    // loop through time of task adding to availability
    console.log(task)
    for (let i = task.start.hour; i <= task.end.hour; i++) {
        // add hour
        availableHours.push(i)
        // if availability starts and ends in same hour
        if (task.start.hour === task.end.hour) {
            // add all minutes in that availability
            for (let j = task.start.minute; j <= task.end.minute; j++) {
                // do not add minute if already present
                availableMinutesStart.includes(j) || availableMinutesStart.push(j)
                availableMinutesEnd.includes(j) || availableMinutesEnd.push(j)
            }
            // if availability starts this hour
        } else if (i === task.start.hour) {
            // add minutes starting at availability start
            for (let j = task.start.minute; j < 60; j++) {
                availableMinutesStart.includes(j) || availableMinutesStart.push(j)
            }
            // add 0 minute of next hour?
            // availableMinutesStart.includes(0) || availableMinutesStart.push(0)
            // if availability ends this hour
        } else if (i === task.end.hour) {
            // add minutes up to availability end
            for (let j = 0; j <= task.end.minute; j++) {
                availableMinutesEnd.includes(j) || availableMinutesEnd.push(j)
            }
        }
    }
    availableHours.sort((a, b) => a - b)
    availableMinutesEnd.sort((a, b) => a - b)
    availableMinutesStart.sort((a, b) => a - b)
    return { availableHours, availableMinutesStart, availableMinutesEnd }
}

function findTaskAvailable(task, availableTimes) {
    const taskAvailable = { ...task } // make copy of task
    const prevTask = { ...taskAvailable }
    do {
        prevTask.start = { ...taskAvailable.start }
        prevTask.end = { ...taskAvailable.end }
        // filter availableTime which time.end.hour === task.start.hour
        // for each time
        // if time.end.minute === task.start.minute
        // taskAvailable.start = time.start
        const availableStart = availableTimes.find(start => {
            return start.end.hour === taskAvailable.start.hour && 
            start.end.minute === taskAvailable.start.minute
        })
        taskAvailable.start = availableStart ? availableStart.start : taskAvailable.start
        // filter availableTime which time.start.hour === task.end.hour
        // for each time
        // if time.start.minute === task.end.minut
        // taskAvailable.end = time.end
        const availableEnd = availableTimes.find(end => {
            return (end.start.hour === taskAvailable.end.hour &&
            end.start.minute === taskAvailable.end.minute)
        })
        taskAvailable.end = availableEnd ? availableEnd.end : taskAvailable.end    
        // repeat until no availableTimes found
    } while (!(taskAvailable.start.hour === prevTask.start.hour && 
        taskAvailable.start.minute === prevTask.start.minute) && !(taskAvailable.end.hour === prevTask.end.hour && 
        taskAvailable.end.minute === prevTask.end.minute))
    console.log(taskAvailable)
    return taskAvailable
}