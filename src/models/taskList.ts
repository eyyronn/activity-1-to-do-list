import Status from '../enums/status'
import TaskItem from './taskItem'

class TaskList {
  private _tasks: TaskItem[] = []
  private _taskListElement: HTMLUListElement

  constructor(taskListElement: HTMLUListElement) {
    this._taskListElement = taskListElement
  }

  get tasks() {
    return this._tasks
  }

  get taskListElement() {
    return this._taskListElement
  }

  clear(): void {
    this._tasks = []
    this.save()
  }

  load(): void {
    const storedTasks = <string> localStorage.getItem('tasks')
    if (!storedTasks) return

    this.clear()
    const parsedTasks = <TaskItem[]> JSON.parse(storedTasks)

    parsedTasks.forEach((task) => {
      this.addTask(task._id, task._title, task._status, task._dueDate)
    })
  }

  save(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  addTask(id: number, title: string, status: Status, dueDate: string): void {
    const newTask: TaskItem = new TaskItem({ id, title, status, dueDate })
    this._tasks.push(newTask)
    this.save()
  }

  removeTask(id: number): void {
    this._tasks = this.tasks.filter((task: TaskItem) => task.id !== id)
    this.save()
  }

  toggleTaskComplete(taskID: number): void {
    const taskToToggle = this.tasks.find((task: TaskItem) => task.id == taskID)
    if (taskToToggle) {
      taskToToggle.toggleComplete()
    }
    this.save()
  }
}


export default TaskList
