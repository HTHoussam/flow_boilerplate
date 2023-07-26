'use client'

import { deletePlayerAction } from '@/app/actions'
import { PlayerType } from '@/lib/types'
import { ClipboardDocumentIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
interface ActionsContainerProps {
  player: PlayerType
}

const ActionsContainer: React.FC<ActionsContainerProps> = ({ player }: { player: PlayerType }) => {
  const router = useRouter()

  const deleteHandler = async () => {
    try {
      await deletePlayerAction(player)
      window && window.location.reload()
      toast(`jouer supprimee`, { hideProgressBar: true, autoClose: 3000, type: 'success' })
    } catch (error) {
      toast(`Erreur: lors de la suppression`, { hideProgressBar: true, autoClose: 3000, type: 'error' })
    }
  }
  const handleCopyToClipboard = () => {
    try {
      const jsonString = JSON.stringify(player, null, 2)
      navigator.clipboard.writeText(jsonString)
      return toast(`object copied to clipboard`, { hideProgressBar: true, autoClose: 3000, type: 'success' })
    } catch (error) {
      return toast(`Error: couldn't copy `, { hideProgressBar: true, autoClose: 3000, type: 'error' })
    }
  }
  return (
    <div className="flex flex-row space-x-4 w-fit ml-auto">
      <button
        onClick={() => router.push(`/players/edit/${player.id}`)}
        type="button"
        className="p-2 hover:text-blue-400 focus:text-blue-400"
      >
        <PencilIcon width={25} height={25} />
      </button>
      <button type="button" onClick={handleCopyToClipboard} className="p-2 hover:text-gray-400 focus:text-gray-400">
        <ClipboardDocumentIcon width={25} height={25} />
      </button>
      <button type="button" className="p-2 hover:text-red-400 focus:text-red-400" onClick={deleteHandler}>
        <TrashIcon width={25} height={25} />
      </button>
    </div>
  )
}
export default ActionsContainer
