import { useState, useEffect } from 'react'
import { Task } from '@/types'

const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((response) => response.json())
      .then((data) =>
        setTasks(
          data.map((task: Task) => ({
            priority: task.priority,
            taskName: task.taskName,
            taskTag: task.taskTag,
            requester: task.requester,
            executer: task.executer,
            projectName: task.projectName,
            deadline: task.deadline,
          })),
        ),
      )
  }, [])

  return tasks
}

export default useTask
