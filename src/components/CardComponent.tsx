import React from 'react'
import PriorityComponent from './PriorityComponent'
import { Tag, Avatar } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'
import { LuCalendar } from 'react-icons/lu'
import { MdOutlineInventory2, MdOutlineTimer } from 'react-icons/md'
import { TbMinusVertical } from 'react-icons/tb'

interface Assignee {
  name: string
  avatar: string
}

interface CardComponentProps {
  priority: number
  taskName: string
  taskTag: {
    label: string
    value: string
  }
  assignees: Assignee[]
  projectName: string
  deadline: string
}

const CardComponent: React.FC<CardComponentProps> = ({
  priority,
  taskName,
  taskTag,
  assignees,
  projectName,
  deadline,
}) => {
  return (
    <div
      draggable="true"
      className="mb-4 flex h-fit w-full cursor-grab flex-row overflow-hidden rounded-lg border-transparent bg-[#FFFFFF] active:cursor-grabbing"
    >
      <PriorityComponent priority={priority} />
      <div className="flex w-full flex-col px-4 pt-4">
        <div className="flex flex-row justify-between">
          <p>{taskName}</p>
          <Tag bg="#F5F5F5">
            <div className="flex flex-row">
              <span className="pr-2 font-bold text-[#00000099]">
                {taskTag.label}
              </span>
              <span className="#000000 pr-2">{taskTag.value}</span>
            </div>
          </Tag>
        </div>
        <div className="flex flex-row items-center pt-4">
          {assignees.map((assignee, index) => (
            <React.Fragment key={index}>
              <Avatar size="xs" name={assignee.name} src={assignee.avatar} />
              <p className="px-2 font-medium text-[#00000099]">
                {assignee.name}
              </p>
              {index < assignees.length - 1 && (
                <>
                  <div className="pr-2">
                    <FaArrowRight />
                  </div>
                  <TbMinusVertical color="#67676733" />
                </>
              )}
            </React.Fragment>
          ))}
          <div className="flex flex-row items-center pl-2">
            <MdOutlineInventory2 color="#00000099" />
            <p className="pl-2 font-normal text-[#00000099]">{projectName}</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between py-5">
          <div className="flex flex-row items-center gap-4">
            <LuCalendar color="#00000099" />
            <p className="font-normal text-[#00000099]">
              Prazo máximo: {deadline}
            </p>
          </div>
          <MdOutlineTimer size={24} color="#67676733" />
        </div>
      </div>
    </div>
  )
}

export default CardComponent
