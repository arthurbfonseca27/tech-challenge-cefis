import React from 'react'

interface PriorityComponentProps {
  priority: number
}

const PriorityComponent: React.FC<PriorityComponentProps> = ({ priority }) => {
  return (
    <div className="flex flex-col space-y-0.5 rounded-3xl">
      <div
        className={`${priority === 1 ? 'border-[#902018]' : 'border-[#BEBEBE66]'} h-full border-4`}
      ></div>
      <div
        className={`${priority === 1 ? 'border-[#902018]' : priority === 2 ? 'border-[#F2BB68]' : 'border-[#BEBEBE66]'} h-full border-4`}
      ></div>
      <div
        className={`${priority === 1 ? 'border-[#902018]' : priority === 2 ? 'border-[#F2BB68]' : 'border-[#394A53]'} h-full border-4`}
      ></div>
    </div>
  )
}

export default PriorityComponent
