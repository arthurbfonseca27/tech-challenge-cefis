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
  Textarea,
  Select,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { FaCheckCircle, FaCheck } from 'react-icons/fa'
import { PiUserCircleFill } from 'react-icons/pi'
import { MdOutlineSort, MdEventAvailable } from 'react-icons/md'
import DropDownMenuComponent from './DropDownMenuComponent'
import defaultExecuters from '../hooks/useExecuters'
import { Option, Column, Id } from '@/types'

interface ModalComponentProps {
  columns: Column[]
  isOpen: boolean
  onClose: () => void
  createTask: (columnId: Id) => void
  onTitleChange?: (title: string) => void
  onDescriptionChange?: (description: string) => void
  onExecuterChange?: (executer: string) => void
  onPriorityChange?: (priority: Option) => void
  onStatusChange?: (status: Option) => void
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
  onTitleChange = () => {},
  onDescriptionChange = () => {},
  onExecuterChange = () => {},
  onPriorityChange = () => {},
  onStatusChange = () => {},
}) => {
  const handleSelectedPriorityChange = (option: Option) => {
    setSelectedPriority(option)
    onPriorityChange(option)
  }

  const handleSelectedStatusChange = (option: Option) => {
    setSelectedStatus(option)
    onStatusChange(option)
  }

  const priority: Option[] = [
    { priority: 3, title: 'Baixa', id: 'Low' },
    { priority: 2, title: 'Média', id: 'Medium' },
    { priority: 1, title: 'Alta', id: 'High' },
  ]

  const status = columns?.map(({ title, id, color }) => ({
    title,
    id,
    color,
  }))

  // Fetching executers
  useEffect(() => {
    async function fetchExecuters() {
      const data = await defaultExecuters()
      setExecuters(data.executers)
    }

    fetchExecuters()
  }, [])

  const [executers, setExecuters] = useState<Executer[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedExecuter, setSelectedExecuter] = useState<string | null>(null)
  const [selectedPriority, setSelectedPriority] = useState<Option | null>(
    priority[0],
  )
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(
    columns?.length > 0 ? status[0] : null,
  )

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    onTitleChange(newTitle)
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newDescription = e.target.value
    setDescription(newDescription)
    onDescriptionChange(newDescription)
  }

  const handleExecuterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newExecuter = e.target.value
    setSelectedExecuter(newExecuter)
    onExecuterChange(newExecuter)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="pt-5 text-base">
              <Textarea
                fontSize="14px"
                placeholder="Clique para adicionar uma descrição"
                fontWeight="normal"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="pt-5">
              <TableContainer pb="115px">
                <Table variant="simple" size="xs">
                  <Tbody>
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
                        <div className="relative right-32 w-fit">
                          <Select
                            fontSize="14px"
                            variant="ghost"
                            placeholder="Selecione uma pessoa"
                            value={selectedExecuter || ''}
                            onChange={handleExecuterChange}
                          >
                            {executers.map((executer, index) => (
                              <option key={index} value={executer.name}>
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
                        <div className="relative right-32">
                          <DropDownMenuComponent
                            options={priority}
                            selected={selectedPriority}
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
                        <div className="relative right-32 w-full justify-center">
                          <div className="flex flex-row items-center">
                            <Input
                              width="fit"
                              border="0px"
                              placeholder="Select Date and Time"
                              size="md"
                              type="date"
                            />
                          </div>
                        </div>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <div className="flex flex-row items-center gap-2 py-4 text-sm text-[#00000066]">
                          <MdOutlineSort color="#000000" size={18} />
                          <p className="text-sm text-[#00000066]">Status</p>
                        </div>
                      </Td>
                      <Td>
                        <div className="relative right-32">
                          <DropDownMenuComponent
                            options={status}
                            selected={selectedStatus}
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
              color="#FFFFFF"
              onClick={() => {
                if (selectedStatus) {
                  createTask(selectedStatus.id!)
                }
              }}
              disabled={!selectedStatus}
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
