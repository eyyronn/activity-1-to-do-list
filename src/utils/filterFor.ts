import Status from "../enums/status";
import TaskItem from "../models/taskItem";

const filterFor = (tasks: TaskItem[], status: Status): TaskItem[] => {
    let tasksCopy = tasks
    tasksCopy = tasksCopy.filter((task: TaskItem) => {
        if (status == Status.isActive) return task.isActive()
        if (status == Status.isCompleted) return task.isCompleted()
        if (status == Status.isExpired) return task.isExpired()
    })

    return tasksCopy
}

export default filterFor