import SortOption from "../enums/sortOption"
import TaskItem from "../models/taskItem"

const sortBy = (tasks: TaskItem[], sortOption: SortOption) : TaskItem[]  => {
    let tasksCopy = tasks
    tasksCopy.sort((a, b) => {
        if (sortOption == SortOption.title) {
            return sortAlphabetically(a.title, b.title)
        }
        if (sortOption == SortOption.dateAdded) {
            return sortByDate(a.dateAdded, b.dateAdded)
        }
        if (sortOption == SortOption.dueDate) {
            return sortByDate(a.dueDate, b.dueDate)
        }
        return 0
    })
    return tasksCopy
}

const sortAlphabetically = (a: string, b: string): number => {
    return a.localeCompare(b)
}
  
const sortByDate = (a: Date, b: Date): number => {
    if (b < a) return 1
    if (a < b) return -1
    return 0
}

export default sortBy