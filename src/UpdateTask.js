import React from 'react'

export default function UpdateTask({ task, updateTask }) {
    return (
        <form id='UpdateTaskForm' className='modal-hidden' onSubmit={event => {
            event.preventDefault()
            updateTask({})
        }}>
        <label name='name'>new name
            <input type='text' name='name' defaultValue={`${task.name}`}/>
        </label>
        <label name='timeStart'>time start
            <input type='time' name='timeStart' defaultValue={`${task.timeStart}`}/>
        </label>
        <label name='timeEnd'>time end
            <input type='time' name='timeEnd' defaultValue={`${task.timeEnd}`}/>
        </label>
        <label name='mandatory'>mandatory
            <input type='checkbox' name='mandatory' defaultValue={`${task.mandatory}`}/>
        </label>
        <label name='active'>active
            <input type='checkbox' name='active' defaultValue={`${task.active}`}/>
        </label>
        <input type='submit' value='update'/>
        <input type='reset' value='reset'/>
    </form>
)
} 

export function toggleTaskModal(logout=false) {
const updateTaskForm = document.getElementById('UpdateTaskForm')
// if form does not contain modal-hidden class or logging out
!updateTaskForm.classList.contains('modal-hidden') || logout ?
    // add the modal-hidden class
    updateTaskForm.classList.add('modal-hidden') :
    // remove the modal hidden class
    updateTaskForm.classList.remove('modal-hidden')
}