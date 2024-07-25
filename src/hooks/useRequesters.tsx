async function getDefaultRequesters() {
  const response = await fetch('http://localhost:3000/api/requesters', {
    method: 'GET',
  })

  return response.json()
}

export default async function defaultRequestersFunction() {
  const requesters = await getDefaultRequesters()
  console.log(requesters)
  return requesters
}
