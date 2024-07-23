import { useState, useEffect } from 'react'

interface Task {
  priority: number
  taskName: string
  taskTag: {
    label: string
    value: string
  }
  assignees: {
    name: string
    avatar: string
  }[]
  projectName: string
  deadline: string
}

const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((response) => response.json())
      .then((data) => setTasks(data))
  }, [])

  return tasks
}

export default useTask
