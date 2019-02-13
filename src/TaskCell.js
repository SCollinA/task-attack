import React from 'react'
import UpdateTask from './UpdateTask';

export default class TaskCell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            task: props.task
        }
    }

    // componentDidUpdate() {
    //     // task times are updated after initial set state
    //     if (typeof this.state.task.time_start === 'string') {
    //         this.setState({
    //             task: this.props.task
    //         })
    //     }
    // }

    getTaskTime(task) {
        let start = task.time_start
            .split(':').map(number => parseInt(number))
        let end = task.time_end
            .split(':').map(number => parseInt(number))
        return { start, end }
    }

    // control the form values by updating state
    _updateTaskForm = (task) => {
        const updatingTask = { ...this.state.task, ...task }
        const taskTime = this.getTaskTime(updatingTask)
        if (
            taskTime.start[0] < taskTime.end[0] || // if hours are less
                (taskTime.start[0] === taskTime.end[0] && // if hours are same
                    taskTime.start[1] < taskTime.end[1]) // if minutes are less
        ) {
            this.setState({ task: {...this.state.task, ...task } })
        } 

    }
    
    render() {
        const { task, selectTask, selectedTask, updateTask, deleteTask } = this.props
        const isSelected = selectedTask && selectedTask.id === task.id
        const taskTime = this.getTaskTime(task)
        return (
            <div className='TaskCellWrapper'>
                <div className={`TaskCell${isSelected ? ' selectedTask' : ''}${task.active ? ' activeTask' : ''}`} 
                    // single click opens 
                    onClick={() => selectTask(this.state.task)}
                    // double click toggles active status on task
                    onDoubleClick={() => updateTask({ ...task, active: !task.active })}
                    style={{
                        height: `
                            ${(taskTime.end[0] * 60 + taskTime.end[1]) - 
                                (taskTime.start[0] * 60 + taskTime.start[1])}px
                        `,
                        minHeight: `40px`,
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