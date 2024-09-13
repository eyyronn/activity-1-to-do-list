import { RenderOptions, renderTasks } from './render.ts'
import Status from './enums/status'
import TaskList from './models/taskList.ts'
import SortOption from './enums/sortOption.ts'

export const handleAddTask = (tasktitle: string, taskDueDate: string, taskList: TaskList, renderOptions: RenderOptions): void => {
  if (!tasktitle) {
    alert('Invalid title!')
    return
  }

  if (!taskDueDate) {
    alert('Please input a due date!')
    return
  }

  const isDueDatePast : boolean = new Date(taskDueDate) < new Date()

  if (isDueDatePast) {
    alert('Invalid due date!')
    return
  }

  console.log(taskDueDate)

  taskList.addTask(Date.now(), tasktitle, Status.isActive, taskDueDate)
  renderTasks(taskList, renderOptions)
}

export const handleRemove = (taskID: number, taskList: TaskList, renderOptions: RenderOptions) => {
  taskList.removeTask(taskID)
  renderTasks(taskList, renderOptions)
}

export const handleToggleComplete = (taskID: number, taskList: TaskList, renderOptions: RenderOptions) => {
  taskList.toggleTaskComplete(taskID)
  renderTasks(taskList, renderOptions)
}

export const handleSort = (sortOption: SortOption, taskList: TaskList, renderOptions: RenderOptions) => {
  renderOptions.sort = sortOption
  renderTasks(taskList, renderOptions)
}

export const handleFilter = (status: Status | 'none', taskList: TaskList, renderOptions: RenderOptions) => {
  if (status == 'none') delete renderOptions.filter
  else renderOptions.filter = status

  renderTasks(taskList, renderOptions)
}

export const handleToggleOrder = (taskList: TaskList, renderOptions: RenderOptions) => {
  renderOptions.isAscending = !renderOptions.isAscending
  renderTasks(taskList, renderOptions)
}
