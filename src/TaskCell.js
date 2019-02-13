import React from 'react'
import UpdateTask from './UpdateTask';

export default class TaskCell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            task: props.task
        }
    }

    // control the form values by updating state
    _updateTaskForm = (task) => {
        const updatingTask = { ...this.state.task, ...task }
        const taskTime = getTaskTime(updatingTask)
        if (taskTimeIsValid(taskTime)) {
            this.setState({ task: {...this.state.task, ...task } })
        } 
    }
    
    render() {
        const { task, selectTask, selectedTask, addTask, updateTask, deleteTask } = this.props
        const isSelected = selectedTask && selectedTask.id === task.id
        const taskTime = getTaskTime(task)
        const cellHeight = (taskTime.end.hour * 60 + taskTime.end.minute) - 
                                (taskTime.start.hour * 60 + taskTime.start.minute)
        return (
            <div className='TaskCellWrapper'>
                <div className={`TaskCell${isSelected ? ' selectedTask' : ''}${task.active ? ' activeTask' : ''}`} 
                    // single click opens 
                    onClick={() => {
                        task.free ?
                        addTask({
                            ...task,
                            name: 'new task',
                            time_end: `${parseInt(task.time_start.slice(0, 2)) + Math.floor((parseInt(task.time_start.slice(3, 5)) + 15) / 60)}:${(parseInt(task.time_start.slice(3, 5)) + 15) % 60}`,
                            free: false
                        }) :
                        this.setState({ task }, selectTask(this.state.task))
                    }}
                    // double click toggles active status on task
                    onDoubleClick={() => updateTask({ ...task, active: !task.active })}
                    style={{
                        height: `
                            ${cellHeight > 60 ? cellHeight : 60}px
                        `,
                    }}
                >
                    <h6>{this.state.task.time_start}</h6>
                    <h4>{this.state.task.name}</h4>
                    <h6>{this.state.task.time_end}</h6>
                </div>
                {isSelected && 
                    <UpdateTask 
                        task={this.state.task}
                        updateTaskForm={this._updateTaskForm}
                        selectedTask={selectedTask} 
                        selectTask={selectTask}
                        updateTask={updateTask} 
                        deleteTask={deleteTask}
                    />}
            </div>
        )
    }
}

export const getTaskTime = (task) => {
    let start = task.time_start
        .split(':').map(number => {
            // return number === '12' ?
            // 0 :
            return parseInt(number)
        })
    let end = task.time_end
        .split(':').map(number => {
            // return number === '12' ?
            // 0 :
            return parseInt(number)
        })
    return { start: {
        hour: start[0],
        minute: start[1],
    }, end: {
        hour: end[0],
        minute: end[1],
    } }
}

export const taskTimeIsValid = (taskTime) => {
    return taskTime.start.hour < taskTime.end.hour || // if hours are less
        (taskTime.start.hour === taskTime.end.hour && // if hours are same
            taskTime.start.minute < taskTime.end.minute) // if minutes are less

}