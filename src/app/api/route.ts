import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
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
    {
      priority: 1,
      taskName: 'aaaaaaaaa',
      taskTag: {
        label: 'DTT',
        value: '+1000',
      },
      requester: {
        name: 'Arthur',
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
