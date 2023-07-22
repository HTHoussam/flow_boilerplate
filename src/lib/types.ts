export interface GetPlayersResponse {
  message: string
  status: number
  players: Array<Object>
}
export interface PlayersType {
  id: number
  firstName: string
  lastName: string
  salary?: string
  currency?: string
  pictureURl?: string
  goals?: number
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
  total: number
}
