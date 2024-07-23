import React from 'react'
import PriorityComponent from './PriorityComponent'
import { Tag, Avatar } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'
import { LuCalendar } from 'react-icons/lu'
import { MdOutlineInventory2, MdOutlineTimer } from 'react-icons/md'
import { TbMinusVertical } from 'react-icons/tb'

interface CardComponentProps {
  priority: number
}

const CardComponent: React.FC<CardComponentProps> = ({ priority }) => {
  return (
    <div className="flex h-fit w-full flex-row overflow-hidden rounded-lg border-transparent bg-[#FFFFFF]">
      <PriorityComponent priority={priority} />
      <div className="flex w-full flex-col px-4 pt-4">
        <div className="flex flex-row justify-between">
          <p>Nome da Task lorem ipsum</p>
          <Tag bg="#F5F5F5">
            <div className="flex flex-row">
              <span className="pr-2 font-bold text-[#00000099]">DTT</span>
              <span className="#000000 pr-2">+ 1000</span>
            </div>
          </Tag>
        </div>
        <div className="flex flex-row items-center pt-4">
          <Avatar
            size="xs"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <p className="px-2 font-medium text-[#00000099]">Lorem</p>
          <div className="pr-2">
            <FaArrowRight />
          </div>
          <Avatar
            size="xs"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <p className="px-2 font-medium text-[#00000099]">Gabriel</p>
          <TbMinusVertical color="#67676733" />
          <div className="flex flex-row items-center pl-2">
            <MdOutlineInventory2 color="#00000099" />
            <p className="pl-2 font-normal text-[#00000099]">Nome do projeto</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between py-5">
          <div className="flex flex-row items-center gap-4">
            <LuCalendar color="#00000099" />
            <p className="font-normal text-[#00000099]">Prazo máximo: 7 dias</p>
          </div>
          <MdOutlineTimer size={24} color="#67676733" />
        </div>
      </div>
    </div>
  )
}

export default CardComponent
