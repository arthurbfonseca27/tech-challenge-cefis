import { create } from 'zustand'
import { Option, Task } from '@/types'

interface TaskStore {
  titleTask: string
  executerTask: Task['executer'] | null
  priorityTask: Option | null
  statusTask: Option | null
  dateTask: Date | null
  projectNameTask: string
  dttTask: boolean
  setTitleTask: (title: string) => void
  setExecuterTask: (executer: Task['executer']) => void
  setPriorityTask: (priority: Option) => void
  setStatusTask: (status: Option) => void
  setDateTask: (date: Date | null) => void
  setProjectNameTask: (projectNameTask: string) => void
  setDttTask: (dttTask: boolean) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  titleTask: '',
  executerTask: null,
  priorityTask: null,
  statusTask: null,
  dateTask: null,
  projectNameTask: '',
  dttTask: false,
  setTitleTask: (titleTask) => set({ titleTask }),
  setExecuterTask: (executerTask) => set({ executerTask }),
  setPriorityTask: (priorityTask) => set({ priorityTask }),
  setStatusTask: (statusTask) => set({ statusTask }),
  setDateTask: (dateTask) => set({ dateTask }),
  setProjectNameTask: (projectNameTask) => set({ projectNameTask }),
  setDttTask: (dttTask) => set({ dttTask }),
}))
