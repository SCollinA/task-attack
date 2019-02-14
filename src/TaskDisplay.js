import React from 'react'
import TaskHour from './TaskHour'
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
        this.setState({ 
            tasks: this.props.tasks,
         }, () => this.findAvailableTimes(this.props.tasks))
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
            active: true,
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
        const { tasks } = this.state
        const taskTime = getTaskTime(task)
        for (let i = 0; i < tasks.length; i++) {
            if (task.id === tasks[i].id) { continue }
            const otherTaskTime = getTaskTime(tasks[i])
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
                return true
            }
        }
        return false
    }

    render() {
        const { tasks, selectTask, selectedTask, selectedHour, updateTask, addTask, deleteTask } = this.props
        // combine tasks and available times for display
        const cells = [...tasks, ...this.state.availableTimes]
        const cellsSorted = cells.sort((taskA, taskB) => {
                                const taskAStart = getTaskTime(taskA).start
                                const taskBStart = getTaskTime(taskB).start
                                return taskBStart.hour - taskAStart.hour ||
                                taskBStart.minute - taskAStart.minute
                            })
        const taskHours = []
        cellsSorted.forEach(cell => {
            const hourStart = parseInt(cell.time_start.slice(0, 2))
            const hourEnd = parseInt(cell.time_end.slice(0, 2))
            const minuteEnd = parseInt(cell.time_end.slice(3, 5))
            for (let i = hourStart; i <= hourEnd; i++) {
                if (i !== hourEnd || minuteEnd) { // do not add task if ending 'on the hour'
                    taskHours[i] = taskHours[i] ? 
                    [...taskHours[i], cell] :
                    [cell]
                }
            }
        })
        const currentTime = new Date()
        return (
            <div className='TaskDisplayContainer'>
                <div className='TaskDisplay'>
                    {taskHours.map((tasks, hour) => (
                        <TaskHour key={hour} tasks={tasks} hour={hour}
                            selectTask={selectTask} 
                            selectedTask={selectedTask}
                            selectedHour={selectedHour}
                            addTask={addTask}
                            updateTask={updateTask}
                            timeIsTaken={this._timeIsTaken}
                            deleteTask={deleteTask}
                        />
                    )).reverse()}
                </div>
                <div className='taskHoursCompleteWrapper'>
                    <div className='taskHourPadding'></div>
                    <div className='taskHoursComplete'
                        style={{
                            height: `
                            ${(((currentTime.getHours() * 60) + 
                                    currentTime.getMinutes()) 
                                    / (24 * 60)) 
                                * 100}%
                            `,
                        }}
                        >
                        <h1>you are here</h1>
                    </div>
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