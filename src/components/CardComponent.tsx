import React, { useState } from 'react'
import { Id, Task } from '@/types'
import { MdDeleteOutline } from 'react-icons/md'
import { IconButton } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  task: Task
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
}

const CardComponent = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="task flex cursor-grab flex-row items-center justify-between rounded-xl border-2 border-[#00A3FF] border-black p-8 opacity-30"
      />
    )
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex cursor-grab flex-row items-center justify-between rounded-xl border-2 border-black bg-[#394A53] p-8 hover:ring-[#00A3FF]"
      >
        <div className="text-[#394A53] opacity-60 hover:text-red-500 hover:opacity-100">
          <textarea
            className="h-[90%] w-full resize-none rounded border-none bg-transparent text-black focus:outline-none"
            value={task.content}
            autoFocus
            placeholder="Conteúdo"
            onBlur={toggleEditMode}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.shiftKey) {
                toggleEditMode()
              }
            }}
            onChange={(e) => updateTask(task.id, e.target.value)}
          ></textarea>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
      className="task flex cursor-grab flex-row items-center justify-between rounded-xl border-2 border-black p-8 hover:ring-[#00A3FF]"
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseIsOver && (
        <div className="text-[#394A53] opacity-60 hover:text-red-500 hover:opacity-100">
          <IconButton
            onClick={() => {
              deleteTask(task.id)
            }}
            variant="solid"
            bg="transparent"
            _hover={{ bg: 'transparent', color: '#800000' }}
            aria-label="Delete Column"
            icon={<MdDeleteOutline size={24} />}
          />
        </div>
      )}
    </div>
  )
}

export default CardComponent
