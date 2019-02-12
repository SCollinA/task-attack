import React from 'react'
import UpdateTask from './UpdateTask';

export default class TaskCell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            taskname: props.task.name
        }
    }

    _updateTaskname = (taskname) => this.setState({ taskname })
    
    render() {
        const { task, selectTask, selectedTask, updateTask, deleteTask } = this.props
        const isSelected = selectedTask && selectedTask.id === task.id
        return (
            <div className='TaskCellWrapper'>
                <div className={`TaskCell${isSelected ? ' selectedTask' : ''}`} 
                    onClick={() => selectTask(task)}
                >
                    <h4 >{this.state.taskname}</h4>
                </div>
                {isSelected && 
                    <UpdateTask 
                        task={selectedTask}
                        taskname={this.state.taskname}
                        updateTaskname={this._updateTaskname} 
                        selectTask={selectTask}
                        updateTask={updateTask} 
                        deleteTask={deleteTask}
                    />}
            </div>
        )
    }
}