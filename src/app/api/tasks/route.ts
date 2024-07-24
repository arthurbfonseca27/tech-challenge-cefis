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
        label: 'DTT',
        value: '+1000',
      },
      requester: {
        name: 'Dan Abrahmov',
        avatar: 'https://bit.ly/dan-abramov',
      },
      executer: [
        {
          name: 'Gabriel',
          avatar: 'https://bit.ly/dan-abramov',
        },
      ],
      projectName: 'New Website',
      deadline: '7 days',
    },
  ])
}
