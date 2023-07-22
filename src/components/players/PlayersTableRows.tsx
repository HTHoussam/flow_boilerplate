'use client'

import { PlayersType } from '@/lib/types'
import { useAsyncEffect, useMount } from 'ahooks'
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react'

const PlayersTableRows = ({ players }: { players: any }) => {
  // const [players, setPlayers] = useState<Array<PlayersType>>([])
  // const [loadingPlayers, setLoadingPlayer] = useState(false)
  // const [isMounted, setIsMounted] = useState(false)
  // useEffect(() => {
  //   setIsMounted(true)
  // }, [])
  // useAsyncEffect(async () => {
  //   const response = await fetch('/api/players')
  //   const data = await response.json()
  //   console.log('data', data)
  //   setPlayers(data.players)
  // }, [])

  // console.log('the players', players)
  return (
    <>
      {players && players.length > 0 ? (
        <div>
          <table>
            <tbody>
              {players.map(
                (player: {
                  id: Key | null | undefined
                  firstName: any
                  lastName: any
                  salary:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | PromiseLikeOfReactNode
                    | null
                    | undefined
                  goals:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | PromiseLikeOfReactNode
                    | null
                    | undefined
                }) => (
                  <tr key={player.id}>
                    <td>{`${player.firstName} ${player.lastName}`}</td>
                    <td>{player.salary}</td>
                    <td>{player.goals}</td>
                    <td>
                      <button>edit</button>
                      <button>add</button>
                      <button>delete</button>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No players found.</div>
      )}
    </>
  )
}

export default PlayersTableRows
