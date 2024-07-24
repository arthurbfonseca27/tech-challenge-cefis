'use server'

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: 1, title: 'Não Iniciado', color: '#F5F5F5' },
    { id: 2, title: 'Iniciadas', color: '#C9F5FF66' },
    { id: 3, title: 'Concluído', color: '#D8FDD266' },
  ])
}
