import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { InfluencerList } from "@/components/InfluencerList";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return (
      <div>
        <p>Please login to view influencers.</p>
        <Link href="/login" className="underline">Go to Login</Link>
      </div>
    );
  }

  const [influencers, favorites] = await Promise.all([
    prisma.influencer.findMany({
      orderBy: { followers: "desc" },
    }),
    prisma.favorite.findMany({
      where: { userId: session.user.id },
      select: { influencerId: true },
    }),
  ]);

  const favoriteIds = new Set(favorites.map((f) => f.influencerId));

  const influencersWithFavorites = influencers.map((inf) => ({
    ...inf,
    isFavorite: favoriteIds.has(inf.id),
  }));

  return <InfluencerList influencers={influencersWithFavorites} />;
}
