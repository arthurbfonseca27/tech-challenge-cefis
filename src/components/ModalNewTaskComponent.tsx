// Modal used to create a new task
import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Input,
  Select,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { FaCheckCircle, FaCheck } from 'react-icons/fa'
import { PiUserCircleFill } from 'react-icons/pi'
import {
  MdOutlineSort,
  MdEventAvailable,
  MdOutlineNotStarted,
} from 'react-icons/md'
import DropDownMenuComponent from './DropDownMenuComponent'
import defaultExecuters from '../hooks/useExecuters'
import { Option, Column, Id } from '@/types'
import { useTaskStore } from '../store/tasks/index'
import DatePickerComponent from './DatePickerComponent'
import { HiMiniPencilSquare } from 'react-icons/hi2'
import { useMediaQuery } from 'usehooks-ts'

interface ModalComponentProps {
  columns: Column[]
  isOpen: boolean
  onClose: () => void
  createTask: (columnId: Id) => void
}

interface Executer {
  name: string
  avatar: string
}

const ModalNewTaskComponent: React.FC<ModalComponentProps> = ({
  columns,
  isOpen,
  onClose,
  createTask,
}) => {
  const {
    titleTask,
    executerTask,
    priorityTask,
    statusTask,
    projectNameTask,
    setTitleTask,
    setExecuterTask,
    setPriorityTask,
    setStatusTask,
    setProjectNameTask,
  } = useTaskStore()

  const handleSelectedPriorityChange = (option: Option) => {
    setPriorityTask(option)
  }

  const handleSelectedStatusChange = (option: Option) => {
    setStatusTask(option)
  }

  const priorityOptions: Option[] = [
    { priority: 3, title: 'Baixa', id: 'Low' },
    { priority: 2, title: 'Média', id: 'Medium' },
    { priority: 1, title: 'Alta', id: 'High' },
  ]

  const statusOptions = columns?.map(({ title, id, color }) => ({
    title,
    id,
    color,
  }))

  // Fetching local and by API default executers
  const [executers, setExecuters] = useState<Executer[]>([])

  useEffect(() => {
    const localExecuters: Executer[] = [
      {
        name: 'Ana Oliveira',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      },

      {
        name: 'Pedro Santos',
        avatar:
          'https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },

      {
        name: 'Larissa Nogueira',
        avatar:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },

      {
        name: 'Gustavo Ribeiro',
        avatar:
          'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ]

    async function fetchExecuters() {
      try {
        const data = await defaultExecuters()
        setExecuters([...localExecuters, ...data.executers])
      } catch (error) {
        setExecuters([...localExecuters])
      }
    }

    fetchExecuters()
  }, [])

  const isMaxSm = useMediaQuery('(max-width: 640px)')

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={isMaxSm ? 'sm' : 'xl'}>
      <div className="h-fit w-full">
        <ModalOverlay />
        <ModalContent>
          <div className="flex flex-row items-center gap-2 px-5 pb-2 pt-3 text-lg">
            <FaCheckCircle size={16} />
            <p className="font-medium">Nova Task</p>
          </div>
          <div className="px-6">
            <Divider />
          </div>
          <ModalCloseButton />
          <ModalBody>
            <div className="pt-1">
              <Input
                variant="flushed"
                placeholder="Task sem título"
                size="md"
                focusBorderColor="#00A3FF"
                value={titleTask}
                onChange={(e) => setTitleTask(e.target.value)}
              />
            </div>
            <div className="pt-5">
              <TableContainer pb="115px">
                <Table variant="simple" size="xs">
                  <Tbody>
                    <Tr>
                      <Td>
                        <div className="flex flex-row items-center gap-2 pb-2 pt-4 text-sm text-[#00000066]">
                          <HiMiniPencilSquare color="#000000" size={18} />
                          <p className="text-sm text-[#00000066]">
                            Nome do projeto
                          </p>
                        </div>
                      </Td>
                      <Td>
                        <div className="flex w-fit items-center">
                          <Input
                            placeholder="Digite aqui"
                            fontSize="14px"
                            size="sm"
                            variant="ghost"
                            value={projectNameTask}
                            onChange={(e) => setProjectNameTask(e.target.value)}
                          />
                        </div>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <div className="flex flex-row items-center gap-2 pb-2 pt-4 text-sm text-[#00000066]">
                          <PiUserCircleFill color="#000000" size={18} />
                          <p className="text-sm text-[#00000066]">
                            Quem vai fazer?
                          </p>
                        </div>
                      </Td>
                      <Td>
                        <div className="w-fit">
                          <Select
                            left="-5px"
                            color={`${executerTask?.name ? '' : '#a3aab5'}`}
                            fontSize="14px"
                            variant="ghost"
                            placeholder="Selecione uma pessoa"
                            value={executerTask?.name || ''}
                            onChange={(e) => {
                              const selectedExecuter = executers.find(
                                (executer) => executer.name === e.target.value,
                              )
                              if (selectedExecuter) {
                                setExecuterTask(selectedExecuter)
                              }
                            }}
                          >
                            {executers.map((executer) => (
                              <option key={executer.name} value={executer.name}>
                                {executer.name}
                              </option>
                            ))}
                          </Select>
                        </div>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <div className="flex flex-row items-center gap-2 py-4 text-sm text-[#00000066]">
                          <MdOutlineSort color="#000000" size={18} />
                          <p className="text-sm text-[#00000066]">Prioridade</p>
                        </div>
                      </Td>
                      <Td>
                        <div className="">
                          <DropDownMenuComponent
                            options={priorityOptions}
                            selected={priorityTask}
                            onSelectedChanges={handleSelectedPriorityChange}
                          />
                        </div>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <div className="flex flex-row items-center gap-2 py-4 text-sm text-[#00000066]">
                          <MdEventAvailable color="#000000" size={18} />
                          <p className="text-sm text-[#00000066]">Prazo</p>
                        </div>
                      </Td>
                      <Td>
                        <div className="w-full justify-center">
                          <div className="flex flex-row items-center">
                            <DatePickerComponent />
                          </div>
                        </div>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <div className="flex flex-row items-center gap-2 py-4 text-sm text-[#00000066]">
                          <MdOutlineNotStarted color="#000000" size={18} />
                          <p className="text-sm text-[#00000066]">Status</p>
                        </div>
                      </Td>
                      <Td>
                        <div className="">
                          <DropDownMenuComponent
                            options={statusOptions}
                            selected={statusTask}
                            onSelectedChanges={handleSelectedStatusChange}
                          />
                        </div>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              borderColor="#000000"
              mr={3}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              leftIcon={<FaCheck />}
              variant="solid"
              bgColor="#00A3FF"
              _hover={{ bg: '#5FC4FF' }}
              color="#FFFFFF"
              onClick={() => {
                if (statusTask && statusTask.id) {
                  createTask(statusTask.id)
                }
              }}
              disabled={!statusTask || !statusTask.id}
            >
              Salvar Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </div>
    </Modal>
  )
}

export default ModalNewTaskComponent
