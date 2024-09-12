import Status from '../enums/status'

interface TaskItemProps {
  id: number
  title: string
  status: Status
  dueDate: string
}

class TaskItem {
  readonly _id: number
  _title: string
  _status: Status
  _dueDate: string

  constructor(props: TaskItemProps) {
    this._id = props.id
    this._title = props.title
    this._status = props.status
    this._dueDate = props.dueDate
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

  isActive(): boolean {
    return this._status == Status.isActive
  }

  isCompleted(): boolean {
    return this._status == Status.isCompleted
  }

  isExpired(): boolean {
    return this._status == Status.isExpired
  }

  toggleComplete(): void {
    if (this.isCompleted()) {
      this.status = Status.isActive
    } else if (this.isActive()) {
      this.status = Status.isCompleted
    }
  }
}

export default TaskItem
