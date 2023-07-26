import prisma from '@/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const count = await prisma.player.count()

    return NextResponse.json({ count })
  } catch (e: any) {
    if (e instanceof PrismaClientKnownRequestError)
      return NextResponse.json({ message: e.message, error: true }, { status: 500 })

    return NextResponse.json({ message: e.message ?? 'unknown error', error: true }, { status: 500 })
  }
}
