'use server'

import { NextResponse } from 'next/server'

function generateId() {
  return Math.floor(Math.random() * 10001)
}

export async function GET() {
  return NextResponse.json([
    {
      id: generateId(),
      columnId: 1,
      priority: 1,
      taskName: 'Implement login feature',
      taskTag: {
        label: 'Auth',
        value: '+1000',
      },
      requester: {
        name: 'Alice Johnson',
        avatar: 'https://bit.ly/alice-johnson',
      },
      executer: {
        name: 'Gabriel Silva',
        avatar: 'https://bit.ly/gabriel-silva',
      },

      projectName: 'Customer Portal',
      deadline: '5',
      dtt: false,
    },
    {
      id: generateId(),
      columnId: 2,
      priority: 2,
      taskName: 'Create dashboard layout',
      taskTag: {
        label: 'UI/UX',
        value: '+500',
      },
      requester: {
        name: 'Bob Smith',
        avatar: 'https://bit.ly/bob-smith',
      },
      executer: {
        name: 'Mariana Costa',
        avatar:
          'https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg',
      },

      projectName: 'Analytics Platform',
      deadline: '11',
      dtt: true,
    },
    {
      id: generateId(),
      columnId: 3,
      priority: 3,
      taskName: 'Optimize database queries',
      taskTag: {
        label: 'DB',
        value: '+300',
      },
      requester: {
        name: 'Charlie Brown',
        avatar: 'https://bit.ly/charlie-brown',
      },
      executer: {
        name: 'Isabela Martinss',
        avatar: 'https://bit.ly/isabela-martins',
      },

      projectName: 'Inventory System',
      deadline: '3',
      dtt: false,
    },
  ])
}
