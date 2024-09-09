import TaskItem from "./taskItem";

class TaskList {
    private _tasks : TaskItem[] = [];

    get tasks() {
        return this._tasks
    }

    clear(): void {
        this._tasks = []
        this.save()
    }
    
    load() : void {
        const storedTasks: string | null = localStorage.getItem("tasks")
        if (!(storedTasks)) return

        this.clear()
        const parsedTasks: TaskItem[] = JSON.parse(storedTasks)
        
        parsedTasks.forEach((task) => {
            this.addTask(task._id, task._title, task._isCompleted)
        })
    }

    save() : void {
        localStorage.setItem("tasks", JSON.stringify(this.tasks))
    }

    addTask(taskID: number, taskTitle: string, taskIsCompleted: boolean) : void {
        const task : TaskItem = new TaskItem(taskID, taskTitle, taskIsCompleted)
        this._tasks.push(task);
        this.save()
    };

    removeTask(taskID: number) : void {
        this._tasks = this.tasks.filter((task: TaskItem) => task.id !== taskID);
        this.save()
    }

    toggleTaskComplete(taskID: number) : void {
        const taskToToggle = this.tasks.find((task : TaskItem) => task.id == taskID);
        if (taskToToggle) {
            taskToToggle.toggleComplete()
        }
        this.save()
    }
  }

  export default TaskList