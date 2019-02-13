import React from 'react'
import TaskCell from './TaskCell'
import TaskAdd from './TaskAdd'
import { getTaskTime } from './TaskCell'

export default class TaskDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFull: false,
            availableTimes: [], // array of arrays of [start, end] times
        }
    }

    componentDidMount() {
        // !this.state.isFull && this.state.availableTimes.length === 0 &&
        this.findAvailableTimes(this.props.tasks)
    }

    componentDidUpdate() {
        // timesHaveChanged(this.props.tasks, this.state.availableTimes) &&    
        // this.findAvailableTimes(this.props.tasks)
    }

    findAvailableTimes(tasks) {
        console.log('finding available times')
        const availableTimes = []
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i]
            const taskTimeEnd = getTaskTime(task).end
            // come back to first task for last task's comparison
            const nextTask = tasks[i + 1] || tasks[0]
            const nextTaskTimeStart = getTaskTime(nextTask).start
            console.log(taskTimeEnd, nextTaskTimeStart)
            if (taskTimesDoNotOverlap(taskTimeEnd, nextTaskTimeStart) || 
            tasks.length === 1) {
                console.log('found available time')
                availableTimes.push({
                    time_start: `${taskTimeEnd.hour}:${taskTimeEnd.minute}`,
                    time_end: `${nextTaskTimeStart.hour}:${nextTaskTimeStart.minute}`
                })
            }
        }
        // timesHaveChanged(availableTimes, this.state.availableTimes) &&
            (availableTimes.length > 0 ?
            this.setState({ availableTimes, isFull: false }) :
            this.setState({ availableTimes, isFull: true }))
    }

    render() {
        const { tasks, selectTask, selectedTask, updateTask, addTask, deleteTask } = this.props
        return ( 
            <div className='TaskDisplay'>
                {tasks.map(task => (
                    <TaskCell key={task.id}
                        task={task} 
                        selectTask={selectTask} 
                        selectedTask={selectedTask}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                ))}
                <TaskAdd addTask={addTask} />
            </div>
        )
    }
}

export const taskTimesDoNotOverlap = (taskEnd, nextTaskStart) => {
    const nextTaskStartHour = nextTaskStart.hour || 24
    return taskEnd.hour < nextTaskStartHour ||
    (taskEnd.hour === nextTaskStartHour &&
        taskEnd.minute <= nextTaskStart.minute)
}

export const timesHaveChanged = (times, oldTimes) => {
    if (times.length !== oldTimes.length) { return true }
    for (let i = 0; i < times.length; i++) {
        if (times[i].time_start !== oldTimes[i].time_start ||
            times[i].time_end !== oldTimes[i].time_start) {
                return true
            }
    }
    return false
}