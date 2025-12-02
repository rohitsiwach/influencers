import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function InfluencerDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return <div>Please login to view.</div>
  }

  const influencer = await prisma.influencer.findUnique({ where: { id: params.id } })
  if (!influencer) return <div>Not found</div>

  return (
    <div className="max-w-2xl">
      {influencer.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={influencer.imageUrl} alt={influencer.name} className="w-full h-64 object-cover rounded" />
      )}
      <h1 className="text-2xl font-semibold mt-4">{influencer.name}</h1>
      <p className="text-gray-600">{influencer.location}</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p>Gender: {influencer.gender}</p>
          <p>Age: {influencer.age}</p>
          <p>Followers: {influencer.followers.toLocaleString()}</p>
          <p>Engagement Rate: {influencer.engagementRate}%</p>
        </div>
        <div>
          <p>Avg Likes: {influencer.avgLikes}</p>
          <p>Avg Comments: {influencer.avgComments}</p>
          <p>Platforms: {influencer.platform.join(', ')}</p>
          <p>Topics: {influencer.topics.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}
