import { renderTasks } from './render.ts'
import Status from './enums/status'
import TaskList from './models/taskList.ts'

export const handleAddTask = (
  tasktitle: string,
  taskDueDate: string,
  taskList: TaskList
): void => {
  if (!tasktitle) {
    alert('Invalid title!')
    return
  }

  if (!taskDueDate) {
    alert('Invalid due date!')
    return
  }

  taskList.addTask(Date.now(), tasktitle, Status.isActive, taskDueDate)
  renderTasks(taskList)
}

export const handleRemove = (taskID: number, taskList: TaskList) => {
  taskList.removeTask(taskID)
  renderTasks(taskList)
}

export const handleToggle = (taskID: number, taskList: TaskList) => {
  taskList.toggleTaskComplete(taskID)
  renderTasks(taskList)
}
