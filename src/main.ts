import './style.css'
import TaskList from './taskList'
import {handleAddTask, handleToggle, handleRemove} from "./eventHandlers.ts"
import { renderTasks } from './render.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
  <div>
    <h1>My To Do's</h1>
    <p>Click on a task to mark it complete</p>
    <form id="add-task-form">
      <input type="datetime-local" id="due-date-input">
      <input id="task-input">
      <button id="add-button">
        Add
      </button>
    </form>
    <ul id="task-list">
    </ul>
  </div>
`

const taskList = new TaskList

const taskListElement = document.getElementById("task-list")
const addTaskForm = document.getElementById("add-task-form")

addTaskForm!.addEventListener("submit", (event: Event) : void => {
  event.preventDefault()
  const inputTextElement = document.getElementById("task-input") as HTMLInputElement
  const inputText : string = inputTextElement.value.trim()

  const inputDueDateElement = document.getElementById("due-date-input") as HTMLInputElement
  const inputDueDate : string = inputDueDateElement.value.trim()

  handleAddTask(inputText, inputDueDate, taskList)
  inputTextElement.value = ""
})

taskListElement!.addEventListener("click", (event: Event) : void => {
  if (!(event.target instanceof HTMLElement)) {
    return
  }

  if (event.target.classList.contains("task-item"))  {
    if (!event.target.dataset.taskId) return

    const id = parseInt(event.target.dataset.taskId)
    handleToggle(id, taskList)
  }

  if (event.target.className == "delete-button") {
    const taskItemElement : HTMLElement | null = event.target.parentElement
    if (!taskItemElement) return

    const taskID : string | undefined = taskItemElement.dataset.taskId
    if (!taskID) return

    const id = parseInt(taskID)
    handleRemove(id, taskList)
  }
})

taskList.load()
renderTasks(taskList)
console.log(taskList)