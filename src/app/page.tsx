'use client'

import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Box,
  Divider,
  AbsoluteCenter,
  Button,
} from '@chakra-ui/react'
import { IoIosSearch } from 'react-icons/io'
import { IoChevronDown } from 'react-icons/io5'
import CardComponent from '@/components/CardComponent'
import React, { useEffect, useState } from 'react'

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

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((response) => response.json())
      .then((data) => setTasks(data))
  }, [])

  console.log(tasks)

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-6 px-20 pt-10">
        <div className="flex flex-row items-center justify-center gap-x-4">
          <div className="w-full pt-5">
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
          <div className="flex w-9/12 flex-col items-start">
            <Box
              position="relative"
              top="2.5"
              left="4"
              px="1.5"
              zIndex="10"
              bg="#FFFFFF"
            >
              <p className="items-start text-sm">Executante</p>
            </Box>
            <Select placeholder="Todos" size="lg" borderRadius="lg">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </div>
          <div className="flex w-9/12 flex-col items-start">
            <Box
              position="relative"
              top="2.5"
              left="4"
              px="1.5"
              zIndex="10"
              bg="#FFFFFF"
            >
              <p className="items-start text-sm">Solicitante</p>
            </Box>
            <Select placeholder="Todos" size="lg" borderRadius="lg">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </div>
          <div className="flex w-9/12 flex-col items-start">
            <Box
              position="relative"
              top="2.5"
              left="4"
              px="1.5"
              zIndex="10"
              bg="#FFFFFF"
            >
              <p className="items-start text-sm">Projetos</p>
            </Box>
            <Select placeholder="Todos" size="lg" borderRadius="lg">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </div>
          <div className="flex w-9/12 flex-col items-start">
            <Box
              position="relative"
              top="2.5"
              left="4"
              px="1.5"
              zIndex="10"
              bg="#FFFFFF"
            >
              <p className="items-start text-sm">Tipo</p>
            </Box>
            <Select placeholder="Todos" size="lg" borderRadius="lg">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-3">
          <div className="h-fit w-full text-base font-medium">
            <Box bg="#F5F5F5" color="black" borderRadius="lg" px="3" pb="3">
              <p className="py-4">Não iniciada</p>
              {tasks.map((task, index) => (
                <CardComponent key={index} {...task} />
              ))}
            </Box>
          </div>
          <div className="h-fit w-full text-base font-medium">
            <Box bg="#C9F5FF66" color="black" borderRadius="lg" px="3">
              <p className="py-4">Iniciada</p>
              <Box position="relative" py="8">
                <Divider color="#394A5333" />
                <AbsoluteCenter px="4" bg="#e9fbff">
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    rightIcon={<IoChevronDown />}
                    borderColor="#394A5333"
                    borderRadius="6px"
                    color="#000000"
                    fontWeight="normal"
                  >
                    <div className="flex flex-row gap-1">
                      <span>Amanhã ou depois</span>
                      <span className="text-[#00000066]">· 2</span>
                    </div>
                  </Button>
                </AbsoluteCenter>
              </Box>
            </Box>
          </div>
          <div className="h-fit w-full text-base font-medium">
            <Box bg="#D8FDD266" color="black" borderRadius="lg" px="3" pb="3">
              <p className="py-4">Concluída</p>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}
