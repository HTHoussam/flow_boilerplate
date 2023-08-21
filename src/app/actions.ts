'use server'

import prisma from '@/lib/prisma'
import { PlayerType } from '@/lib/types'
import { PlayerSchemaType, playerSchema } from '@/lib/validation/schema'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getBase64 } from '@/lib/helpers'

interface submitActionReturn {
  status: number
  error: boolean
  message?: string
}
export async function deletePlayerAction(player: PlayerType) {
  const isPlayerExist = await prisma.player.findFirst({
    where: {
      firstName: {
        equals: player.firstName,
      },
      AND: {
        lastName: {
          equals: player.lastName,
        },
      },
    },
  })
  if (!isPlayerExist || Object.entries(isPlayerExist).length <= 0) return
  const deletedPlayer = await prisma.player.delete({
    where: {
      id: isPlayerExist.id,
    },
  })
  console.log('deletedPlayer', deletedPlayer)
}
export async function submitPlayerAction(newPlayer: PlayerSchemaType): Promise<submitActionReturn> {
  if (!newPlayer || Object.keys(newPlayer).length <= 0) {
    return { status: 502, error: true, message: 'pas de donnees' }
  }

  const result = playerSchema.safeParse(newPlayer)

  if (!result.success) {
    return { status: 503, error: true, message: 'Erreur: type donnees' }
  }
  // store the image to s3 and store s3 link to db

  const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
    region: process.env.S3_BUCKET_REGION ?? '',
  })
  console.log('newPlayer.pictureURl?.imageType', newPlayer.pictureURl?.imageType)
  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME ?? '',
    Key: newPlayer.pictureURl?.imageName,
    Body: newPlayer.pictureURl?.binary,
    ContentType: newPlayer.pictureURl?.imageType,
  }
  const command = new PutObjectCommand(s3Params)
  const r = await s3.send(command)

  try {
    const isPlayerExist = await prisma.player.findFirst({
      where: {
        firstName: {
          equals: result.data.firstName,
        },
        AND: {
          lastName: {
            equals: result.data.lastName,
          },
        },
      },
    })

    if (isPlayerExist) {
      return { message: 'jouer existe deja', error: true, status: 403 }
    }

    delete result.data.id
    const insertResult = await prisma.player.create({
      data: {
        ...result.data,
        pictureURl: Buffer.from(result.data.pictureURl as any, 'base64'),
      },
    })

    if (!insertResult || Object.keys(insertResult).length <= 0) {
      return { status: 503, error: true, message: `Erreur: lors de l'insertion` }
    }
    return { message: 'success', error: false, status: 200 }
  } catch (e) {
    return { message: `Erreur: `, error: true, status: 503 }
  }
}

export async function updatePlayerAction(updatedPlayer: PlayerSchemaType): Promise<submitActionReturn> {
  if (!updatedPlayer || Object.keys(updatedPlayer).length <= 0) {
    return { status: 502, error: true, message: 'pas de donnees' }
  }

  const result = playerSchema.safeParse(updatedPlayer)

  if (!result.success) {
    return { status: 503, error: true, message: 'Erreur: type donnees' }
  }
  try {
    const updateResult = await prisma.player.updateMany({
      where: {
        id: {
          equals: result.data.id,
        },
      },
      data: {
        ...result.data,
        pictureURl: Buffer.from(result.data.pictureURl as any, 'base64'),
      },
    })

    if (!updateResult || Object.keys(updateResult).length <= 0 || updateResult.count <= 0) {
      return { status: 503, error: true, message: 'Erreur: lors de mis a jour' }
    }
    return { message: 'success', error: false, status: 200 }
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError)
      return { status: 503, error: true, message: `Erreur: ${error.message}` }

    return { status: 503, error: true, message: 'Erreur: lors de mis a jour' }
  }
}
