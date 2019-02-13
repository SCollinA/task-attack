import React from 'react'
import TaskCell from './TaskCell'
import { getTaskTime } from './TaskCell'

export default class TaskDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            isFull: false,
            availableTimes: [], // array of objects of start, end times
        }
    }

    componentDidMount() {
        this.setState({ tasks: this.props.tasks },
            () => this.findAvailableTimes(this.props.tasks))
    }

    componentDidUpdate() {
        timesHaveChanged(this.props.tasks, this.state.tasks) &&    
            this.setState({ tasks: this.props.tasks },
                () => this.findAvailableTimes(this.props.tasks))
    }

    findAvailableTimes(tasks) {
        const availableTimes = []
        const availableTask = {
            name: 'free time - click to add task',
            mandatory: false,
            active: false,
            free: true,
        }
        if (tasks.length !== 0) {
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i]
                const taskTimeStart = getTaskTime(task).start
                // come back to first task for last task's comparison
                const prevTask = tasks[i + 1] || tasks[0]
                const prevTaskTimeEnd = getTaskTime(prevTask).end
                // if start hour is not prev end hour or start minute is not prev end minute
                if (taskTimeStart.hour !== prevTaskTimeEnd.hour || 
                taskTimeStart.minute !== prevTaskTimeEnd.minute) {
                    // if this was last task of day
                    if (taskTimeStart.hour < prevTaskTimeEnd.hour ||
                        (taskTimeStart.hour === prevTaskTimeEnd.hour &&
                            taskTimeStart.minute < prevTaskTimeEnd.minute)) {
                        if (prevTaskTimeEnd.hour < 23 || prevTaskTimeEnd.minute < 59) {
                            availableTimes.push({
                                ...availableTask,
                                time_start: getTaskTimeString(prevTaskTimeEnd),
                                time_end: '23:59',
                            })
                        }
                        if (taskTimeStart.hour > 0 || taskTimeStart.minute > 0) {
                            availableTimes.push({
                                ...availableTask,
                                time_start: '00:00',
                                time_end: getTaskTimeString(taskTimeStart),
                            })
                        }
                    } else {
                        availableTimes.push({
                            ...availableTask,
                            time_start: getTaskTimeString(prevTaskTimeEnd),
                            time_end: getTaskTimeString(taskTimeStart),
                        })
                    }
                }
            }
        } else { 
            availableTimes.push({ 
                ...availableTask,
                time_start: '00:00',
                time_end: '00:00',
            })
        }
        (availableTimes.length > 0 ?
        this.setState({ availableTimes, isFull: false }) :
        this.setState({ availableTimes, isFull: true }))
    }

    _timeIsTaken = (task) => {
        console.log('checking time is taken')
        const { tasks } = this.state
        const taskTime = getTaskTime(task)
        for (let i = 0; i < tasks.length; i++) {
            if (task.id === tasks[i].id) { continue }
            const otherTaskTime = getTaskTime(tasks[i])
            console.log(taskTime, otherTaskTime)
            // if task start time occurs during other task time
            const startsAfterOtherTaskStarts = taskTime.start.hour > otherTaskTime.start.hour ||
                (taskTime.start.hour === otherTaskTime.start.hour &&
                    taskTime.start.minute > otherTaskTime.start.minute)
            const startsBeforeOtherTaskEnds = taskTime.start.hour < otherTaskTime.end.hour ||
            (taskTime.start.hour === otherTaskTime.end.hour &&
                taskTime.start.minute < otherTaskTime.end.minute)
            const endsAfterOtherTaskStarts = taskTime.end.hour > otherTaskTime.start.hour ||
            (taskTime.end.hour === otherTaskTime.start.hour &&
                taskTime.end.minute > otherTaskTime.start.minute)
            const endsBeforeOtherTaskEnds = taskTime.end.hour < otherTaskTime.end.hour ||
            (taskTime.end.hour === otherTaskTime.end.hour &&
                taskTime.end.minute < otherTaskTime.end.minute)
            if ((startsAfterOtherTaskStarts && startsBeforeOtherTaskEnds) ||
            (endsAfterOtherTaskStarts && endsBeforeOtherTaskEnds)) {
                console.log('time taken')
                return true
            }
        }
        console.log('time available')
        return false
    }

    render() {
        const { tasks, selectTask, selectedTask, updateTask, addTask, deleteTask } = this.props
        // combine tasks and available times for display
        const cells = [...tasks, ...this.state.availableTimes]
        return ( 
            <div className='TaskDisplayContainer'>
                <div className='TaskDisplay'>
                    {cells.sort((taskA, taskB) => {
                        const taskAStart = getTaskTime(taskA).start
                        const taskBStart = getTaskTime(taskB).start
                        return taskBStart.hour - taskAStart.hour ||
                        taskBStart.minute - taskAStart.minute
                    }).map(task => (
                        <TaskCell key={task.id || 
                                Math.floor(Math.random() * Math.pow(tasks.length, 10))}
                            task={task} 
                            selectTask={selectTask} 
                            selectedTask={selectedTask}
                            addTask={addTask}
                            updateTask={updateTask}
                            timeIsTaken={this._timeIsTaken}
                            deleteTask={deleteTask}
                        />
                    ))}
                </div>
                <div className='TaskHours'>
                <h1>-</h1>
                <h1>-</h1>
                <h1>-</h1>
                <h1>-</h1>
                <h1>-</h1>
                <h1>-</h1>
                <h1>-</h1>
                <h1>-</h1>
                <h1>-</h1>
                <h1>-</h1>
                <h1>-</h1>
                <h1>-</h1>
                <h1>-</h1>
                </div>
                <div className='taskHoursComplete'>
                </div>
            </div>
        )
    }
}

export const getTaskTimeString = (taskTime) => {
    const taskTimeArray = [taskTime.hour, taskTime.minute]
    return taskTimeArray.map(time => time > 9 ? `${time}` : `0${time}`).join(':')
}

export const timesHaveChanged = (tasks, oldTasks) => {
    if (tasks.length !== oldTasks.length) { return true }
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].time_start !== oldTasks[i].time_start ||
        tasks[i].time_end !== oldTasks[i].time_end) {
            return true
        }
    }
    return false
}