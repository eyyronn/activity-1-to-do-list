export interface TaskItem{
    id : number
    title: string
    isCompleted: boolean
}

export interface TaskList{
    tasks : TaskItem[]
    addTask(task : TaskItem) : void
    removeTask(taskID : number) : void
}
