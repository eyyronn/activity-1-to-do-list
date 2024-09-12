import SortOption from "../enums/sortOption"
import TaskItem from "../models/taskItem"

const sortBy = (tasks: TaskItem[], sortOption: SortOption) : TaskItem[]  => {
    let tasksCopy = tasks
    tasksCopy.sort((a, b) => {
        switch (sortOption) {
            case SortOption.title:
                return sortAlphabetically(a.title, b.title)

            case SortOption.dateAdded:
                return sortByDate(a.dateAdded, b.dateAdded)
                
            case SortOption.dueDate:
                return sortByDate(a.dueDate, b.dueDate)
        }
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