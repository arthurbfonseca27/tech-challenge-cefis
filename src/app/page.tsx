'use client'

import React from 'react'
import KanbanBoardComponent from '@/components/KanbanBoardComponent'

export default function Home() {
  return (
    <div className="bg-white">
      <div className="flex flex-col px-20 pt-10">
        <KanbanBoardComponent />
      </div>
    </div>
  )
}
