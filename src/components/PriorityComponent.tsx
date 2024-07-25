'use-client'

import React from 'react'

interface PriorityComponentProps {
  horizontal?: boolean
  priority: number | undefined
}

const PriorityComponent: React.FC<PriorityComponentProps> = ({
  priority,
  horizontal,
}) => {
  if (priority === undefined) return null

  const renderDivs = () => {
    const divs = [
      <div
        key="1"
        className={`${priority === 1 ? 'border-[#902018]' : 'border-[#BEBEBE66]'} ${horizontal ? 'rounded-r-3xl' : ''} h-full border-4`}
      ></div>,
      <div
        key="2"
        className={`${priority === 1 ? 'border-[#902018]' : priority === 2 ? 'border-[#F2BB68]' : 'border-[#BEBEBE66]'} h-full border-4`}
      ></div>,
      <div
        key="3"
        className={`${priority === 1 ? 'border-[#902018]' : priority === 2 ? 'border-[#F2BB68]' : 'border-[#394A53]'} ${horizontal ? 'rounded-l-3xl' : ''} h-full border-4`}
      ></div>,
    ]

    return horizontal ? divs.reverse() : divs
  }
  return (
    <div
      className={`${horizontal ? 'flex-row gap-0.5' : 'flex-col space-y-0.5'} flex rounded-3xl`}
    >
      {renderDivs()}
    </div>
  )
}

export default PriorityComponent
