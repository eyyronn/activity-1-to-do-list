import './style.css'
import { TaskItem, TaskList } from './types'

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

let i : number = 0
const taskList : TaskList = {
  tasks : [],
  addTask(task: TaskItem) : void {
      this.tasks.push(task)
  },
  removeTask(taskID: number) : void {
      this.tasks = this.tasks.filter((task: TaskItem) => task.id !== taskID);
  },
}

const addTaskForm = document.getElementById("add-task-form")
addTaskForm!.addEventListener("submit", (e) : void => {
  e.preventDefault()
  
  const inputElement = document.getElementById("task-input") as HTMLInputElement
  const inputText : string = inputElement.value.trim()
  if (!inputText) {
    alert("Invalid input!")
    return
  }

  const task : TaskItem = {title: inputText, id: i++, isCompleted: false}
  taskList.addTask(task)
  render(taskList)
  inputElement.value = ""
})

const render = (taskList: TaskList) => {  
  const taskListElement = document.getElementById("task-list")
  taskListElement!.innerHTML = ""

  taskList.tasks.forEach(taskItem => {
      const li = document.createElement("li")
      li.className = "task-item"

      if (taskItem.isCompleted) {
        li.classList.toggle("is-complete")
      }

      li.addEventListener("click", () => {
        taskItem.isCompleted = !taskItem.isCompleted
        render(taskList)
      } )

      const title = document.createElement("h3")
      title.textContent = taskItem.title
      li.appendChild(title)

      const deleteButton = document.createElement("button")
      deleteButton.textContent = "Delete"
      deleteButton.id = "deleteButton"
      li.appendChild(deleteButton)

      deleteButton.addEventListener("click", () => {
        taskList.removeTask(taskItem.id)
        render(taskList)
      })

      taskListElement!.appendChild(li)
  });
}