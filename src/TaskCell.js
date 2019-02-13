import React from 'react'
import UpdateTask from './UpdateTask';

export default class TaskCell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            task: props.task
        }
    }

    componentDidUpdate() {
        // task times are updated after initial set state
        if (typeof this.state.task.time_start === 'string') {
            this.setState({
                task: this.props.task
            })
        }
    }

    _updateTaskForm = (task) => this.setState({ task: {...this.state.task, ...task }})
    
    render() {
        const { task, selectTask, selectedTask, updateTask, deleteTask } = this.props
        const isSelected = selectedTask && selectedTask.id === task.id
        const taskTimeStart = this.state.task.time_start.map(time => time < 10 ? `0${time}` : time).join(':')
        const taskTimeEnd = this.state.task.time_end.map(time => time < 10 ? `0${time}` : time).join(':')
        return (
            <div className='TaskCellWrapper'>
                <div className={`TaskCell${isSelected ? ' selectedTask' : ''}${task.active ? ' activeTask' : ''}`} 
                    onClick={() => selectTask(this.state.task)}
                    style={{
                        height: `${(task.time_end[0] * 60 + task.time_end[1]) - (task.time_start[0] * 60 + task.time_start[1])}px`,
                        minHeight: `40px`
                    }}
                >
                    <h4>{this.state.task.name}</h4>
                    <h6>{taskTimeStart}</h6>
                    <h6>{taskTimeEnd}</h6>
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