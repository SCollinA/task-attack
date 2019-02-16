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
        const availableTimes = [] // array to push found available times
        // free time task object
        const availableTask = {
            name: 'free time - click to add task',
            mandatory: false,
            active: true,
            free: true,
        }
        // if there are no tasks
        if (tasks.length === 0) {
            // push the whole day as free time
            availableTimes.push({ 
                ...availableTask,
                start: { hour: 0, minute: 0 },
                end: { hour: 23, minute: 59 },
            })
        } else { // if there are tasks
            // for each task
            for (let i = 0; i < tasks.length; i++) {
                // take the task
                const task = tasks[i]
                // if this is the first task
                if (i === 0) {
                    // if it starts after midnight
                    if (task.start.hour > 0 || task.start.minute > 0) {
                        availableTimes.push({
                            ...availableTask,
                            start: { hour: 0, minute: 0 },
                            // if the first task starts on the hour
                            end: task.start.minute === 0 ? 
                            { // availability ends the hour before
                                hour: task.start.hour - 1,
                                minute: 59,
                            } : { // else it ends the minute before
                                hour: task.start.hour,
                                minute: task.start.minute - 1,
                            },
                        })
                    }
                // if there is time before this task
                } else if (task.start.hour > tasks[i - 1].end.hour ||
                    task.start.minute > tasks[i - 1].end.minute + 1) {
                    // add the free time before this task
                    availableTimes.push({
                        ...availableTask,
                        // if prev task ends on 59
                        start: tasks[i - 1].end.minute === 59 ? 
                        { // advance to next hour
                            hour: tasks[i - 1].end.hour + 1,
                            minute: 0,
                        } : { // else just advance minute
                            hour: tasks[i - 1].end.hour,
                            minute: tasks[i - 1].end.minute + 1,
                        },
                        // if the first task starts on the hour
                        end: task.start.minute === 0 ? 
                        { // availability ends the hour before
                            hour: task.start.hour - 1,
                            minute: 59,
                        } : { // else it ends the minute before
                            hour: task.start.hour,
                            minute: task.start.minute - 1,
                        },
                    })
                } // if free time starts or ends day complete
                // if this was last task of day
                // if this task does not end at 23:59
                if (i === tasks.length - 1 && 
                    (task.end.hour < 23 || task.end.minute < 59)) {
                    // add remaining time in day
                    availableTimes.push({
                        ...availableTask,
                        // if prev task ends on 59
                        start: task.end.minute === 59 ? 
                            { // advance to next hour
                                hour: task.end.hour + 1,
                                minute: 0,
                            } : { // else just advance minute
                                hour: task.end.hour,
                                minute: task.end.minute + 1,
                            },
                            // last availability of day
                        end: { hour: 23, minute: 59 },
                    })
                }
            } // for each task loop complete
        } // if there are tasks complete
        // if available times is empty, the day is full
        availableTimes.length > 0 ?
        this.setState({ availableTimes, isFull: false }) :
        this.setState({ availableTimes, isFull: true })
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
                <div className='taskHoursCompleteWrapper'
                    style={{
                        background: `
                            linear-gradient(
                                to bottom,
                                transparent, 
                                ${
                                    100 - 
                                    ((((currentTime.getHours() * 60) + 
                                        currentTime.getMinutes()) 
                                        / (24 * 60)) 
                                    * 100)
                                }%, 
                                rgba(0, 0, 0, 0.5),
                                rgba(0, 0, 0, 0.75),
                                rgba(0, 0, 0, 1)
                            )
                        `
                    }}
                >
                    <div id='taskHourPadding'></div>
                    <h1>you are here</h1>
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