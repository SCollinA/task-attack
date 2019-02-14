import React from 'react'
import UpdateTask from './UpdateTask'

export default class TaskCell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            task: props.task,
            clicked: false,
        }
    }

    // control the form values by updating state
    _updateTaskForm = (task) => {
        const { timeIsTaken } = this.props
        const updatingTask = { ...this.state.task, ...task }
        const taskTime = getTaskTime(updatingTask)
        console.log('checking update')
        if (taskTimeIsValid(taskTime) && !timeIsTaken({...this.state.task, ...task})) {
            console.log('update good')
            this.setState({ 
                task: {...this.state.task, ...task },
            }, this.props.updateTask({ ...this.state.task, ...task }))
        } 
    }
    
    render() {
        const { hour, task, selectTask, selectedTask, addTask, updateTask, deleteTask } = this.props
        const isSelected = selectedTask && selectedTask.id === task.id
        const taskTime = getTaskTime(task)
        // cell height is 1 px per min (start time - end time)
        const cellHeight = (taskTimeIsValid(taskTime)) ?
        (taskTime.end.hour * 60 + taskTime.end.minute) - 
            (taskTime.start.hour * 60 + taskTime.start.minute) :
        ((24 * 60) - (taskTime.start.hour * 60 + taskTime.start.minute)) +
            (taskTime.end.hour * 60 + taskTime.end.minute)
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
                        this.setState({ clicked: !this.state.clicked }, () => {
                            setTimeout(() => {
                                (this.state.clicked &&
                                    this.setState({ task, clicked: false }, selectTask(this.state.task))) ||
                                        this.setState({ clicked: false })
                            }, 250)
                        })
                    }}
                    // double click toggles active status on task
                    onDoubleClick={() => (!task.free && !isSelected) && updateTask({ ...task, active: !task.active })}
                    // style={isSelected ?
                    //     {} : { // width is percent of task time remaining that hour
                    //         // width: `
                    //         //     ${(cellHeight % (hour * 60)) / 60}%
                    //         // `,
                    //     }
                    // }
                >  
                    <div className='taskCellContent'>
                        <h4>{this.state.task.name}</h4>
                        <div className='taskTimes'>
                            <h6>
                                {this.state.task.free ?
                                this.props.task.time_start :
                                this.state.task.time_start}
                            </h6>
                        </div>
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