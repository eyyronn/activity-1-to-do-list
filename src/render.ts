import TaskItem from "./taskItem";
import TaskList from "./taskList";

export const renderTasks = (taskList: TaskList) => {  
    const taskListElement = document.getElementById("task-list")
    taskListElement!.innerHTML = ""
  
    taskList.tasks.forEach(taskItem => {
        const taskItemElement = renderTaskItem(taskItem)  
        taskListElement!.appendChild(taskItemElement)   
    });
  }

export const renderTaskItem = (taskItem: TaskItem) : HTMLLIElement => {
    const li = document.createElement("li")
    li.className = "task-item"

    if (taskItem.isCompleted) {
      li.classList.toggle("is-complete")
    }

    const title = document.createElement("h3")
    title.textContent = taskItem.title
    li.appendChild(title)

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    deleteButton.className = "delete-button"
    li.appendChild(deleteButton)
    
    li.setAttribute("data-task-id", taskItem.id.toString())

    return li
}