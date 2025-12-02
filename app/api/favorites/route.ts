import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: { influencer: true },
  })

  return NextResponse.json(favorites.map(f => f.influencer))
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { influencerId } = await req.json()
  if (!influencerId) return NextResponse.json({ error: 'influencerId required' }, { status: 400 })

  await prisma.favorite.upsert({
    where: { userId_influencerId: { userId: session.user.id, influencerId } },
    update: {},
    create: { userId: session.user.id, influencerId },
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { influencerId } = await req.json()
  if (!influencerId) return NextResponse.json({ error: 'influencerId required' }, { status: 400 })

  await prisma.favorite.delete({
    where: { userId_influencerId: { userId: session.user.id, influencerId } },
  })

  return NextResponse.json({ ok: true })
}
