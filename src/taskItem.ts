class TaskItem {
    readonly _id : number
    _title: string
    _isCompleted: boolean

    constructor(id : number, title: string, isCompleted: boolean) {
        this._id = id
        this._title = title
        this._isCompleted = isCompleted
    }

    get id() {
        return this._id
    }

    get title() {
        return this._title
    }

    get isCompleted() {
        return this._isCompleted
    }

    toggleComplete() : void {
        this._isCompleted = !this._isCompleted
    }
    }

export default TaskItem