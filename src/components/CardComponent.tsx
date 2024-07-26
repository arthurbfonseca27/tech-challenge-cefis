'use-client'

import React, { useState } from 'react'
import { Id, Task } from '@/types'
import { MdDeleteOutline, MdOutlineInventory2 } from 'react-icons/md'
import { IconButton, Tag, Avatar } from '@chakra-ui/react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { RxDividerVertical } from 'react-icons/rx'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import PriorityComponent from './PriorityComponent'
import TimerComponent from './TimerComponent'
import Calendar from '../icons/Calendar'

interface Props {
  task: Task
  deleteTask: (id: Id) => void
  updateTask?: (id: Id, content: string) => void
}

const CardComponent = ({ task, deleteTask }: Props) => {
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
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="task border-[# ] flex cursor-grab flex-row items-center justify-between rounded-xl border-2 bg-[#FFFFFF] p-16 opacity-50"
      />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="task mb-4 flex h-fit min-h-40 cursor-grab flex-row items-center justify-between overflow-hidden rounded-xl border-black border-transparent bg-[#FFFFFF] hover:border hover:border-[#00A3FF] active:cursor-grabbing"
    >
      <div className="flex w-full flex-row">
        <PriorityComponent priority={task.priority} />
        <div className="flex w-full flex-col py-4 pl-4 pr-6">
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="flex w-fit flex-row items-center gap-5">
              <p className="max-w-56 truncate">{task.taskName}</p>
              <Tag
                bg={`${task.dtt ? '#D8FDD2' : '#F4E3E3'}`}
                borderRadius="full"
              >
                <div className="flex w-full flex-row text-sm">
                  <span className="pr-2 font-bold text-[#00000066]">DTT</span>
                  <span className="font-normal">
                    {task.dtt ? '+1000' : '-100'}
                  </span>
                </div>
              </Tag>
            </div>
            <div className="flex flex-row items-center gap-x-10 pr-4">
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
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-2 pt-4 text-sm text-[#00000099]">
            <div className="flex w-fit max-w-24 flex-row items-center gap-x-2">
              <Avatar
                name={task.requester.name}
                src={task.requester.avatar}
                size="xs"
              />
              <p className="max-w-xs truncate">{task.requester.name}</p>
            </div>
            <FaArrowRightLong color="#BEBEBE" />
            <div className="flex w-fit max-w-24 flex-row items-center gap-x-2">
              <Avatar
                name={task.executer.name}
                src={task.executer.avatar}
                size="xs"
              />
              <p className="truncate">{task.executer.name}</p>
            </div>
            <RxDividerVertical color="#67676733" size={20} />
            <MdOutlineInventory2 color="#00000066" />
            <p className="max-w-xs truncate">{task.projectName}</p>
          </div>
          <div className="flex h-12 flex-row items-center justify-between pt-4">
            <div className="flex flex-row items-center gap-2 text-sm text-[#00000099]">
              <Calendar />
              <p>Prazo máximo: {task.deadline} dias</p>
            </div>
            <TimerComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardComponent
