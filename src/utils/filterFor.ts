import Status from "../enums/status";
import TaskItem from "../models/taskItem";

const filterFor = (tasks: TaskItem[], status: Status): TaskItem[] => {
    let tasksCopy = tasks
    tasksCopy = tasksCopy.filter((task: TaskItem) => task.status == status)

    return tasksCopy
}


export default filterFor