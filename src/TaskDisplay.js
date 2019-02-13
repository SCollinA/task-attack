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
        // if day is not full
        // and available times is empty
        (!this.state.isFull && this.state.availableTimes.length === 0) && 
            true &&
            this.findAvailableTimes(this.props.tasks)
    }

    findAvailableTimes(tasks) {
        console.log(tasks)
        const availableTimes = []
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i]
            const taskTimeEnd = getTaskTime(task).end
            console.log('task is', taskTimeEnd)
            // come back to first task for last task's comparison
            const nextTask = tasks[i + 1] || tasks[0]
            const nextTaskTimeStart = getTaskTime(nextTask).start
            console.log('nextTask is', nextTaskTimeStart)
            if (taskTimesDoNotOverlap(taskTimeEnd, nextTaskTimeStart)) {
                availableTimes.push({time_start: taskTimeEnd, time_end: nextTaskTimeStart})
            }
        }
        availableTimes.length > 0 ?
        this.setState({ availableTimes, isFull: false }) :
        this.setState({ availableTimes, isFull: true })
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