'use client'
import { useRouter } from 'next/navigation'
import { PlusIcon } from '@heroicons/react/24/outline'

const AddPlayerButton = () => {
  const router = useRouter()
  return (
    <button
      className="flex capitalize items-center justify-between px-2 rounded-sm border border-black h-8 w-44 hover:bg-gray-400 focus:bg-gray-400"
      onClick={() => router.push('/players/add')}
    >
      <PlusIcon width={15} height={15} /> ajouter un jouer
    </button>
  )
}
export default AddPlayerButton
