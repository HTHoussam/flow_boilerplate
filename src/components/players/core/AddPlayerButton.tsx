'use client'
import { useRouter } from 'next/navigation'

const AddPlayerButton = () => {
  const router = useRouter()
  return <button onClick={() => router.push('/players/add')}>ajouter un jouer</button>
}
export default AddPlayerButton
