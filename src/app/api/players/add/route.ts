import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const res = await request.json()

  const { player } = res

  try {
    if (!player || Object.keys(player).length <= 0) {
      return NextResponse.json({ message: 'insert failed', status: 502, error: true })
    }
    const isPlayerExist = await prisma.player.findFirst({
      where: {
        id: {
          equals: player.id,
        },
      },
    })
    if (isPlayerExist) {
      return NextResponse.json({ message: 'player already exist', status: 402, error: true })
    }
    const insertResult = await prisma.player.create({
      data: {
        ...player,
      },
    })
    if (insertResult) return NextResponse.json({ message: 'success', status: 200, error: false })
  } catch (e: any) {
    return NextResponse.json({ message: e.message, status: 503, error: true })
  }
}
