import prisma from '@/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)

  const page = parseInt(url.searchParams.get('page') ?? '1')
  const limit = parseInt(url.searchParams.get('limit') ?? '6')

  try {
    const totalPlayers = await prisma.player.count()
    if (page > totalPlayers / limit) return NextResponse.json({ message: '', players: [], status: 404 })
    const playersList = await prisma.player.findMany({
      where: {
        id: {
          not: undefined,
        },
      },
      orderBy: {
        id: 'asc',
      },
      take: limit,
      skip: page * limit,
    })
    if (playersList.length > 0) return NextResponse.json({ message: 'success', players: playersList, status: 200 })
  } catch (e: any) {
    if (e instanceof PrismaClientKnownRequestError)
      return NextResponse.json({ message: e.message, error: true }, { status: 500 })

    return NextResponse.json({ message: e.message ?? 'unknown error', status: 500, players: [] })
  }
}
