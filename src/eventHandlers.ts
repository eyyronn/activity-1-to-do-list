import { renderTasks } from "./render"
import TaskList from "./taskList"

export const handleAddTask = (taskList: TaskList) : void => { 
    const inputElement = document.getElementById("task-input") as HTMLInputElement
    const inputText : string = inputElement.value.trim()
    if (!inputText) {
      alert("Invalid input!")
      return
    }
  
    taskList.addTask(Date.now(), inputText, false)
    taskList.load()
    renderTasks(taskList)
    inputElement.value = ""
}

export const handleRemove = (taskID: number, taskList: TaskList) => {
    taskList.removeTask(taskID)
    taskList.load()
    renderTasks(taskList)
}

export const handleToggle = (taskID: number, taskList: TaskList) => {
    taskList.toggleTaskComplete(taskID)
    renderTasks(taskList)
}

