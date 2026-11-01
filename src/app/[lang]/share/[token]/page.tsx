import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PublicItemShare from "@/components/item-share/PublicItemShare";

export const dynamic = "force-dynamic";

// Shared items are accessible by link, not discoverable in search results.
export const metadata: Metadata = {
  title: "Second Look · An object & its story",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: null },
  openGraph: {
    title: "Second Look · An object & its story",
    description: "A little piece of someone's life, shared with you.",
    images: [],
  },
  twitter: { card: "summary", images: [] },
};

export default async function SharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const share = /^[0-9a-f-]{36}$/i.test(token)
    ? await prisma.itemShare.findUnique({
        where: { token },
        select: {
          story: true,
          image: true,
          item: { select: { name: true, pieces: true, image: true } },
        },
      })
    : null;
  return (
    <PublicItemShare
      item={
        share
          ? {
              name: share.item.name,
              pieces: share.item.pieces,
              story: share.story,
              image: share.image || share.item.image,
            }
          : null
      }
    />
  );
}
