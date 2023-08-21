import prisma from '../prisma'
import { PrismaPlayerType } from '../types'
export const revalidate = 10

export async function getPlayerById(playerId: string): Promise<PrismaPlayerType | null> {
  try {
    return await prisma.player.findFirstOrThrow({
      where: {
        id: {
          equals: parseInt(playerId),
        },
      },
    })
  } catch (error: any) {
    console.log('e', error.message)
    return null
  }
}
