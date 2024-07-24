async function getDefaultTasks() {
  const response = await fetch('http://localhost:3000/api/tasks', {
    method: 'GET',
  })
  //
  return response.json()
}

export default async function defaultTasks() {
  const tasks = await getDefaultTasks()
  console.log(tasks)
  return tasks
}
