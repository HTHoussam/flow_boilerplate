import AddForm from '@/components/players/AddForm'
import { switchToPlayerType } from '@/lib/helpers'
import { getPlayerById } from '@/lib/queries/functions'
import { PrismaPlayerType } from '@/lib/types'

type Params = {
  params: {
    id: string
  }
}

export default async function EditPlayerPage({ params: { id } }: Params) {
  const playerData: Promise<PrismaPlayerType | null> = getPlayerById(id)
  const player = await playerData

  if (!player || player === null) return <div>404</div>
  return (
    <div>
      <h1 className="mx-auto text-lg font-bold w-fit mt-4">
        {player.firstName} {player.lastName}
      </h1>
      <AddForm playerData={switchToPlayerType(player)} isEditMode={true} />
    </div>
  )
}
