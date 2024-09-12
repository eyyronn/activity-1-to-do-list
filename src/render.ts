import SortOption from "./enums/sortOption"
import Status from "./enums/status"
import TaskItem from "./models/taskItem"
import TaskList from "./models/taskList"
import filterFor from "./utils/filterFor"
import sortBy from "./utils/sortBy"

interface RenderOptions {
  sort?: SortOption
  filter?: Status
  isAscending?: boolean
}

export const renderTasks = (taskList: TaskList, renderOptions?: RenderOptions): void => {
  taskList.taskListElement.innerHTML = ''

  let tasksToRender = taskList.tasks

  if (renderOptions) { 
    if (renderOptions.sort) {
      tasksToRender = sortBy(tasksToRender, renderOptions.sort)
    }

    if (renderOptions.filter) {
      tasksToRender = filterFor(tasksToRender, renderOptions.filter)
    }
    if (renderOptions.isAscending == false) {
      tasksToRender.reverse()
    }
  }

  tasksToRender.forEach((taskItem) => {
    const taskItemElement = document.createElement('li')
    renderTaskItem(taskItem, taskItemElement)
    taskList.taskListElement.appendChild(taskItemElement)
  })
}

export const renderTaskItem = (taskItem: TaskItem, taskItemElement: HTMLLIElement): void => {
  taskItemElement.className = 'task-item'

  if (taskItem.isCompleted()) {
    taskItemElement.classList.add('is-complete')
  }

  const title = document.createElement('h3')
  title.textContent = taskItem.title
  taskItemElement.appendChild(title)

  const dateAdded = document.createElement('p')
  dateAdded.textContent = taskItem.dateAdded.toUTCString()
  taskItemElement.appendChild(dateAdded)

  const dueDate = document.createElement('p')
  dueDate.textContent = taskItem.dueDate.toUTCString()
  taskItemElement.appendChild(dueDate)

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  deleteButton.className = 'delete-button'
  taskItemElement.appendChild(deleteButton)

  taskItemElement.setAttribute('data-task-id', taskItem.id.toString())
}