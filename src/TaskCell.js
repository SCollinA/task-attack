import React from 'react'
import UpdateTask from './UpdateTask';

export default class TaskCell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            task: props.task
        }
    }

    _updateTaskForm = (task) => this.setState({ task: {...this.state.task, ...task }})
    
    render() {
        const { task, selectTask, selectedTask, updateTask, deleteTask } = this.props
        const isSelected = selectedTask && selectedTask.id === task.id
        return (
            <div className='TaskCellWrapper'>
                <div className={`TaskCell${isSelected ? ' selectedTask' : ''}${task.active ? ' activeTask' : ''}`} 
                    onClick={() => selectTask(task)}
                >
                    <h4>{this.state.task.name}</h4>
                    <h6>{this.state.task.time_start}</h6>
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