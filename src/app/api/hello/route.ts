import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function assetHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method } = request

  switch (method) {
    case 'GET':
      try {
        const stars = await prisma.star.findMany()
        console.log('stars', stars)
        response.status(200).json(stars)
      } catch (e) {
        console.error('Request error', e)
        response.status(500).json({ error: 'Error fetching posts' })
      }
      break
    default:
      response.setHeader('Allow', ['GET'])
      response.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
