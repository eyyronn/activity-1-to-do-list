import { renderTasks } from "./render"
import TaskItem from "./taskItem"
import TaskList from "./taskList"

let i = 0

export const handleAddTask = (taskList: TaskList) : void => { 
    const inputElement = document.getElementById("task-input") as HTMLInputElement
    const inputText : string = inputElement.value.trim()
    if (!inputText) {
      alert("Invalid input!")
      return
    }
  
    const task : TaskItem = new TaskItem(i++, inputText)

    taskList.addTask(task)
    renderTasks(taskList)
    inputElement.value = ""
}

export const handleToggle = (taskID: number, taskList: TaskList) => {
    taskList.toggleTaskComplete(taskID)
    renderTasks(taskList)
}

export const handleRemove = (taskID: number, taskList: TaskList) => {
    taskList.removeTask(taskID)
    renderTasks(taskList)
}