export type Id = string | number

export type Column = {
  id: Id
  title: string
  color: string
}

export type Task = {
  id: Id
  columnId: Id
  priority: number
  taskName: string
  requester: {
    name: string
    avatar: string
  }
  executer: {
    name: string
    avatar: string
  }
  projectName: string
  deadline: string
  dtt: boolean
}

export type Option = {
  priority?: number
  title: string
  id?: Id
  color?: string
}
