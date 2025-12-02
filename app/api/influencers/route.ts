import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const platform = searchParams.get('platform') || ''
    const location = searchParams.get('location') || ''
    const topic = searchParams.get('topic') || ''
    const minFollowers = searchParams.get('minFollowers') || '0'
    const gender = searchParams.get('gender') || ''

    const where: any = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { topics: { hasSome: [search] } },
              ],
            }
          : {},
        platform ? { platform: { has: platform } } : {},
        location ? { location: { contains: location, mode: 'insensitive' } } : {},
        topic ? { topics: { has: topic } } : {},
        gender ? { gender: { equals: gender, mode: 'insensitive' } } : {},
        { followers: { gte: parseInt(minFollowers) } },
      ],
    }

    const influencers = await prisma.influencer.findMany({
      where,
      orderBy: { followers: 'desc' },
      include: {
        favorites: {
          where: {
            userId: session.user.id,
          },
        },
      },
    })

    const influencersWithFavorite = influencers.map((influencer) => ({
      ...influencer,
      isFavorite: influencer.favorites.length > 0,
      favorites: undefined,
    }))

    return NextResponse.json(influencersWithFavorite)
  } catch (error) {
    console.error('Error fetching influencers:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
