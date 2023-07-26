import Link from 'next/link'
import AddPlayerButton from './AddPlayerButton'

const NavBar = () => {
  return (
    <nav className="max-w-6xl mx-auto bg-white flex flex-row justify-between p-8 border items-end ">
      <div>
        <Link href={'/'} className="capitalize font-extrabold hover:text-gray-400 focus:text-gray-400">
          Liste des jouers
        </Link>
      </div>
      <div>
        <AddPlayerButton />
      </div>
    </nav>
  )
}
export default NavBar
