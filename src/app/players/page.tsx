'use client'

import ActionsContainer from '@/components/players/core/ActionsContainer'
import AddPlayerButton from '@/components/players/core/AddPlayerButton'
import { SetStateAction, useEffect, useState } from 'react'
import { playerCount } from '../actions'
import Pagination from '@/components/players/core/Pagination'
import { PaginationType } from '@/lib/types'

export default function PlayersPage() {
  const [players, setPlayers] = useState([])
  const [paginationState, setPaginationState] = useState({
    page: 0,
    limit: 6,
    total: players.length / 6,
  })
  useEffect(() => {
    const getPlayersCount = async (): Promise<void> => {
      const count = await playerCount()
      setPaginationState((prev) => {
        return {
          ...prev,
          total: count,
        }
      })
    }
    getPlayersCount()
  }, [])
  useEffect(() => {
    const getPlayers = async (): Promise<void> => {
      if (paginationState.page > paginationState.total / paginationState.limit) return
      const data = await fetch(
        `http://localhost:3000/api/players?page=${paginationState.page}&limit=${paginationState.limit}`,
        {
          cache: 'force-cache',
          next: {
            revalidate: 10,
          },
        },
      )
      console.log('data', data)
      const playersData = await data.json()
      setPlayers(playersData.players)
    }
    getPlayers()
  }, [paginationState])

  return (
    <div className="relative max-w-screen-xl mx-auto ">
      <nav className="max-w-7xl bg-white flex flex-row justify-between py-8 border ">
        <div>
          <h1 className="capitalize font-extrabold">liste des jouers</h1>
        </div>
        <div>
          <AddPlayerButton />
        </div>
      </nav>
      <div className="max-w-7xl relative overflow-x-auto shadow-md sm:rounded-lg mt-8 border-2 rounded-sm text-center">
        <table className="table-auto w-full space-x-4 p-4 mx-auto">
          <thead className="text-gray-500 font-mono text-lg">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                fist name
              </th>
              <th scope="col" className="px-6 py-3">
                last name
              </th>
              <th scope="col" className="px-6 py-3">
                Salaire annuel
              </th>
              <th scope="col" className="px-6 py-3">
                But
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((p: any) => (
              <tr key={p.id}>
                <td className="px-6 py-4">{p.id}</td>
                <td className="px-6 py-4">{p.firstName}</td>
                <td className="px-6 py-4">{p.lastName}</td>
                <td className="px-6 py-4">{p.salary}</td>
                <td className="px-6 py-4">{p.goals}</td>
                <td className="px-6 py-4">
                  <ActionsContainer playerId={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="flex flex-row justify-between items-baseline bg-gray-200 space-x-2 ">
          <div>
            <button
              type="button"
              onClick={(e) => {
                setPaginationState((prev) => {
                  return {
                    ...prev,

                    page: prev.page > 0 ? prev.page - 1 : 0,
                  }
                })
              }}
              className="p-4 w-fit bg-gray-200 hover:bg-gray-500 focus:bg-gray-500"
            >
              precedant
            </button>
          </div>
          <div className="p-4">{paginationState.page}</div>
          <div>
            <button
              type="button"
              onClick={(e) => {
                setPaginationState((prev) => {
                  return {
                    ...prev,
                    page:
                      paginationState.page >= paginationState.total / paginationState.limit ? prev.page : prev.page + 1,
                  }
                })
              }}
              className="p-4 w-fit bg-gray-200 hover:bg-gray-500 focus:bg-gray-500"
            >
              suivant
            </button>
          </div>
        </div> */}
        <Pagination setPaginationState={setPaginationState} paginationState={paginationState} />
      </div>
    </div>
  )
}
