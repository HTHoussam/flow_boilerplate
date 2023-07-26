import { PaginationType, PlayerType } from '@/lib/types'
import ActionsContainer from './core/ActionsContainer'
import Pagination from './core/Pagination'
import { Dispatch, SetStateAction } from 'react'
import { formatSalary } from '@/lib/helpers'

const PlayersTable = ({
  players,
  setPaginationState,
  paginationState,
}: {
  players: PlayerType[]
  setPaginationState: Dispatch<SetStateAction<PaginationType>>
  paginationState: PaginationType
}) => {
  return (
    <div className="max-w-7xl relative overflow-x-auto shadow-md sm:rounded-lg mt-8 border-2 rounded-sm text-center">
      <table className="table-auto w-full space-x-4 p-4 mx-auto">
        <thead className="text-gray-500 font-mono text-lg">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              nom
            </th>
            <th scope="col" className="px-6 py-3">
              prenom
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
          {players.map((p) => (
            <tr key={p.id}>
              <td className="px-6 py-4">{p.id}</td>
              <td className="px-6 py-4">{p.firstName}</td>
              <td className="px-6 py-4">{p.lastName}</td>
              <td className="px-6 py-4">{formatSalary(p.salary ?? '')}</td>
              <td className="px-6 py-4">{p.goals}</td>
              <td className="px-6 py-4">
                <ActionsContainer player={p} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination setPaginationState={setPaginationState} paginationState={paginationState} />
    </div>
  )
}
export default PlayersTable
