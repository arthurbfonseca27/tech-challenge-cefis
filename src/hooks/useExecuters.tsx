// Fetch the task data from /executers

async function getDefaultExecuters() {
  const response = await fetch('http://localhost:3000/api/executers', {
    method: 'GET',
  })

  return response.json()
}

export default async function defaultExecuters() {
  const executers = await getDefaultExecuters()
  console.log(executers)
  return executers
}
