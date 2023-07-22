'use client'
import { PaginationType } from '@/lib/types'
import { Dispatch, SetStateAction } from 'react'

const Pagination = ({
  setPaginationState,
  paginationState,
}: {
  setPaginationState: Dispatch<SetStateAction<PaginationType>>

  paginationState: PaginationType
}) => {
  return (
    <div className="flex flex-row justify-between items-baseline bg-gray-200 space-x-2 ">
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
                page: paginationState.page >= paginationState.total / paginationState.limit ? prev.page : prev.page + 1,
              }
            })
          }}
          className="p-4 w-fit bg-gray-200 hover:bg-gray-500 focus:bg-gray-500"
        >
          suivant
        </button>
      </div>
    </div>
  )
}
export default Pagination
