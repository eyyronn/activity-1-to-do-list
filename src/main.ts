import './style.css'
import TaskList from './taskList'
import {handleAddTask, handleToggle, handleRemove} from "./eventHandlers.ts"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
  <div>
    <h1>My To Do's</h1>
    <p>Click on a task to mark it complete</p>
    <form id = "add-task-form">
      <input id = "task-input">
      <button id = "add-btn">
        Add
      </button>
    </form>
    <ul id = "task-list">
    </ul>
  </div>
`

const taskList = new TaskList
const taskListElement = document.getElementById("task-list")
const addTaskForm = document.getElementById("add-task-form")

addTaskForm!.addEventListener("submit", (event: Event) : void => {
  event.preventDefault()
  handleAddTask(taskList)
})

taskListElement!.addEventListener("click", (event: Event) : void => {
  if (!(event.target instanceof HTMLElement)) {
    return
  }

  if (event.target.classList.contains("task-item"))  {
    if (!(event.target.dataset.taskId)) return

    const id = parseInt(event.target.dataset.taskId)
    handleToggle(id, taskList)
  }

  if (event.target.className == "delete-button") {
    if (!(event.target.parentElement)) return

    if (!(event.target.parentElement.dataset.taskId)) return

    const id = parseInt(event.target.parentElement.dataset.taskId)
    handleRemove(id, taskList)
  }
})
