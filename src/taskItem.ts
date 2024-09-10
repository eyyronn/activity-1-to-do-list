import Status from "./status"

class TaskItem {
    readonly _id : number
    _title: string
    _status: Status
    _dueDate: string

    constructor(id : number, title: string, status: Status, dueDate: string) {
        this._id = id
        this._title = title
        this._status = status
        this._dueDate = dueDate
    }

    get id() {
        return this._id
    }

    get title() {
        return this._title
    }

    get dateAdded() {
        return new Date(this._id)
    }

    get dueDate() {
        return new Date(this._dueDate)
    }

    set status(newStatus: Status) {
        this._status = newStatus
    }

    isActive() {
        return this._status == Status.isActive
    }

    isCompleted() {
        return this._status == Status.isCompleted
    }

    isExpired() {
        return this._status == Status.isExpired
    }

    toggleComplete() : void {
        if (this.isCompleted()) {
            this.status = Status.isActive
        }
        else if (this.isActive()) {
            this.status = Status.isCompleted
        }
    }
    }

export default TaskItem