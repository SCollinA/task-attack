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

    // control the form values by updating state
    _updateTaskForm = (task) => this.setState({ task: {...this.state.task, ...task }})
    
    render() {
        const { task, selectTask, selectedTask, updateTask, deleteTask } = this.props
        const isSelected = selectedTask && selectedTask.id === task.id
        return (
            <div className='TaskCellWrapper'>
                <div className={`TaskCell${isSelected ? ' selectedTask' : ''}${task.active ? ' activeTask' : ''}`} 
                    // single click opens 
                    onClick={() => selectTask(this.state.task)}
                    // double click toggles active status on task
                    onDoubleClick={() => updateTask({ ...task, active: !task.active })}
                    style={{
                        // height: `
                        //     ${(task.time_end.slice(0, 2) * 60 + task.time_end.slice(2, 4)) - 
                        //         (task.time_start.slice(0, 2) * 60 + task.time_start.slice(2, 4))}px
                        // `,
                        // minHeight: `40px`,
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