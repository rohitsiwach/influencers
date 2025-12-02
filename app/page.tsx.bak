import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

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

  const influencers = await prisma.influencer.findMany({
    orderBy: { followers: "desc" },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {influencers.map((inf) => (
        <div key={inf.id} className="border rounded p-4">
          {inf.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={inf.imageUrl || ""} alt={inf.name} className="w-full h-40 object-cover rounded" />
          )}
          <h2 className="text-lg font-semibold mt-2">{inf.name}</h2>
          <p className="text-sm text-gray-600">{inf.location}</p>
          <p className="text-sm">Followers: {inf.followers.toLocaleString()}</p>
          <p className="text-sm">Platforms: {inf.platform.join(', ')}</p>
          <Link href={`/influencers/${inf.id}`} className="underline mt-2 inline-block">View Details</Link>
        </div>
      ))}
    </div>
  );
}
