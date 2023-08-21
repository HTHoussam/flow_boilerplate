import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { PlayerType, PaginationType } from './types'

export const getAbsoluteURL = () => {
  const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL ? `${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000'
  return baseURL
}

export const usePlayersHook = () => {
  const [players, setPlayers] = useState<Array<PlayerType>>([])
  const [paginationState, setPaginationState] = useState<PaginationType>({
    page: 1,
    limit: 6,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const getPlayersCount = async (): Promise<void> => {
    console.log('process.env.NEXT_PUBLIC_VERCEL_URL', process.env.NEXT_PUBLIC_VERCEL_URL)
    const result = await fetch(`http://localhost:3000/api/players/count`, {
      cache: 'force-cache',
    })
    if (result.ok) {
      const r = await result.json()
      setPaginationState((prev) => ({
        ...prev,
        totalPages: Math.ceil(r.count / prev.limit),
      }))
    }
  }

  const getPlayers = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const data = await fetch(
        `http://localhost:3000/api/players?page=${paginationState.page - 1}&limit=${paginationState.limit}`,
        {
          next: {
            revalidate: 0,
          },
        },
      )
      if (data.ok) {
        const playersData = await data.json()
        setPlayers(playersData.players)
      } else {
        toast('No more players', { hideProgressBar: true, autoClose: 3000, type: 'error', position: 'bottom-center' })
      }
    } catch (error: any) {
      toast(error?.message, { hideProgressBar: true, autoClose: 3000, type: 'error', position: 'bottom-center' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPlayersCount()
  }, [])

  useEffect(() => {
    if (paginationState.totalPages !== 0 && paginationState.page <= paginationState.totalPages) {
      getPlayers()
    }
  }, [paginationState])

  return [{ players, isLoading, paginationState, setPaginationState }] as const
}
