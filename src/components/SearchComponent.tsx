import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { IoIosSearch } from 'react-icons/io'
import React, { useState } from 'react'
import SelectComponent from '@/components/FilterComponent'
import { Column, Task } from '@/types'

interface SearchComponentProps {
  columns: Column[]
  tasks: Task[]
  onFilterColumnChange: (ids: string[]) => void
  onFilterExecuterChange: (values: string[]) => void
  onFilterRequesterChange: (values: string[]) => void
  onFilterProjectChange: (values: string[]) => void
  onSearchChange: (searchTerm: string) => void
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  columns,
  tasks,
  onFilterColumnChange,
  onFilterExecuterChange,
  onFilterRequesterChange,
  onFilterProjectChange,
  onSearchChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Choose all
  const handleColumnChange = (values: string[]) => {
    onFilterColumnChange(values.includes('all') ? [] : values)
  }

  // Filter by executers
  const handleExecuterChange = (values: string[]) => {
    onFilterExecuterChange(values.includes('all') ? [] : values)
  }

  // Filter by requesters
  const handleRequesterChange = (values: string[]) => {
    onFilterRequesterChange(values.includes('all') ? [] : values)
  }

  // Filter by projects names
  const handleProjectChange = (values: string[]) => {
    onFilterProjectChange(values.includes('all') ? [] : values)
  }

  // Filter by text input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)
    onSearchChange(term)
  }

  // Function to get unique options for executer
  const getUniqueExecuters = (tasks: Task[]) => {
    const uniqueExecuters = Array.from(
      new Set(tasks.map((task) => task.executer.name)),
    )
    return [
      ...uniqueExecuters.map((executer) => ({
        label: executer,
        value: executer,
      })),
    ]
  }

  // Function to get unique options for requester
  const getUniqueRequesters = (tasks: Task[]) => {
    const uniqueRequesters = Array.from(
      new Set(tasks.map((task) => task.requester.name)),
    )
    return [
      ...uniqueRequesters.map((requester) => ({
        label: requester,
        value: requester,
      })),
    ]
  }

  // Function to get unique options for project names
  const getUniqueProjects = (tasks: Task[]) => {
    const uniqueProjects = Array.from(
      new Set(tasks.map((task) => task.projectName)),
    )
    return [
      ...uniqueProjects.map((project) => ({
        label: project,
        value: project,
      })),
    ]
  }

  // Function to get unique options for columns
  const getUniqueColumns = (columns: Column[]) => {
    return [
      ...columns.map((column) => ({
        label: column.title,
        value: column.id.toString(),
      })),
    ]
  }

  return (
    <div className="flex flex-row max-md:justify-center">
      <div className="flex w-screen max-w-[1300px] flex-row items-center justify-start gap-x-4 pb-6 outline-none max-md:max-w-fit max-md:flex-col max-md:justify-center">
        <div className="w-96 pt-5 max-md:w-72 max-sm:justify-center">
          <InputGroup size="lg" bg="#F5F5F5" borderRadius="lg">
            <InputLeftElement pointerEvents="none">
              <IoIosSearch color="#000000" size={24} />
            </InputLeftElement>
            <Input
              placeholder="Id, título ou descrição"
              pl="12"
              fontSize="16px"
              borderColor="#67676766"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </div>
        <SelectComponent
          title="Executante"
          options={getUniqueExecuters(tasks)}
          onChange={handleExecuterChange}
        />
        <SelectComponent
          title="Solicitante"
          options={getUniqueRequesters(tasks)}
          onChange={handleRequesterChange}
        />
        <SelectComponent
          title="Projetos"
          options={getUniqueProjects(tasks)}
          onChange={handleProjectChange}
        />
        <SelectComponent
          title="Tipo"
          options={getUniqueColumns(columns)}
          onChange={handleColumnChange}
        />
      </div>
    </div>
  )
}

export default SearchComponent
