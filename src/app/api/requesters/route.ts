'use server'

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    requesters: [
      {
        name: 'Charlie Brown',
        avatar: 'https://i.imgur.com/gdOntS9.jpeg',
      },
      {
        name: 'Alice Johnson',
        avatar:
          'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg',
      },
      {
        name: 'Bob Smith',
        avatar: 'https://bit.ly/bob-smith',
      },
      {
        name: 'Diana Prince',
        avatar:
          'https://images.pexels.com/photos/3228213/pexels-photo-3228213.jpeg',
      },
      {
        name: 'Ethan Hunt',
        avatar: 'https://i.imgur.com/EgKrlaa.jpeg',
      },
      {
        name: 'Fiona Gallagher',
        avatar:
          'https://images.pexels.com/photos/3348748/pexels-photo-3348748.jpeg',
      },
      {
        name: 'George Costanza',
        avatar: 'https://bit.ly/george-costanza',
      },
      {
        name: 'Hannah Montana',
        avatar:
          'https://images.pexels.com/photos/3812944/pexels-photo-3812944.jpeg',
      },
      {
        name: 'Ian Malcolm',
        avatar: 'https://bit.ly/ian-malcolm',
      },
      {
        name: 'Jack Sparrow',
        avatar: 'https://bit.ly/jack-sparrow',
      },
    ],
  })
}
