import { Box } from '@chakra-ui/react'
import React from 'react'
import CardComponent from './CardComponent'
import useTask from '@/hooks/useTask'

interface ColumnComponentProps {
  bg: string
  title: string
}

const ColumnComponent: React.FC<ColumnComponentProps> = ({ bg, title }) => {
  const tasks = useTask()

  return (
    <div className="h-fit w-full text-base font-medium">
      <Box bg={bg} color="black" borderRadius="lg" px="3" pb="3">
        <p className="py-4">{title}</p>
        {tasks.map((task, index) => (
          <CardComponent key={index} {...task} />
        ))}
      </Box>
    </div>
  )
}

export default ColumnComponent
