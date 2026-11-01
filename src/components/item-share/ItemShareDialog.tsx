"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import DownloadIcon from "@mui/icons-material/Download";
import CheckIcon from "@mui/icons-material/Check";
import LoadingLabel from "@/components/LoadingLabel";
import { useI18n } from "@/i18n/i18n-provider";
import { useLoginDialog } from "@/components/LoginDialogProvider";
import {
  disableItemShare,
  getItemShare,
  saveItemShare,
  saveItemPhoto,
} from "@/actions/item-shares";
import ShareCardPreview from "./ShareCardPreview";
import { downloadShareCard, prepareSharePhoto } from "./card-image";

type Item = { id: string; name: string; pieces: number; image: string | null };
const primaryButton =
  "flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition enabled:hover:brightness-110 disabled:cursor-default disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";
const secondaryButton =
  "flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-surface disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary";

export default function ItemShareDialog({
  item,
  loggedIn,
  onClose,
  onPhotoSaved,
}: {
  item: Item;
  loggedIn: boolean;
  onClose: () => void;
  onPhotoSaved?: (id: string, image: string) => void;
}) {
  const { t, localePath } = useI18n();
  const { setOpen: setLoginOpen } = useLoginDialog();
  const [story, setStory] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cardImage, setCardImage] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);
  const [operation, setOperation] = useState<
    "load" | "photo" | "publish" | "disable" | "copy" | null
  >(loggedIn ? "load" : null);
  const operationLock = useRef(false);
  const busy = operation !== null;
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [saved, setSaved] = useState<{
    story: string;
    image: string | null;
  } | null>(null);
  const dirty =
    !!token && (story.trim() !== saved?.story || photo !== saved?.image);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");
  const shareUrl = token ? `${origin}${localePath(`/share/${token}`)}` : "";

  useEffect(() => {
    setOrigin(window.location.origin);
    if (!loggedIn) return;
    let cancelled = false;
    getItemShare(item.id)
      .then((share) => {
        if (cancelled) return;
        if (share) {
          setStory(share.story);
          setPhoto(share.image);
          setToken(share.token);
          setSaved({ story: share.story, image: share.image });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("itemShare.error");
          setLoadingFailed(true);
        }
      })
      .finally(() => {
        if (!cancelled) setOperation(null);
      });
    return () => {
      cancelled = true;
    };
  }, [item.id, loggedIn]);

  async function publish() {
    if (busy || operationLock.current || loadingFailed) return;
    if (!loggedIn) {
      setLoginOpen(true);
      return;
    }
    operationLock.current = true;
    setOperation("publish");
    setError(null);
    setStatus(null);
    setCopied(false);
    try {
      const result = await saveItemShare(item.id, { story, image: photo });
      setToken(result.token);
      setPhoto(result.image);
      setStory(story.trim());
      setSaved({ story: story.trim(), image: result.image });
      setStatus("itemShare.saveSuccess");
    } catch {
      setError("itemShare.error");
    } finally {
      operationLock.current = false;
      setOperation(null);
    }
  }

  async function disable() {
    if (busy || operationLock.current) return;
    operationLock.current = true;
    setOperation("disable");
    setError(null);
    setStatus(null);
    try {
      await disableItemShare(item.id);
      setToken(null);
      setSaved(null);
      setCopied(false);
      setStatus("itemShare.disabled");
    } catch {
      setError("itemShare.error");
    } finally {
      operationLock.current = false;
      setOperation(null);
    }
  }

  async function copyLink() {
    if (busy || operationLock.current) return;
    operationLock.current = true;
    setOperation("copy");
    setError(null);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setError("itemShare.error");
    } finally {
      operationLock.current = false;
      setOperation(null);
    }
  }

  async function upload(file: File) {
    if (busy || operationLock.current || loadingFailed) return;
    operationLock.current = true;
    setOperation("photo");
    setError(null);
    setStatus(null);
    try {
      let image: string;
      try {
        image = await prepareSharePhoto(file);
      } catch {
        setError("itemShare.photoError");
        return;
      }
      if (loggedIn) {
        await saveItemPhoto(item.id, image);
        onPhotoSaved?.(item.id, image);
      }
      setPhoto(image);
      setCopied(false);
    } catch {
      setError("itemShare.photoSaveError");
    } finally {
      operationLock.current = false;
      setOperation(null);
    }
  }

  return (
    <Dialog
      open
      onClose={busy ? undefined : onClose}
      maxWidth="lg"
      fullWidth
      aria-labelledby="item-share-title"
      PaperProps={{
        sx: {
          borderRadius: "24px",
          bgcolor: "#fbf9f8",
          color: "#1b1c1c",
          m: { xs: 1.5, sm: 4 },
          width: { xs: "calc(100% - 24px)", sm: "100%" },
        },
      }}
    >
      <IconButton
        aria-label={t("itemShare.close")}
        onClick={onClose}
        disabled={busy}
        sx={{ position: "absolute", right: 14, top: 14, zIndex: 1 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ p: { xs: 3, md: 5 } }}>
        <div className="grid items-start gap-8 md:grid-cols-[1fr_0.9fr] md:gap-12">
          <div className="order-2 md:order-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-outline">
              {t("itemShare.preview")}
            </p>
            <ShareCardPreview
              item={{
                name: item.name,
                pieces: item.pieces,
                story,
                image: token ? photo : photo || item.image,
              }}
              onReady={setCardImage}
              onError={setPreviewError}
            />
            <p className="mt-3 text-center text-xs leading-5 text-outline">
              {t("itemShare.downloadHint")}
            </p>
          </div>
          <div className="order-1 pt-5 md:order-2">
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-primary">
              SECOND LOOK
            </p>
            <h2
              id="item-share-title"
              className="text-3xl font-medium leading-tight tracking-tight md:text-4xl"
            >
              {t("itemShare.title")}
            </h2>
            <p className="mb-8 mt-3 text-sm leading-6 text-outline">
              {t("itemShare.subtitle")}
            </p>
            {operation === "load" && (
              <p className="mb-4 text-sm text-outline">
                <LoadingLabel>{t("itemShare.loadingShare")}</LoadingLabel>
              </p>
            )}
            <label
              className="mb-2 flex items-center justify-between text-sm font-semibold"
              htmlFor="share-story"
            >
              {t("itemShare.story")}
              <span className="text-xs font-normal text-outline">
                {t("itemShare.optional")}
              </span>
            </label>
            <textarea
              id="share-story"
              value={story}
              maxLength={600}
              disabled={busy || loadingFailed}
              onChange={(event) => {
                setStory(event.target.value);
                setStatus(null);
                setCopied(false);
              }}
              placeholder={t("itemShare.storyPlaceholder")}
              rows={4}
              className="w-full resize-y rounded-xl border border-outline-variant bg-white p-4 text-sm leading-6 outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
            />
            <p className="mb-4 mt-1 text-right text-xs text-outline">
              {story.length}/600
            </p>
            <label
              className={`${secondaryButton} ${busy || loadingFailed ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
            >
              {operation === "photo" ? (
                <LoadingLabel>{t("itemShare.savingPhoto")}</LoadingLabel>
              ) : photo || item.image ? (
                t("itemShare.changePhoto")
              ) : (
                t("itemShare.photo")
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                disabled={busy || loadingFailed}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void upload(file);
                  event.target.value = "";
                }}
              />
            </label>
            <p className="mb-6 mt-2 text-xs text-outline">
              {t("itemShare.photoHint")}
              {loggedIn && (
                <span className="mt-1 block">
                  {t("itemShare.photoSyncHint")}
                </span>
              )}
            </p>
            <div className="space-y-3">
              <button
                type="button"
                className={primaryButton}
                disabled={busy || loadingFailed || (!!token && !dirty)}
                onClick={publish}
              >
                {operation === "publish" ? (
                  <LoadingLabel>
                    {t(token ? "itemShare.saving" : "itemShare.creating")}
                  </LoadingLabel>
                ) : (
                  <>
                    {token && !dirty ? (
                      <CheckIcon fontSize="small" />
                    ) : (
                      <LinkIcon fontSize="small" />
                    )}
                    {t(
                      !loggedIn
                        ? "itemShare.login"
                        : token
                          ? dirty
                            ? "itemShare.update"
                            : "itemShare.saved"
                          : "itemShare.publish",
                    )}
                  </>
                )}
              </button>
              <button
                type="button"
                className={secondaryButton}
                disabled={!cardImage || busy || loadingFailed}
                onClick={() => {
                  if (cardImage) downloadShareCard(cardImage, item.name);
                }}
              >
                {!cardImage && !previewError ? (
                  <LoadingLabel>{t("itemShare.preparingPng")}</LoadingLabel>
                ) : (
                  <>
                    <DownloadIcon fontSize="small" />
                    {t("itemShare.download")}
                  </>
                )}
              </button>
            </div>
            {token && (
              <div className="mt-6 space-y-3 border-t border-outline-variant pt-5">
                <p className="text-xs leading-5 text-outline">
                  {t(dirty ? "itemShare.unsaved" : "itemShare.linkHint")}
                </p>
                <input
                  aria-label={t("itemShare.open")}
                  readOnly
                  value={shareUrl}
                  onFocus={(event) => event.target.select()}
                  className="min-h-11 w-full rounded-lg border border-outline-variant bg-white px-3 text-xs text-on-surface"
                />
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold text-primary">
                  <button type="button" onClick={copyLink} disabled={busy}>
                    {operation === "copy" ? (
                      <LoadingLabel>{t("itemShare.copying")}</LoadingLabel>
                    ) : (
                      t(copied ? "itemShare.copied" : "itemShare.copy")
                    )}
                  </button>
                  <a href={shareUrl} target="_blank" rel="noopener noreferrer">
                    {t("itemShare.open")}
                  </a>
                  <button
                    type="button"
                    onClick={disable}
                    disabled={busy}
                    className="text-outline underline underline-offset-4"
                  >
                    {operation === "disable" ? (
                      <LoadingLabel>{t("itemShare.disabling")}</LoadingLabel>
                    ) : (
                      t("itemShare.disable")
                    )}
                  </button>
                </div>
              </div>
            )}
            {error && (
              <p role="alert" className="mt-4 text-sm leading-6 text-error">
                {t(error)}
              </p>
            )}
            {status && (
              <p role="status" className="mt-4 text-sm leading-6 text-primary">
                {t(status)}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
