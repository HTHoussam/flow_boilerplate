'use client'

import { usePlayersHook } from '@/lib/hooks'
import PlayersTable from '@/components/players/PlayersTable'

export default function PlayersPage() {
  const [{ setPaginationState, isLoading, paginationState, players }] = usePlayersHook()
  return (
    <div className="">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        players &&
        players.length > 0 && (
          <PlayersTable setPaginationState={setPaginationState} paginationState={paginationState} players={players} />
        )
      )}
    </div>
  )
}
