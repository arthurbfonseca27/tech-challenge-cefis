'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Column } from '@/types' // Assumindo que Column está definido no seu arquivo de tipos

interface ColumnContextType {
  columns: Column[]
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>
  columnWidths: Record<string, number>
  setColumnWidths: React.Dispatch<React.SetStateAction<Record<string, number>>>
}

const ColumnContext = createContext<ColumnContextType | undefined>(undefined)

export const useColumnContext = (): ColumnContextType => {
  const context = useContext(ColumnContext)
  if (!context) {
    throw new Error('useColumnContext must be used within a ColumnProvider')
  }
  return context
}

interface ColumnProviderProps {
  children: ReactNode
}

export const ColumnProvider: React.FC<ColumnProviderProps> = ({ children }) => {
  const [columns, setColumns] = useState<Column[]>([])
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({})

  const value = {
    columns,
    setColumns,
    columnWidths,
    setColumnWidths,
  }

  return (
    <ColumnContext.Provider value={value}>{children}</ColumnContext.Provider>
  )
}
