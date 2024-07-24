async function getDefaultColumns() {
  const response = await fetch('http://localhost:3000/api/columns', {
    method: 'GET',
  })
  //
  return response.json()
}

export default async function defaultColumns() {
  const columns = await getDefaultColumns()
  console.log(columns)
  return columns
}
