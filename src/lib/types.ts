export interface PlayerType {
  id?: number
  firstName: string
  lastName: string
  salary?: string
  currency?: string
  pictureURl?: string | Buffer
  goals?: number
}
export interface PrismaPlayerType {
  id: number
  createdAt: Date | null
  updatedAt: Date | null
  firstName: string
  lastName: string
  salary: string | null
  currency: string | null
  pictureURl: string | null | Buffer
  goals: string | null
}
export interface GetPlayersResponse {
  message: string
  status: number
  players: Array<PlayerType>
}
export enum Currency {
  USD = '$',
  MAD = 'MAD',
  EUR = '€',
  GBP = '£',
  CHF = 'Fr',
}

export interface PaginationType {
  page: number
  limit: number
  totalPages: number
}
