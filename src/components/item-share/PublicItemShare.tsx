"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/i18n-provider";
import ShareCardPreview from "./ShareCardPreview";
import { downloadShareCard, type ShareCardItem } from "./card-image";
import LoadingLabel from "@/components/LoadingLabel";

export default function PublicItemShare({
  item,
}: {
  item: ShareCardItem | null;
}) {
  const { t, localePath } = useI18n();
  const [image, setImage] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);
  return (
    <main className="min-h-[80vh] bg-surface px-6 pb-20 pt-32 text-on-surface md:pt-40">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-primary">
            SECOND LOOK
          </p>
          <h1 className="text-3xl font-medium tracking-tight md:text-5xl">
            {t(item ? "itemShare.publicTitle" : "itemShare.unavailable")}
          </h1>
          <p className="mt-4 text-base leading-7 text-outline">
            {t(item ? "itemShare.publicSubtitle" : "itemShare.unavailableDesc")}
          </p>
        </div>
        {item && (
          <>
            <ShareCardPreview
              item={item}
              onReady={setImage}
              onError={setPreviewError}
            />
            <div className="mx-auto mt-6 max-w-[460px] text-center">
              <button
                disabled={!image}
                onClick={() => {
                  if (image) downloadShareCard(image, item.name);
                }}
                className="min-h-12 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
              >
                {image || previewError ? (
                  t("itemShare.download")
                ) : (
                  <LoadingLabel>{t("itemShare.preparingPng")}</LoadingLabel>
                )}
              </button>
              <p className="mt-3 text-xs leading-5 text-outline">
                {t("itemShare.downloadHint")}
              </p>
            </div>
          </>
        )}
        <div className="mx-auto mt-16 max-w-xl border-t border-outline-variant pt-8 text-center">
          <h2 className="text-xl font-medium">{t("itemShare.yourOwn")}</h2>
          <p className="mt-2 text-sm text-outline">
            {t("itemShare.yourOwnDesc")}
          </p>
          <Link
            href={localePath("/decluttering-decision-guide")}
            className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            {t("itemShare.yourOwnAction")} →
          </Link>
        </div>
      </div>
    </main>
  );
}
