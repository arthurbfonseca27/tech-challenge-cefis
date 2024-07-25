'use-client'

import { IconButton } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { CSS } from '@dnd-kit/utilities'
import { Column, Id, Task } from '@/types'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
// import { IoIosAdd } from 'react-icons/io'
import CardComponent from './CardComponent'
// import ModalNewTaskComponent from './ModalNewTaskComponent'

interface ColumnComponentProps {
  column: Column
  deleteColumn: (id: Id) => void
  updateColumn: (id: Id, title: string) => void
  createTask: (columnId: Id) => void
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
  tasks: Task[]
}

const ColumnComponent: React.FC<ColumnComponentProps> = ({
  column,
  deleteColumn,
  updateColumn,
  // createTask,
  deleteTask,
  updateTask,
  tasks,
}) => {
  const [editMode, setEditMode] = useState(false)
  // const {
  //   isOpen: isOpenNewTask,
  //   onOpen: onOpenNewTask,
  //   onClose: onCloseNewTask,
  // } = useDisclosure()

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundColor: column.color,
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-[600px] w-[500px] rounded-lg border-2 border-[#00A3FF] text-base font-medium opacity-40"
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, backgroundColor: column.color }}
      className="flex w-[500px] flex-col rounded-lg p-3 text-base font-medium"
    >
      <div className="rounded-lg text-black">
        <div
          {...attributes}
          {...listeners}
          className="flex cursor-grab flex-row items-center justify-between"
        >
          <div
            onClick={() => {
              setEditMode(true)
            }}
          >
            <div>
              {editMode ? (
                <input
                  className="border-1 items-start justify-start rounded border-black bg-[#67676766] outline-none"
                  value={column.title}
                  onChange={(e) => updateColumn(column.id, e.target.value)}
                  autoFocus
                  onBlur={() => {
                    setEditMode(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') return
                    setEditMode(false)
                  }}
                />
              ) : (
                <p className="w-fit max-w-80 truncate pb-4 pt-1">
                  {column.title}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            {column.id !== 1 && column.id !== 2 && column.id !== 3 && (
              <div className="text-[#394A53] hover:text-red-500">
                <IconButton
                  variant="solid"
                  bg="transparent"
                  _hover={{ bg: 'transparent', color: '#800000' }}
                  aria-label="Delete Column"
                  onClick={() => {
                    deleteColumn(column.id)
                  }}
                  icon={<MdDeleteOutline size={24} />}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex h-[500px] flex-grow flex-col gap-1 overflow-y-auto overflow-x-hidden">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <CardComponent
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </SortableContext>
        </div>
        {/* <div className="flex w-full flex-row items-center pt-4">
          <Button
            leftIcon={<IoIosAdd />}
            bgColor="transparent"
            variant="ghost"
            borderColor="#323232"
            width="full"
            onClick={() => {
              onOpenNewTask()
              createTask(column.id)
            }}
            _hover={{ bg: 'transparent' }}
          >
            Nova task
          </Button>
          <ModalNewTaskComponent
            isOpen={isOpenNewTask}
            onClose={onCloseNewTask}
          />
        </div> */}
      </div>
    </div>
  )
}

export default ColumnComponent
