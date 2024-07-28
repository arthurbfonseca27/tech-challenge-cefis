'use client'

import React, { useEffect, useMemo, useState } from 'react'
import ColumnComponent from './ColumnComponent'
import { Button, useDisclosure } from '@chakra-ui/react'
import { IoIosAdd } from 'react-icons/io'
import ModalNewColumnComponent from './ModalNewColumnComponent'
import { Column, Id, Task, Requester } from '@/types'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import CardComponent from './CardComponent'
import defaultTasks from '../hooks/useTasks'
import SearchComponent from './SearchComponent'
import ModalNewTaskComponent from './ModalNewTaskComponent'
import defaultRequestersFunction from '../hooks/useRequesters'
import { useTaskStore } from '../store/tasks/index'
import { differenceInDays } from 'date-fns'

const KanbanBoardComponent = () => {
  // Function to generate the ids of tasks and columns
  const generateId = () => {
    return Math.floor(Math.random() * 10001)
  }

  // "Fetching" default columns (Not started, Started, Done)
  const defaultColumns: Column[] = [
    { id: 1, title: 'Não Iniciado', color: '#F5F5F5' },
    { id: 2, title: 'Iniciadas', color: '#C9F5FF66' },
    { id: 3, title: 'Concluído', color: '#D8FDD266' },
  ]

  // "Fetching" colors for the column creation
  const colors = [
    { value: '#C9F5FF66' },
    { value: '#D8FDD266' },
    { value: '#F5F5F5' },
    { value: '#FFD70066' },
    { value: '#FFB6C166' },
  ]

  // Variable declaration
  const [tasks, setTasks] = useState<Task[]>([])
  const [columns, setColumns] = useState<Column[]>(defaultColumns)
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('#C9F5FF66')
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [requesters, setRequesters] = useState<Requester[]>([])
  const [selectedRequester, setSelectedRequester] = useState<
    Task['requester'] | null
  >(null)

  // State for filters
  const [filterColumnIds, setFilterColumnIds] = useState<string[]>([])
  const [filterExecuter, setFilterExecuter] = useState<string[]>([])
  const [filterRequester, setFilterRequester] = useState<string[]>([])
  const [filterProject, setFilterProject] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Fetching data using Zustand
  const { titleTask, executerTask, priorityTask, dateTask, projectNameTask } =
    useTaskStore()

  // Fetching default tasks (using Next)
  // "Fetching" local default tasks -In addition to querying the API, I will also run it locally to ensure that the default tasks are correctly displayed in the hosting environment.
  useEffect(() => {
    const defaultLocalTasks: Task[] = [
      {
        id: generateId(),
        columnId: 1,
        priority: 3,
        taskName: 'Develop user registration',
        requester: {
          name: 'Julia Roberts',
          avatar:
            'https://images.pexels.com/photos/3348748/pexels-photo-3348748.jpeg',
        },
        executer: {
          name: 'Carlos Mendes',
          avatar:
            'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        projectName: 'User Management System',
        deadline: '0',
        dtt: false,
      },
      {
        id: generateId(),
        columnId: 2,
        priority: 1,
        taskName: 'Design analytics dashboard',
        requester: {
          name: 'Diana Prince',
          avatar:
            'https://images.pexels.com/photos/1385472/pexels-photo-1385472.jpeg',
        },
        executer: {
          name: 'Miguel Santos',
          avatar:
            'https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        projectName: 'Data Insights Platform',
        deadline: '11',
        dtt: true,
      },
      {
        id: generateId(),
        columnId: 3,
        priority: 2,
        taskName: 'Enhance search performance',
        requester: {
          name: 'Liam White',
          avatar:
            'https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        executer: {
          name: 'Ana Pereira',
          avatar:
            'https://images.pexels.com/photos/3228213/pexels-photo-3228213.jpeg',
        },
        projectName: 'E-commerce Backend',
        deadline: '-1',
        dtt: false,
      },
    ]

    const fetchTasks = async () => {
      try {
        const defaultFetchedTasks = await defaultTasks()
        setTasks([...defaultLocalTasks, ...defaultFetchedTasks])
        setIsLoading(false)
      } catch (error) {
        setTasks([...defaultLocalTasks])
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  // Fetching default local and API requesters
  useEffect(() => {
    const defaultLocalRequesters: Requester[] = [
      {
        name: 'Michael Scott',
        avatar:
          'https://images.pexels.com/photos/2128819/pexels-photo-2128819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'Sophia Taylor',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      },
      {
        name: 'John Doe',
        avatar:
          'https://images.pexels.com/photos/1496647/pexels-photo-1496647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'Emily Clark',
        avatar:
          'https://images.pexels.com/photos/1468374/pexels-photo-1468374.jpeg',
      },
    ]

    async function fetchRequester() {
      try {
        const data = await defaultRequestersFunction()
        setRequesters([...defaultLocalRequesters, ...data.requesters])
      } catch (error) {
        setRequesters([...defaultLocalRequesters])
      }
    }
    fetchRequester()
  }, [])

  // Function to set the filter column ID
  const handleFilterColumnChange = (ids: string[]) => {
    setFilterColumnIds(ids)
  }

  // Function to set the filter by executers
  const handleFilterExecuterChange = (values: string[]) => {
    setFilterExecuter(values)
  }

  // Function to set the filter by requesters
  const handleFilterRequesterChange = (values: string[]) => {
    setFilterRequester(values)
  }

  // Function to set the filter by project name
  const handleFilterProjectChange = (values: string[]) => {
    setFilterProject(values)
  }

  // Function to set the filter by text input
  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  // Function to set the filtered columns
  const filteredColumns = useMemo(() => {
    if (filterColumnIds.length > 0) {
      return columns.filter((column) =>
        filterColumnIds.includes(column.id.toString()),
      )
    }
    return columns
  }, [columns, filterColumnIds])

  // Function to set the filtered tasks by ids, executers, requesters and project names
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesExecuter =
        filterExecuter.length === 0
          ? true
          : filterExecuter.includes(task.executer.name)
      const matchesRequester =
        filterRequester.length === 0
          ? true
          : filterRequester.includes(task.requester.name)
      const matchesProject =
        filterProject.length === 0
          ? true
          : filterProject.includes(task.projectName)
      const matchesColumn =
        filterColumnIds.length === 0
          ? true
          : filterColumnIds.includes(task.columnId.toString())
      const matchesSearchTerm =
        task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.id.toString().includes(searchTerm)
      return (
        matchesExecuter &&
        matchesRequester &&
        matchesProject &&
        matchesColumn &&
        matchesSearchTerm
      )
    })
  }, [
    tasks,
    filterExecuter,
    filterRequester,
    filterProject,
    filterColumnIds,
    searchTerm,
  ])

  // Function to set a random requester to the new task created
  const getRandomRequester = () => {
    const randomRequester =
      requesters[Math.floor(Math.random() * requesters.length)]
    setSelectedRequester(randomRequester)
  }

  // Use for modal behaviors
  const {
    isOpen: isOpenNewColumn,
    onOpen: onOpenNewColumn,
    onClose: onCloseNewColumn,
  } = useDisclosure()
  const {
    isOpen: isOpenNewTask,
    onOpen: onOpenNewTask,
    onClose: onCloseNewTask,
  } = useDisclosure()

  // Memorize the columns ids
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])

  // Use to create a new column
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value)

  // Use to create a new column
  const selectColor = (color: string) => setColor(color)

  // Use to create a new column
  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title,
      color,
    }
    setColumns([...columns, columnToAdd])
    onCloseNewColumn()
    setTitle('')
    setColor('#C9F5FF66')
  }

  // Use to delete a non-default column
  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((col) => col.id !== id)
    setColumns(filteredColumns)

    const newTasks = tasks.filter((t) => t.columnId !== id)
    setTasks(newTasks)
  }

  // Use to edit the title of a column
  const updateColumn = (id: Id, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col
      return { ...col, title }
    })

    setColumns(newColumns)
  }

  // Handler to open a new task
  const handleOpenNewTask = () => {
    getRandomRequester()
    onOpenNewTask()
  }

  // Use to create a new task
  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      priority: priorityTask?.priority ?? 0,
      taskName: titleTask,
      requester: {
        name: selectedRequester?.name ?? '',
        avatar: selectedRequester?.avatar ?? '',
      },
      executer: {
        name: executerTask?.name ?? '',
        avatar: executerTask?.avatar ?? '',
      },
      projectName: projectNameTask,
      deadline: dateTask
        ? differenceInDays(dateTask, new Date()).toString()
        : '',
      dtt: dateTask ? differenceInDays(dateTask, new Date()) > 10 : false,
    }

    setTasks([...tasks, newTask])
    onCloseNewTask()
  }

  // Use for delete a task
  const deleteTask = (id: Id) => {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }

  // Use for update a task - actually, I prefer don't use it, but it may be necessary as the project grows
  const updateTask = (id: Id, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task
      return { ...task, content }
    })
    setTasks(newTasks)
  }

  // Use for drag and drop functions
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px
      },
    }),
  )

  // Use for drag and drop functions
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
    }
  }

  // Use for drag and drop functions
  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event

    if (!over) return

    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId,
      )

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId,
      )

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  // Use for drag and drop functions
  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (!isActiveATask) return

    // Dropping a Task over another task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)

        tasks[activeIndex].columnId = tasks[overIndex].columnId

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    // Dropping a Task over a column
    const isOverAColumn = over.data.current?.type === 'Column'

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)

        tasks[activeIndex].columnId = overId

        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex flex-col gap-4 pb-2 max-md:items-center max-md:justify-center max-md:pt-8">
        <div className="flex flex-row gap-4 max-md:w-[90%] max-md:items-center max-md:justify-center">
          <Button
            leftIcon={<IoIosAdd />}
            variant="outline"
            borderColor="#67676733"
            onClick={onOpenNewColumn}
          >
            Adicionar coluna
          </Button>

          <Button
            leftIcon={<IoIosAdd />}
            variant="outline"
            borderColor="#67676733"
            onClick={handleOpenNewTask}
          >
            Adicionar Task
          </Button>
          <ModalNewTaskComponent
            isOpen={isOpenNewTask}
            onClose={onCloseNewTask}
            columns={columns}
            createTask={createTask}
          />
        </div>
        <SearchComponent
          columns={columns}
          tasks={tasks}
          onFilterColumnChange={handleFilterColumnChange}
          onFilterExecuterChange={handleFilterExecuterChange}
          onFilterRequesterChange={handleFilterRequesterChange}
          onFilterProjectChange={handleFilterProjectChange}
          onSearchChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-row max-md:items-center max-md:justify-center">
        <div className="flex flex-row gap-3 pb-4 max-md:flex-col max-sm:justify-end">
          <SortableContext items={columnsId}>
            {filteredColumns.map((column) => (
              <ColumnComponent
                key={column.id}
                column={column}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                isLoading={isLoading}
                tasks={filteredTasks.filter(
                  (task) => task.columnId === column.id,
                )}
              />
            ))}
          </SortableContext>
        </div>
        <ModalNewColumnComponent
          isOpen={isOpenNewColumn}
          onClose={onCloseNewColumn}
          title={title}
          handleTitleChange={handleTitleChange}
          colors={colors}
          color={color}
          selectColor={selectColor}
          createNewColumn={createNewColumn}
        />
      </div>
      {typeof window !== 'undefined' &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnComponent
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                isLoading={isLoading}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id,
                )}
              />
            )}
            {activeTask && (
              <CardComponent
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  )
}

export default KanbanBoardComponent
