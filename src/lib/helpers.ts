import { submitPlayerAction, updatePlayerAction } from '@/app/actions'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { PrismaPlayerType, PlayerType } from './types'
import { PlayerSchemaType } from './validation/schema'
import { validateImage } from 'image-validator'

export function switchToPlayerType(prismaPlayer: PrismaPlayerType): PlayerType {
  const player: PlayerType = {
    id: prismaPlayer.id,
    firstName: prismaPlayer.firstName,
    lastName: prismaPlayer.lastName,
  }

  if (prismaPlayer.salary !== null) {
    player.salary = prismaPlayer.salary
  }
  if (prismaPlayer.currency !== null) {
    player.currency = prismaPlayer.currency
  }
  if (prismaPlayer.pictureURl !== null) {
    player.pictureURl = prismaPlayer.pictureURl
  }
  if (prismaPlayer.goals !== null) {
    player.goals = parseInt(prismaPlayer.goals, 10)
  }

  return player
}

export const onSubmit: SubmitHandler<PlayerSchemaType> = async (data) => {
  console.log('onSubmit', data)
  const response = await submitPlayerAction(data)
  if (response.status !== 200) {
    return toast(`Erreur: ${response.message}`, { hideProgressBar: true, autoClose: 3000, type: 'error' })
  }
  // window.location.assign('/')
  return toast('Success: insertion complete', { hideProgressBar: true, autoClose: 3000, type: 'success' })
}
export const onSubmitUpdate: SubmitHandler<PlayerSchemaType> = async (data, event) => {
  const response = await updatePlayerAction(data)
  if (response.status !== 200) {
    return toast(`Erreur:${response.message} `, { hideProgressBar: true, autoClose: 3000, type: 'error' })
  }
  return toast('Success', { hideProgressBar: true, autoClose: 3000, type: 'success' })
}

export const formatSalary = (str: string) => {
  const suffixes = ['', 'K', 'M', 'B', 'T']
  const num = parseFloat(str)
  if (isNaN(num)) {
    return 'nombre invalid'
  }

  const numString = String(num)
  const len = numString.length
  const index = Math.floor((len - 1) / 3)
  let formattedNum = (num / Math.pow(1000, index)).toFixed(1)

  if (formattedNum.endsWith('.0')) {
    formattedNum = formattedNum.slice(0, -2)
  }

  return formattedNum + suffixes[index]
}

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export function base64ToBinary(base64Image: string) {
  const binaryString = atob(base64Image)
  const byteArray = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i)
  }
  return byteArray
}
