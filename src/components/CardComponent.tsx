'use-client'

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
  AvatarGroup,
} from '@chakra-ui/react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { RxDividerVertical } from 'react-icons/rx'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import PriorityComponent from './PriorityComponent'
import TimerComponent from './TimerComponent'

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

  // if (editMode) {
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       style={style}
  //       {...attributes}
  //       {...listeners}
  //       className="flex cursor-grab flex-row items-center justify-between rounded-xl border-2 border-black bg-[#394A53] p-8 hover:ring-[#00A3FF]"
  //     >
  //       <div className="text-[#394A53] opacity-60 hover:text-red-500 hover:opacity-100">
  //         <textarea
  //           className="h-[90%] w-full resize-none rounded border-none bg-transparent text-black focus:outline-none"
  //           value={task.taskName}
  //           autoFocus
  //           placeholder="Conteúdo"
  //           onBlur={toggleEditMode}
  //           onKeyDown={(e) => {
  //             if (e.key === 'Enter' && e.shiftKey) {
  //               toggleEditMode()
  //             }
  //           }}
  //           onChange={(e) => updateTask(task.id, e.target.value)}
  //         ></textarea>
  //       </div>
  //     </div>
  //   )
  // }

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
              <Tag bg="#F5F5F5">
                <div className="flex w-full flex-row text-sm">
                  <span className="pr-2 font-bold text-[#00000066]">
                    {task.taskTag.label}
                  </span>
                  <span className="font-normal">{task.taskTag.value}</span>
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
            {task.executer.length > 1 ? (
              <AvatarGroup size="xs" max={2}>
                {task.executer.map((exec, index) => (
                  <Avatar key={index} name={exec.name} src={exec.avatar} />
                ))}
              </AvatarGroup>
            ) : (
              task.executer.map((exec, index) => (
                <div
                  key={index}
                  className="flex w-fit max-w-24 flex-row items-center gap-x-2"
                >
                  <Avatar name={exec.name} src={exec.avatar} size="xs" />
                  <p className="truncate">{exec.name}</p>
                </div>
              ))
            )}
            <RxDividerVertical color="#67676733" size={20} />
            <MdOutlineInventory2 color="#00000066" />
            <p className="max-w-xs truncate">{task.projectName}</p>
          </div>
          <div className="flex h-12 flex-row items-center justify-between pt-4">
            <Tag borderRadius="full" size="sm">
              <TagLeftIcon boxSize="12px" as={LuCalendar}></TagLeftIcon>
              <TagLabel>{task.deadline}</TagLabel>
            </Tag>
            <TimerComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardComponent
