import React from 'react'
import TaskCell from './TaskCell'
// import TaskAdd from './TaskAdd'
import { getTaskTime } from './TaskCell'

export default class TaskDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            isFull: false,
            availableTimes: [], // array of arrays of [start, end] times
        }
    }

    componentDidMount() {
        // !this.state.isFull && this.state.availableTimes.length === 0 &&
        this.setState({ tasks: this.props.tasks },
            () => this.findAvailableTimes(this.props.tasks))
    }

    componentDidUpdate() {
        timesHaveChanged(this.props.tasks, this.state.tasks) &&    
            this.setState({ tasks: this.props.tasks },
                () => this.findAvailableTimes(this.props.tasks))
    }

    findAvailableTimes(tasks) {
        console.log('finding availability')
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
                const taskTimeEnd = getTaskTime(task).end
                // come back to first task for last task's comparison
                const nextTask = tasks[i + 1] || tasks[0]
                const nextTaskTimeStart = getTaskTime(nextTask).start
                console.log(taskTimeEnd, nextTaskTimeStart)
                if (taskTimeEnd.hour !== nextTaskTimeStart.hour || 
                taskTimeEnd.minute !== nextTaskTimeStart.minute) {
                    console.log('found available time')
                    availableTimes.push({
                        ...availableTask,
                        time_start: `${taskTimeEnd.hour}:${taskTimeEnd.minute}`,
                        time_end: `${nextTaskTimeStart.hour}:${nextTaskTimeStart.minute}`,
                    })
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

    render() {
        const { tasks, selectTask, selectedTask, updateTask, addTask, deleteTask } = this.props
        const cells = [...tasks, ...this.state.availableTimes]
        return ( 
            <div className='TaskDisplay'>
                {cells.sort((taskA, taskB) => {
                    return getTaskTime(taskB).hour - getTaskTime(taskA).hour ||
                    getTaskTime(taskA).minute - getTaskTime(taskB).minute
                }).map((task, index) => (
                    <TaskCell key={task.id || index}
                        task={task} 
                        selectTask={selectTask} 
                        selectedTask={selectedTask}
                        addTask={addTask}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                ))}
                {/* <TaskAdd addTask={addTask} /> */}
            </div>
        )
    }
}

// export const taskTimesDoNotOverlap = (taskEnd, nextTaskStart) => {
//     console.log('checking overlap')
//     // change hour 0 to hour 24
//     const nextTaskStartHour = nextTaskStart.hour || 24
//     return taskEnd.hour < nextTaskStartHour ||
//     (taskEnd.hour === nextTaskStartHour &&
//         taskEnd.minute < nextTaskStart.minute)
// }

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