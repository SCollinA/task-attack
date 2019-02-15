import React from 'react'
import UpdateTask from './UpdateTask'

export default class TaskCell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            task: props.task,
            clicked: false,
            hour: props.hour,
        }
    }

    // control the form values by updating state
    _updateTaskForm = (task) => {
        const { timeIsTaken } = this.props
        const updatingTask = { ...this.state.task, ...task }
        const taskTime = { start: updatingTask.start, end: updatingTask.end }
        if (taskTimeIsValid(taskTime) && !timeIsTaken({...this.state.task, ...task})) {
            this.setState({ 
                task: {...this.state.task, ...task },
            }, this.props.updateTask({ ...this.state.task, ...task }))
        } 
    }
    
    render() {
        const { task, selectTask, selectedTask, selectedHour, addTask, updateTask, deleteTask } = this.props
        const isSelected = selectedTask && selectedTask.id === task.id
        const { hour } = this.state
        return (
            <div className='TaskCellWrapper'>
                <div className={`TaskCell${isSelected ? ' selectedTask' : ''}${task.active ? ' activeTask' : ''}`} 
                    // single click opens 
                    onClick={() => {
                        task.free ?
                        addTask({
                            ...task,
                            name: `new task - ${hour > 9 ? hour : `0${hour}`}:${task.start.minute > 9 ? task.start.minute : `0${task.start.minute}`}`,
                            start: { hour, minute: task.start.minute },
                            end: { ...task.end },
                            free: false
                        }) :
                        this.setState({ clicked: !this.state.clicked }, () => {
                            setTimeout(() => {
                                (this.state.clicked &&
                                    this.setState({ task, clicked: false }, selectTask({
                                        selectedTask: this.state.task,
                                        selectedHour: this.state.hour,
                                    }))) ||
                                        this.setState({ clicked: false })
                            }, 250)
                        })
                    }}
                    // double click toggles active status on task
                    onDoubleClick={() => (!task.free && !isSelected) && updateTask({ ...task, active: !task.active })}
                >  
                    <div className='taskCellContent'>
                        {this.state.task.start.hour === hour && 
                        (<h6>
                            {this.state.task.free ?
                            getTaskTimeString(this.props.task.start) :
                            getTaskTimeString(this.state.task.start)}
                        </h6>)}
                        <h4>{this.state.task.name}</h4>
                        {/* {this.state.task.end.hour === hour && 
                        (<h6>
                            {this.state.task.free ?
                            this.props.task.time_end :
                            this.state.task.time_end}
                        </h6>)} */}
                    </div>
                    {/* {children} */}
                    {(isSelected && this.state.hour === selectedHour) && 
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

export const getTaskTimeString = (taskTime) => {
    return `
        ${taskTime.hour > 9 ? taskTime.hour : `0${taskTime.hour}`}
        :
        ${taskTime.minute > 9 ? taskTime.minute : `0${taskTime.minute}`}
    `
}

export const taskTimeIsValid = (taskTime) => {
    return taskTime.start.hour < taskTime.end.hour || // if hours are less
        (taskTime.start.hour === taskTime.end.hour && // if hours are same
            taskTime.start.minute < taskTime.end.minute) // if minutes are less
}