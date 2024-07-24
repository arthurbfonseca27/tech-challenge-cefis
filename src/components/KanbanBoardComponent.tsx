import React, { useMemo, useState } from 'react'
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

const KanbanBoardComponent = () => {
  const defaultColumns: Column[] = [
    { id: generateId(), title: 'Não Iniciado', color: '#C9F5FF66' },
    { id: generateId(), title: 'Iniciadas', color: '#D8FDD266' },
    { id: generateId(), title: 'Concluído', color: '#F5F5F5' },
  ]
  const [columns, setColumns] = useState<Column[]>(defaultColumns)
  const defaultTasks: Task[] = [
    { id: generateId(), columnId: defaultColumns[0].id, content: 'Task 1' },
    { id: generateId(), columnId: defaultColumns[1].id, content: 'Task 2' },
    { id: generateId(), columnId: defaultColumns[2].id, content: 'Task 3' },
  ]
  const [tasks, setTasks] = useState<Task[]>(defaultTasks)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = React.useState('')
  const [color, setColor] = React.useState('#C9F5FF66')
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px
      },
    }),
  )

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
    onClose()
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

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    }

    setTasks([...tasks, newTask])
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
      <div className="flex flex-row gap-4">
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
        <div className="pr-20">
          <Button
            leftIcon={<IoIosAdd />}
            variant="outline"
            borderColor="#67676733"
            onClick={onOpen}
          >
            Adicionar coluna
          </Button>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
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
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnComponent
              column={activeColumn}
              deleteColumn={deleteColumn}
              updateColumn={updateColumn}
              createTask={createTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
              tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
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
