"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/i18n/i18n-provider";
import { renderShareCard, type ShareCardItem } from "./card-image";

export default function ShareCardPreview({
  item,
  onReady,
}: {
  item: ShareCardItem;
  onReady?: (image: string | null) => void;
}) {
  const { t } = useI18n();
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const { name, pieces, story, image: photo } = item;
  const eyebrow = t("itemShare.eyebrow");
  const piecesLabel = t("itemShare.pieces");
  const noPhoto = t("itemShare.noPhoto");

  useEffect(() => {
    let cancelled = false;
    setImage(null);
    setError(false);
    onReady?.(null);
    const timer = setTimeout(() => {
      renderShareCard(
        { name, pieces, story, image: photo },
        { eyebrow, pieces: piecesLabel, noPhoto },
      )
        .then((result) => {
          if (cancelled) return;
          setImage(result);
          onReady?.(result);
        })
        .catch(() => {
          if (!cancelled) setError(true);
        });
    }, 180);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [name, pieces, story, photo, eyebrow, piecesLabel, noPhoto, onReady]);

  return (
    <div
      className="mx-auto w-full max-w-[460px] overflow-hidden rounded-sm border border-outline-variant/50 bg-surface shadow-soft-depth"
      aria-busy={!image && !error}
    >
      {image ? (
        <Image
          unoptimized
          width={1800}
          height={2400}
          src={image}
          alt={[name, story].filter(Boolean).join(" — ")}
          className="block h-auto w-full"
        />
      ) : (
        <div
          className="flex aspect-[3/4] items-center justify-center p-10 text-center text-sm leading-6 text-outline"
          role="status"
        >
          {error ? t("itemShare.imageError") : t("itemShare.loading")}
        </div>
      )}
    </div>
  );
}
