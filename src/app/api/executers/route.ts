'use server'

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    executers: [
      {
        name: 'Isabela Martins',
        avatar:
          'https://images.pexels.com/photos/1385472/pexels-photo-1385472.jpeg',
      },

      {
        name: 'Lucas Pereira',
        avatar: 'https://i.imgur.com/oMSw1o4.jpeg',
      },

      {
        name: 'Carla Souza',
        avatar:
          'https://images.pexels.com/photos/4725133/pexels-photo-4725133.jpeg',
      },

      {
        name: 'Felipe Lima',
        avatar: 'https://i.imgur.com/vBsUTzO.jpeg',
      },

      {
        name: 'Mariana Ribeiro',
        avatar: 'https://bit.ly/mariana-ribeiro',
      },

      {
        name: 'Bruno Oliveira',
        avatar: 'https://i.imgur.com/oMSw1o4.jpeg',
      },

      {
        name: 'Renata Santos',
        avatar: 'https://i.imgur.com/aaWD807.jpeg',
      },

      {
        name: 'André Costa',
        avatar: 'https://i.imgur.com/6fmF6oK.jpeg',
      },

      {
        name: 'Julia Fernandes',
        avatar: 'https://i.imgur.com/YnHcF6d.jpeg',
      },

      {
        name: 'Thiago Almeida',
        avatar: 'https://i.imgur.com/oMSw1o4.jpeg',
      },
    ],
  })
}
