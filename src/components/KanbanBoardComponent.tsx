'use client'

import React, { useEffect, useMemo, useState } from 'react'
import ColumnComponent from './ColumnComponent'
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Box,
  HStack,
} from '@chakra-ui/react'
import { IoIosAdd } from 'react-icons/io'
import { Column, Id, Task } from '@/types'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import CardComponent from './CardComponent'
import defaultTasks from '../hooks/useTasks'
import SearchComponent from './SearchComponent'
import ModalNewTaskComponent from './ModalNewTaskComponent'
import defaultRequestersFunction from '../hooks/useRequesters'
import { useTaskStore } from '../store/tasks/index'
import { differenceInDays } from 'date-fns'

const KanbanBoardComponent = () => {
  // Fetching default columns
  const defaultColumns: Column[] = [
    { id: 1, title: 'Não Iniciado', color: '#F5F5F5' },
    { id: 2, title: 'Iniciadas', color: '#C9F5FF66' },
    { id: 3, title: 'Concluído', color: '#D8FDD266' },
  ]

  const { titleTask, executerTask, priorityTask, dateTask, projectNameTask } =
    useTaskStore()

  const today = new Date()

  // Fetching default tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const defaultFetchedTasks = await defaultTasks()
      setTasks(defaultFetchedTasks)
    }

    fetchTasks()
  }, [])

  const [requesters, setRequesters] = useState([])
  const [selectedRequester, setSelectedRequester] = useState<
    Task['requester'] | null
  >(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [columns, setColumns] = useState<Column[]>(defaultColumns)
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('#C9F5FF66')
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  // Fetching default requesters
  useEffect(() => {
    async function fetchRequester() {
      const data = await defaultRequestersFunction()
      setRequesters(data.requesters)
    }
    fetchRequester()
  }, [])

  const getRandomRequester = () => {
    const randomRequester =
      requesters[Math.floor(Math.random() * requesters.length)]
    setSelectedRequester(randomRequester)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px
      },
    }),
  )

  const {
    isOpen: isOpenNewColumn,
    onOpen: onOpenNewColumn,
    onClose: onCloseNewColumn,
  } = useDisclosure()
  const {
    isOpen: isOpenNewTask,
    onOpen: onOpenNewTask,
    onClose: onCloseNewTask,
  } = useDisclosure()

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value)

  const selectColor = (color: string) => setColor(color)

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title,
      color,
    }
    setColumns([...columns, columnToAdd])
    onCloseNewColumn()
    setTitle('')
    setColor('#C9F5FF66')
  }

  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((col) => col.id !== id)
    setColumns(filteredColumns)

    const newTasks = tasks.filter((t) => t.columnId !== id)
    setTasks(newTasks)
  }

  const updateColumn = (id: Id, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col
      return { ...col, title }
    })

    setColumns(newColumns)
  }

  const handleOpenNewTask = () => {
    getRandomRequester()
    onOpenNewTask()
  }

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      priority: priorityTask?.priority ?? 0,
      taskName: titleTask,
      requester: {
        name: selectedRequester?.name ?? '',
        avatar: selectedRequester?.avatar ?? '',
      },
      executer: {
        name: executerTask?.name ?? '',
        avatar: executerTask?.avatar ?? '',
      },
      projectName: projectNameTask,
      deadline: dateTask ? differenceInDays(dateTask, today).toString() : '',
      dtt: dateTask ? differenceInDays(dateTask, today) > 10 : false,
    }

    setTasks([...tasks, newTask])
    onCloseNewTask()
  }

  const deleteTask = (id: Id) => {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }

  const updateTask = (id: Id, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task
      return { ...task, content }
    })
    setTasks(newTasks)
  }

  const onDragStart = (event: DragStartEvent) => {
    console.log('DRAG START', event)
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event

    if (!over) return

    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId,
      )

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId,
      )

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (!isActiveATask) return

    // Dropping a Task over another task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)

        tasks[activeIndex].columnId = tasks[overIndex].columnId

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    // Dropping a Task over a column
    const isOverAColumn = over.data.current?.type === 'Column'

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)

        tasks[activeIndex].columnId = overId

        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  const colors = [
    { value: '#C9F5FF66' },
    { value: '#D8FDD266' },
    { value: '#F5F5F5' },
    { value: '#FFD70066' },
    { value: '#FFB6C166' },
  ]

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex flex-row gap-4 pb-2">
        <Button
          leftIcon={<IoIosAdd />}
          variant="outline"
          borderColor="#67676733"
          onClick={onOpenNewColumn}
        >
          Adicionar coluna
        </Button>

        <Button
          leftIcon={<IoIosAdd />}
          variant="outline"
          borderColor="#67676733"
          onClick={handleOpenNewTask}
        >
          Adicionar Task
        </Button>
        <ModalNewTaskComponent
          isOpen={isOpenNewTask}
          onClose={onCloseNewTask}
          columns={columns}
          createTask={createTask}
        />
      </div>
      <SearchComponent />
      <div className="flex flex-row">
        <div className="flex w-fit flex-row justify-center gap-3">
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <ColumnComponent
                key={column.id}
                column={column}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === column.id)}
              />
            ))}
          </SortableContext>
        </div>
        <Modal isOpen={isOpenNewColumn} onClose={onCloseNewColumn}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar coluna</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p className="pb-1 font-medium">Título:</p>
              <Input
                value={title}
                onChange={handleTitleChange}
                placeholder="Digite o título da coluna"
                size="md"
              />
              <p className="pb-1 pt-4 font-medium">Cor:</p>
              <HStack spacing={2}>
                {colors.map((colorOption) => (
                  <Box
                    key={colorOption.value}
                    backgroundColor={colorOption.value}
                    borderRadius="full"
                    p={3}
                    borderWidth={color === colorOption.value ? 2 : 1}
                    borderColor={
                      color === colorOption.value ? '#323232' : 'gray.200'
                    }
                    onClick={() => selectColor(colorOption.value)}
                  ></Box>
                ))}
              </HStack>
            </ModalBody>
            <ModalFooter>
              <Button
                borderColor="#323232"
                variant="outline"
                mr={3}
                onClick={createNewColumn}
              >
                Adicionar
              </Button>
              <Button variant="ghost" onClick={onCloseNewColumn}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      {typeof window !== 'undefined' &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnComponent
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id,
                )}
              />
            )}
            {activeTask && (
              <CardComponent
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  )
}

function generateId() {
  return Math.floor(Math.random() * 10001)
}

export default KanbanBoardComponent
