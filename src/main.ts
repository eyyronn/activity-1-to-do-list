import './style.css'
import { TaskItem, TaskList } from './types'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
  <div>
    <h1>My To Do's</h1>
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

const addTaskForm = document.getElementById("add-task-form") as HTMLFormElement

addTaskForm.addEventListener("submit", (e) : void => {
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
  console.log(taskList)

  const taskListElement = document.getElementById("task-list") as HTMLUListElement
  taskListElement.innerHTML = ""

  taskList.tasks.forEach(taskItem => {

      const li = document.createElement("li") as HTMLLIElement
      li.className = "task-item"

      if (taskItem.isCompleted) {
        li.classList.add("task-complete")
      }
      else if (!taskItem.isCompleted) {
        li.classList.add("task-incomplete")
      }

      const checkBox = document.createElement("input") as HTMLInputElement
      checkBox.type = "checkbox"
      checkBox.checked = taskItem.isCompleted
      li.appendChild(checkBox)

      checkBox.addEventListener("change", () => {
        taskItem.isCompleted = checkBox.checked
        render(taskList)
      } )

      const title = document.createElement("h3") as HTMLHeadingElement
      title.textContent = taskItem.title
      li.appendChild(title)


      const deleteBtn = document.createElement("button") as HTMLButtonElement
      deleteBtn.textContent = "Delete"
      li.appendChild(deleteBtn)

      deleteBtn.addEventListener("click", () => {
        taskList.removeTask(taskItem.id)
        render(taskList)
      })

      taskListElement.appendChild(li)
  });
}