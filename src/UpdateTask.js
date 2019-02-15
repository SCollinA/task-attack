import React from 'react'
import TaskDelete from './TaskDelete'
import TaskCancel from './TaskCancel'

export default function UpdateTask({ task, updateTaskForm, selectedTask, selectTask, updateTask, deleteTask }) {
    return (
        <div className='UpdateTaskContainer'>
            <form id='UpdateTaskForm' 
                onSubmit={event => {
                    event.preventDefault()
                    event.stopPropagation()
                    updateTask({
                        id: task.id,
                        name: event.target.name.value,
                        startHour: event.target.startHour.value,
                        startMin: event.target.startMin.value,
                        endHour: event.target.endHour.value,
                        endMin: event.target.endMin.value,
                        mandatory: event.target.mandatory.checked,
                        active: event.target.active.checked
                    })
                    selectTask({selectedTask, selectedHour: null})
                }}
                onReset={() => updateTaskForm(selectedTask)}
                onClick={event => event.stopPropagation()}
            >
                <label name='name'>task name
                    <input type='text' name='name' value={task.name} 
                        onChange={event => updateTaskForm({name: event.target.value})}
                    />
                </label>
                <div className='timeStart'>
                    <label name='startHour'>time start
                        <input type='select' name='startHour' 
                            value={task.startHour} 
                            max={task.endHour} 
                            onChange={event => updateTaskForm({ startHour: event.target.value })}
                            />
                    </label>
                    <label name='startMin'>time start
                        <input type='time' name='startMin' 
                            value={task.startMin} 
                            max={task.endMin} 
                            onChange={event => updateTaskForm({ startMin: event.target.value })}
                            />
                    </label>
                </div>
                <div className='timeEnd'></div>
                <label name='endHour'>time end
                    <input type='time' name='endHour' 
                        value={task.endHour}
                        min={task.startHour}
                        onChange={event => updateTaskForm({ endHour: event.target.value })}
                    />
                </label>
                <label name='time_end'>time end
                    <input type='time' name='time_end' 
                        value={task.endMin}
                        min={task.startMin}
                        onChange={event => updateTaskForm({ endMin: event.target.value })}
                    />
                </label>
                <div className='updateTaskChecks'>
                    <label name='mandatory'>mandatory
                        <input type='checkbox' name='mandatory' 
                            checked={task.mandatory} 
                            onChange={event => updateTaskForm({mandatory: event.target.checked})}
                        />
                    </label>
                    <label name='active'>active
                        <input type='checkbox' name='active' 
                            checked={task.active} 
                            onChange={event => updateTaskForm({active: event.target.checked})}
                        />
                    </label>
                </div>
                <div className='updateTaskButtons'>
                    <input type='reset' value='reset'/>
                    <input type='submit' value='update'/>
                </div>
            </form>
            <div className='taskUpdateIcons'>
                <TaskDelete task={task} deleteTask={deleteTask}/>
                <TaskCancel task={selectedTask} 
                    selectTask={selectTask} 
                    updateTaskForm={updateTaskForm}
                />
            </div>
        </div>
    )
} 
