"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/i18n/i18n-provider";
import { renderShareCard, type ShareCardItem } from "./card-image";
import LoadingLabel from "@/components/LoadingLabel";

export default function ShareCardPreview({
  item,
  onReady,
  onError,
}: {
  item: ShareCardItem;
  onReady?: (image: string | null) => void;
  onError?: (failed: boolean) => void;
}) {
  const { t } = useI18n();
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [rendering, setRendering] = useState(true);
  const { name, pieces, story, image: photo } = item;
  const eyebrow = t("itemShare.eyebrow");
  const piecesLabel = t("itemShare.pieces");
  const noPhoto = t("itemShare.noPhoto");

  useEffect(() => {
    let cancelled = false;
    // Keep the existing card mounted while preparing its replacement.
    setRendering(true);
    setError(false);
    onError?.(false);
    onReady?.(null);
    const timer = setTimeout(() => {
      renderShareCard(
        { name, pieces, story, image: photo },
        { eyebrow, pieces: piecesLabel, noPhoto },
      )
        .then((result) => {
          if (cancelled) return;
          setImage(result);
          setRendering(false);
          onReady?.(result);
        })
        .catch(() => {
          if (!cancelled) {
            setError(true);
            setRendering(false);
            onError?.(true);
          }
        });
    }, 180);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [
    name,
    pieces,
    story,
    photo,
    eyebrow,
    piecesLabel,
    noPhoto,
    onReady,
    onError,
  ]);

  return (
    <div
      className="mx-auto w-full max-w-[460px] overflow-hidden rounded-sm border border-outline-variant/50 bg-surface shadow-soft-depth"
      aria-busy={rendering}
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
          {error ? (
            t("itemShare.imageError")
          ) : (
            <LoadingLabel>{t("itemShare.loading")}</LoadingLabel>
          )}
        </div>
      )}
      {image && (rendering || error) && (
        <p
          className="px-4 py-2 text-center text-xs text-outline"
          role={error ? "alert" : "status"}
        >
          {error ? (
            t("itemShare.imageError")
          ) : (
            <LoadingLabel>{t("itemShare.loading")}</LoadingLabel>
          )}
        </p>
      )}
    </div>
  );
}
