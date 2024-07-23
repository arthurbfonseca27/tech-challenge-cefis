import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      completed: false,
      column: 'Não iniciada',
      priority: 1,
      taskName: 'Implement login feature',
      taskTag: {
        label: 'DTT',
        value: '+ 1000',
      },
      assignees: [
        {
          name: 'Dan Abrahmov',
          avatar: 'https://bit.ly/dan-abramov',
        },
        {
          name: 'Gabriel',
          avatar: 'https://bit.ly/dan-abramov',
        },
      ],
      projectName: 'New Website',
      deadline: '7 days',
    },
    {
      id: 2,
      completed: false,
      column: 'Iniciadas',
      priority: 2,
      taskName: 'Design homepage layout',
      taskTag: {
        label: 'UI/UX',
        value: '+ 750',
      },
      assignees: [
        {
          name: 'Sarah Smith',
          avatar: 'https://bit.ly/sarah-smith',
        },
        {
          name: 'Michael',
          avatar: 'https://bit.ly/michael',
        },
      ],
      projectName: 'New Website',
      deadline: '14 days',
    },
    {
      id: 3,
      completed: true,
      column: 'Concluídas',
      priority: 3,
      taskName: 'Setup CI/CD pipeline',
      taskTag: {
        label: 'DevOps',
        value: '+ 500',
      },
      assignees: [
        {
          name: 'John Doe',
          avatar: 'https://bit.ly/john-doe',
        },
        {
          name: 'Jane Doe',
          avatar: 'https://bit.ly/jane-doe',
        },
      ],
      projectName: 'Automation Project',
      deadline: '10 days',
    },
  ])
}
