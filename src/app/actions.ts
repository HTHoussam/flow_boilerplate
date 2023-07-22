'use server'

import prisma from '@/lib/prisma'

export async function deletePlayer(id: number) {
  const deletedUser = await prisma.player.delete({
    where: {
      id: id,
    },
  })
}

export async function playerCount() {
  return await prisma.player.count()
}
