import React, { useState } from 'react'
import { Id, Task } from '@/types'
import { MdDeleteOutline, MdOutlineInventory2 } from 'react-icons/md'
import { LuCalendar } from 'react-icons/lu'
import {
  IconButton,
  Tag,
  Avatar,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { RxDividerVertical } from 'react-icons/rx'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import PriorityComponent from './PriorityComponent'

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
        className="task flex cursor-grab flex-row items-center justify-between rounded-xl border-2 border-[#FFFFFF] bg-[#FFFFFF] p-16 opacity-50"
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
      className="task hover:ring-[#00A3FF]mb-4 flex h-fit cursor-grab flex-row items-center justify-between overflow-hidden rounded-lg border-black border-transparent bg-[#FFFFFF] active:cursor-grabbing"
    >
      <div className="flex w-full flex-row">
        <PriorityComponent priority={1} />
        <div className="flex w-full flex-col py-4 pl-4">
          <div className="flex w-full flex-row items-center justify-between">
            <p className="overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
              {task.content}
            </p>
            <div className="flex flex-row items-center gap-x-10 pr-4">
              <Tag bg="#F5F5F5">
                <div className="flex w-full flex-row text-sm">
                  <span className="pr-2 font-bold text-[#00000066]">DTT</span>
                  <span className="font-normal">+1000</span>
                </div>
              </Tag>
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
          </div>
          <div className="flex flex-row items-center gap-x-2 pt-4 text-sm text-[#00000099]">
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              size="xs"
            />
            <p>Lorem</p>
            <FaArrowRightLong color="#BEBEBE" />
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              size="xs"
            />
            <p>Gabriel</p>
            <RxDividerVertical color="#67676733" size={20} />
            <MdOutlineInventory2 color="#00000066" />
            <p>Nome do projeto</p>
          </div>
          <div className="pt-4">
            <Tag borderRadius="full" size="sm">
              <TagLeftIcon boxSize="12px" as={LuCalendar}></TagLeftIcon>
              <TagLabel>Prazo máximo: hoje às 12h</TagLabel>
            </Tag>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardComponent
