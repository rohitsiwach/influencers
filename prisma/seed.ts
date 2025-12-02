import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import influencersData from '../influencer_liste.json'

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
})

async function main() {
  console.log('Start seeding...')
  
  // Clear existing data
  await prisma.favorite.deleteMany()
  await prisma.influencer.deleteMany()
  await prisma.user.deleteMany()
  
  // Seed influencers
  for (const influencer of influencersData) {
    await prisma.influencer.create({
      data: {
        externalId: influencer.id,
        name: influencer.name,
        gender: influencer.gender,
        age: influencer.age,
        platform: influencer.platform,
        followers: influencer.followers,
        engagementRate: influencer.engagementRate,
        avgLikes: influencer.avgLikes,
        avgComments: influencer.avgComments,
        topics: influencer.topics,
        location: influencer.location,
        imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${influencer.name}`,
      },
    })
  }
  
  console.log(`Seeded ${influencersData.length} influencers`)
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
