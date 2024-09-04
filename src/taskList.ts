import TaskItem from "./taskItem";

class TaskList {
    _tasks : TaskItem[] = [];

    get tasks() {
        return this._tasks
    }

    addTask(task: TaskItem) : void {
        this.tasks.push(task);
    };

    removeTask(taskID: number) : void {
        this._tasks = this.tasks.filter((task: TaskItem) => task.id !== taskID);
    }

    toggleTaskComplete(taskID: number) : void {
        const taskToToggle = this.tasks.find((task : TaskItem) => task.id == taskID);
        if (taskToToggle) {
            taskToToggle.toggleComplete()
        }
    }
  }

  export default TaskList