'use client'

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { IoIosSearch } from 'react-icons/io'
import React, { useEffect, useState } from 'react'
import SelectComponent from '@/components/SelectComponent'
import KanbanBoardComponent from '@/components/KanbanBoardComponent'
import { Task } from '@/types'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((response) => response.json())
      .then((data) => setTasks(data))
  }, [])

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-6 px-20 pt-10">
        <div className="flex max-w-[84%] flex-row items-center justify-center gap-x-4">
          <div className="w-5/12 pt-5">
            <InputGroup size="lg" bg="#F5F5F5" borderRadius="lg">
              <InputLeftElement pointerEvents="none">
                <IoIosSearch color="#000000" size={24} />
              </InputLeftElement>
              <Input
                placeholder="Id, título ou descrição"
                pl="12"
                fontSize="16px"
              />
            </InputGroup>
          </div>
          <SelectComponent
            title="Executante"
            options={['Opção 1', 'Opção 2', 'Opção 3']}
          />
          <SelectComponent
            title="Solicitante"
            options={['Opção 1', 'Opção 2', 'Opção 3']}
          />
          <SelectComponent
            title="Projetos"
            options={['Opção 1', 'Opção 2', 'Opção 3']}
          />
          <SelectComponent
            title="Tipo"
            options={['Opção 1', 'Opção 2', 'Opção 3']}
          />
        </div>
        <KanbanBoardComponent tasksFetched={tasks} />
      </div>
    </div>
  )
}
