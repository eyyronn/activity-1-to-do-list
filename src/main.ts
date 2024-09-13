import './style.css'
import TaskList from './models/taskList.ts'
import { handleAddTask, handleRemove, handleSort, handleFilter, handleToggleComplete, handleToggleOrder } from './eventHandlers.ts'
import { RenderOptions, renderTasks } from './render.ts'
import SortOption from './enums/sortOption.ts'
import Status from './enums/status.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
  <div>
    <h1>My To Do's</h1>
    <form id="add-task-form">
      <div class="task-input-container">
        <input type="date" id="due-date-input">
        <input type="time" id="due-time-input">
        <input type="text" id="task-input">
      </div>
      <button id="add-button"> Add </button>
    </form>
    <div class="render-options-container">
      <label for="sort-menu">Sort by:</label>
      <select name="sort" id="sort-menu">
        <option value=${SortOption.title}> Title </option>
        <option value=${SortOption.dateAdded} selected=true> Date Added </option>
        <option value=${SortOption.dueDate}> Due Date </option>
      </select>
      <label for="filter-menu">Filter for:</label>
      <select name="filter" id="filter-menu">
        <option value = "none" selected=true> None </option>
        <option value=${Status.isActive}> Active </option>
        <option value=${Status.isCompleted}> Completed </option>
        <option value=${Status.isExpired}> Expired </option>
      </select>
      <button id="ascending-button"> Ascending </button>
    </div>
    <ul id="task-list">
    </ul>
  </div>
`

const taskListElement = <HTMLUListElement> document.getElementById('task-list')
const addTaskForm = <HTMLFormElement> document.getElementById('add-task-form')

const sortMenu = <HTMLSelectElement> document.getElementById('sort-menu')
const filterMenu = <HTMLSelectElement> document.getElementById('filter-menu')
const ascendingButton = <HTMLButtonElement> document.getElementById('ascending-button')

const taskList = new TaskList(taskListElement)
const renderOptions: RenderOptions = {sort: SortOption.dateAdded, isAscending: true}


addTaskForm!.addEventListener('submit', (event: Event): void => {
  event.preventDefault()
  const inputTextElement = <HTMLInputElement> document.getElementById('task-input')
  const inputText: string = inputTextElement.value.trim()

  const inputDueDateElement = <HTMLInputElement> document.getElementById('due-date-input')
  const inputDueDate: string = inputDueDateElement.value.trim()

  const inputDueTimeElement = <HTMLInputElement> document.getElementById('due-time-input')
  const inputDueTime: string = inputDueTimeElement.value.trim()

  const inputDueDateTime = inputDueDate + " " + inputDueTime

  handleAddTask(inputText, inputDueDateTime, taskList, renderOptions)
  inputTextElement.value = ''
})

sortMenu.addEventListener('change', () => {
  const sortOption = <SortOption> sortMenu.value
  handleSort(sortOption, taskList, renderOptions)
})

filterMenu.addEventListener('change', () => {
  const filterStatus = <Status | 'none'> filterMenu.value
  handleFilter(filterStatus, taskList, renderOptions)
})

ascendingButton.addEventListener('click', () => {
  handleToggleOrder(taskList, renderOptions)
  if (renderOptions.isAscending) ascendingButton.textContent = "Ascending"
  else if (!renderOptions.isAscending) ascendingButton.textContent = "Descending"
})

taskListElement!.addEventListener('click', (event: Event): void => {
  if (!(event.target instanceof HTMLElement)) {
    return
  }

  if (event.target.className == 'complete-toggle') {
    const taskItemElement: HTMLElement | null = event.target.parentElement
    if (!taskItemElement) return

    const taskID: string | undefined = taskItemElement.dataset.taskId
    if (!taskID) return

    const id = parseInt(taskID)
    handleToggleComplete(id, taskList, renderOptions)
  }

  if (event.target.className == 'delete-button') {
    const taskItemElement: HTMLElement | null = event.target.parentElement
    if (!taskItemElement) return

    const taskID: string | undefined = taskItemElement.dataset.taskId
    if (!taskID) return

    const id = parseInt(taskID)
    handleRemove(id, taskList, renderOptions)
  }
})

taskList.load()
renderTasks(taskList)