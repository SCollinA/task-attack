import React from 'react'
import TaskHour from './TaskHour'

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
                // come back to first task for last task's comparison
                const prevTask = tasks[i + 1] || tasks[0]
                // if start hour is not prev end hour or start minute is not prev end minute
                if (task.start.hour !== prevTask.end.hour || 
                task.start.minute !== prevTask.end.minute) {
                    // if this was last task of day
                    if (task.start.hour < prevTask.end.hour ||
                        (task.start.hour === prevTask.end.hour &&
                            task.start.minute < prevTask.end.minute)) {
                        if (prevTask.end.hour < 23 || prevTask.end.minute < 59) {
                            availableTimes.push({
                                ...availableTask,
                                start: prevTask.end,
                                end: { hour: 23, minute: 59 },
                            })
                        }
                        if (task.start.hour > 0 || task.start.minute > 0) {
                            availableTimes.push({
                                ...availableTask,
                                start: { hour: 0, minute: 0 },
                                end: task.start,
                            })
                        }
                    } else {
                        availableTimes.push({
                            ...availableTask,
                            start: prevTask.end,
                            end: task.start,
                        })
                    }
                }
            }
        } else { 
            availableTimes.push({ 
                ...availableTask,
                start: { hour: 0, minute: 0 },
                end: { hour: 23, minute: 59 },
            })
        }
        (availableTimes.length > 0 ?
        this.setState({ availableTimes, isFull: false }) :
        this.setState({ availableTimes, isFull: true }))
    }

    _timeIsTaken = (task) => {
        const { tasks } = this.state
        for (let i = 0; i < tasks.length; i++) {
            const otherTask = tasks[i]
            // if task is task being checked
            if (task.id === otherTask.id) { continue }

            // if task start time occurs during other task time
            const startsAfterOtherTaskStarts = task.start.hour > otherTask.start.hour ||
                (task.start.hour === otherTask.start.hour &&
                    task.start.minute > otherTask.start.minute)
            const startsBeforeOtherTaskEnds = task.start.hour < otherTask.end.hour ||
                (task.start.hour === otherTask.end.hour &&
                    task.start.minute < otherTask.end.minute)
            const endsAfterOtherTaskStarts = task.end.hour > otherTask.start.hour ||
                (task.end.hour === otherTask.start.hour &&
                    task.end.minute > otherTask.start.minute)
            const endsBeforeOtherTaskEnds = task.end.hour < otherTask.end.hour ||
                (task.end.hour === otherTask.end.hour &&
                    task.end.minute < otherTask.end.minute)
            if ((startsAfterOtherTaskStarts && startsBeforeOtherTaskEnds) ||
            (endsAfterOtherTaskStarts && endsBeforeOtherTaskEnds)) {
                return true
            }
        }
        return false
    }

    render() {
        const { 
            tasks,
            selectTask, 
            selectedTask, 
            selectedHour, 
            updateTask, 
            addTask, 
            deleteTask,
            currentTime
        } = this.props
        // combine tasks and available times for display
        const cells = [...tasks, ...this.state.availableTimes]
        const cellsSorted = cells.sort((taskA, taskB) => {
                                return taskB.start.hour - taskA.start.hour ||
                                taskB.start.minute - taskA.start.minute
                            })
        const taskHours = []
        cellsSorted.forEach(cell => {
            for (let i = cell.start.hour; i <= cell.end.hour; i++) {
                if (i !== cell.end.hour || cell.end.minute) { // do not add task if ending 'on the hour'
                    taskHours[i] = taskHours[i] ? 
                    [...taskHours[i], cell] :
                    [cell]
                }
            }
        })
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
                            availableTimes={this.state.availableTimes}
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

export const timesHaveChanged = (tasks, oldTasks) => {
    if (tasks.length !== oldTasks.length) { return true }
    for (let i = 0; i < tasks.length; i++) {
        if ((tasks[i].start.hour !== oldTasks[i].start.hour ||
            tasks[i].start.minute !== oldTasks[i].start.minute) ||
        (tasks[i].end.hour !== oldTasks[i].end.hour ||
            tasks[i].end.minute !== oldTasks[i].end.minute)) {
            return true
        }
    }
    return false
}