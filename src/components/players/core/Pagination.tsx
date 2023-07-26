'use client'
import { PaginationType } from '@/lib/types'
import { Dispatch, SetStateAction } from 'react'

interface PaginationProps {
  setPaginationState: Dispatch<SetStateAction<PaginationType>>
  paginationState: PaginationType
}

const Pagination: React.FC<PaginationProps> = ({ setPaginationState, paginationState }) => {
  const handlePrevious = () => {
    if (paginationState.page === 1) return
    setPaginationState((prev) => ({
      ...prev,
      page: prev.page - 1 > 0 ? prev.page - 1 : 1,
    }))
  }
  const handleNext = () => {
    if (paginationState.totalPages === paginationState.page) return
    setPaginationState((prev) => ({
      ...prev,
      page: prev.page + 1 > prev.totalPages ? prev.page : prev.page + 1,
    }))
  }

  return (
    <div className="flex flex-row justify-between items-baseline bg-gray-200 space-x-2">
      <div>
        <button
          type="button"
          onClick={handlePrevious}
          className="p-4 w-fit bg-gray-200 hover:bg-gray-500 focus:bg-gray-500"
        >
          Précédent
        </button>
      </div>
      <div className="p-4">{paginationState.page}</div>
      <div>
        <button
          type="button"
          onClick={handleNext}
          className="p-4 w-fit bg-gray-200 hover:bg-gray-500 focus:bg-gray-500"
        >
          Suivant
        </button>
      </div>
    </div>
  )
}

export default Pagination
