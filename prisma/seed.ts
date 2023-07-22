const { PrismaClient } = require('@prisma/client')
import myData from './players.json'

const prisma = new PrismaClient()
async function main() {
  const dataToSeed = myData.map((d) => ({
    firstName: d.firstname,
    lastName: d.lastname,
    currency: d.devise,
    goals: d.goal,
    pictureURl: d.pictureURl,
    salary: d.salary.toString(),
  }))
  const d = await prisma.player.createMany({
    data: dataToSeed as any,
  })
  console.log('SEEED', d)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
