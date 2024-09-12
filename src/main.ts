import './style.css'
import TaskList from './models/taskList.ts'
import { handleAddTask, handleToggle, handleRemove } from './eventHandlers.ts'
import { renderTasks } from './render.ts'
import SortOption from './enums/sortOption.ts'
import Status from './enums/status.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
  <div>
    <h1>My To Do's</h1>
    <p>Click on a task to mark it complete</p>
    <form id="add-task-form">
      <div class ="add-task-input">
        <input type="date" id="due-date-input">
        <input type="time" id="due-time-input">
        <input type="text" id="task-input">
      </div>
      <button id="add-button">
        Add
      </button>
    </form>
    <ul id="task-list">
    </ul>
  </div>
`

const taskListElement = <HTMLUListElement> document.getElementById('task-list')
const taskList = new TaskList(taskListElement)

const addTaskForm = <HTMLFormElement> document.getElementById('add-task-form')

addTaskForm!.addEventListener('submit', (event: Event): void => {
  event.preventDefault()
  const inputTextElement = <HTMLInputElement> document.getElementById('task-input')
  const inputText: string = inputTextElement.value.trim()

  const inputDueDateElement = <HTMLInputElement> document.getElementById('due-date-input')
  const inputDueDate: string = inputDueDateElement.value.trim()

  handleAddTask(inputText, inputDueDate, taskList)
  inputTextElement.value = ''
})

taskListElement!.addEventListener('click', (event: Event): void => {
  if (!(event.target instanceof HTMLElement)) {
    return
  }

  if (event.target.classList.contains('task-item')) {
    if (!event.target.dataset.taskId) return

    const id = parseInt(event.target.dataset.taskId)
    handleToggle(id, taskList)
  }

  if (event.target.className == 'delete-button') {
    const taskItemElement: HTMLElement | null = event.target.parentElement
    if (!taskItemElement) return

    const taskID: string | undefined = taskItemElement.dataset.taskId
    if (!taskID) return

    const id = parseInt(taskID)
    handleRemove(id, taskList)
  }
})

taskList.load()
renderTasks(taskList, {sort: SortOption.title, filter: Status.isCompleted, isAscending: false})

console.log(taskList)
