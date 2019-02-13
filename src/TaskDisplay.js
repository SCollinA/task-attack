import React from 'react'
import TaskCell from './TaskCell'
import TaskAdd from './TaskAdd'
import { getTaskTime } from './TaskCell'

export default class TaskDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            availableTimes: [], // array of arrays of [start, end] times
        }
    }

    componentDidUpdate() {
        this.findAvailableTimes(this.props.tasks)
    }

    findAvailableTimes(tasks) {
        const availableTimes = []
        for (let i = 0; i < tasks.length; i++) {
            const task = getTaskTime(tasks[i])
            // come back to first task for last task's comparison
            const nextTask = getTaskTime(tasks[i + 1] || tasks[0])
            if (task.end < nextTask.start) {
                availableTimes.push([task.end, nextTask.start])
            }
        }
        this.setState({ availableTimes })
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