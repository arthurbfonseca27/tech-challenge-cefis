import React from 'react'
import ColumnComponent from './ColumnComponent'

const KanbanBoardComponent = () => {
  return (
    <div className="flex flex-row justify-center gap-3">
      <ColumnComponent bg="#C9F5FF66" title="Iniciadas" />
      <ColumnComponent bg="#D8FDD266" title="Concluídas" />
      <ColumnComponent bg="#F5F5F5" title="Não iniciada" />
    </div>
  )
}

export default KanbanBoardComponent
