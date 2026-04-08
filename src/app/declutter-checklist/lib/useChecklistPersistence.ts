"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  ARCHIVED_ITEMS_STORAGE_KEY,
  CUSTOM_ITEMS_STORAGE_KEY,
  HISTORY_STORAGE_KEY,
  IMPORTED_LISTS_STORAGE_KEY,
  MOMENTUM_DIALOG_STORAGE_KEY,
  REMOVED_ITEMS_STORAGE_KEY,
} from "./checklist";
import { ChecklistState, normalizeChecklistState } from "./state";

type ChecklistStateSetters = {
  setCustomItemsByCategory: Dispatch<
    SetStateAction<ChecklistState["customItemsByCategory"]>
  >;
  setArchivedItemsByEntryKey: Dispatch<
    SetStateAction<ChecklistState["archivedItemsByEntryKey"]>
  >;
  setRemovedItemsByCategory: Dispatch<
    SetStateAction<ChecklistState["removedItemsByCategory"]>
  >;
  setHistoryByDate: Dispatch<SetStateAction<ChecklistState["historyByDate"]>>;
  setImportedLists: Dispatch<SetStateAction<ChecklistState["importedLists"]>>;
  setHasSeenMomentumDialog: Dispatch<SetStateAction<boolean>>;
  setHasLoadedStorage: Dispatch<SetStateAction<boolean>>;
};

type UseChecklistPersistenceOptions = {
  state: ChecklistState;
  setters: ChecklistStateSetters;
  hasLoadedStorage: boolean;
  enableCloudSave?: boolean;
};

function applyChecklistState(
  state: ChecklistState,
  setters: ChecklistStateSetters,
) {
  setters.setCustomItemsByCategory(state.customItemsByCategory);
  setters.setArchivedItemsByEntryKey(state.archivedItemsByEntryKey);
  setters.setRemovedItemsByCategory(state.removedItemsByCategory);
  setters.setHistoryByDate(state.historyByDate);
  setters.setImportedLists(state.importedLists);
  setters.setHasSeenMomentumDialog(state.hasSeenMomentumDialog);
}

function loadChecklistStateFromStorage() {
  try {
    return normalizeChecklistState({
      customItemsByCategory: JSON.parse(
        window.localStorage.getItem(CUSTOM_ITEMS_STORAGE_KEY) ?? "{}",
      ),
      archivedItemsByEntryKey: JSON.parse(
        window.localStorage.getItem(ARCHIVED_ITEMS_STORAGE_KEY) ?? "{}",
      ),
      removedItemsByCategory: JSON.parse(
        window.localStorage.getItem(REMOVED_ITEMS_STORAGE_KEY) ?? "{}",
      ),
      historyByDate: JSON.parse(
        window.localStorage.getItem(HISTORY_STORAGE_KEY) ?? "{}",
      ),
      importedLists: JSON.parse(
        window.localStorage.getItem(IMPORTED_LISTS_STORAGE_KEY) ?? "[]",
      ),
      hasSeenMomentumDialog:
        window.localStorage.getItem(MOMENTUM_DIALOG_STORAGE_KEY) === "true",
    });
  } catch {
    return normalizeChecklistState({});
  }
}

function persistChecklistStateToStorage(state: ChecklistState) {
  window.localStorage.setItem(
    CUSTOM_ITEMS_STORAGE_KEY,
    JSON.stringify(state.customItemsByCategory),
  );
  window.localStorage.setItem(
    ARCHIVED_ITEMS_STORAGE_KEY,
    JSON.stringify(state.archivedItemsByEntryKey),
  );
  window.localStorage.setItem(
    REMOVED_ITEMS_STORAGE_KEY,
    JSON.stringify(state.removedItemsByCategory),
  );
  window.localStorage.setItem(
    HISTORY_STORAGE_KEY,
    JSON.stringify(state.historyByDate),
  );
  window.localStorage.setItem(
    IMPORTED_LISTS_STORAGE_KEY,
    JSON.stringify(state.importedLists),
  );
  window.localStorage.setItem(
    MOMENTUM_DIALOG_STORAGE_KEY,
    String(state.hasSeenMomentumDialog),
  );
}

type ChecklistApiResponse = {
  loggedIn: boolean;
  hasData: boolean;
  state: ChecklistState | null;
};

export function useChecklistPersistence({
  state,
  setters,
  hasLoadedStorage,
  enableCloudSave = true,
}: UseChecklistPersistenceOptions) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<
    "idle" | "syncing" | "saved" | "error"
  >("idle");
  const cloudBootstrapStartedRef = useRef(false);
  const cloudReadyRef = useRef(false);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (hasLoadedStorage) return;

    const storageState = loadChecklistStateFromStorage();
    applyChecklistState(storageState, setters);
    setters.setHasLoadedStorage(true);
  }, [hasLoadedStorage, setters]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    persistChecklistStateToStorage(state);
  }, [hasLoadedStorage, state]);

  useEffect(() => {
    if (!hasLoadedStorage) return;

    let cancelled = false;

    fetch("/api/auth/status", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        setIsLoggedIn(Boolean(data?.loggedIn));
        setIsAuthResolved(true);
      })
      .catch(() => {
        if (cancelled) return;
        setIsLoggedIn(false);
        setIsAuthResolved(true);
      });

    return () => {
      cancelled = true;
    };
  }, [hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage || !isAuthResolved || !isLoggedIn) return;
    if (cloudBootstrapStartedRef.current) return;

    let cancelled = false;
    cloudBootstrapStartedRef.current = true;
    setCloudStatus("syncing");

    fetch("/api/checklist", { cache: "no-store" })
      .then((response) => response.json() as Promise<ChecklistApiResponse>)
      .then(async (data) => {
        if (cancelled) return;

        if (data.hasData && data.state) {
          const cloudState = normalizeChecklistState(data.state);
          applyChecklistState(cloudState, setters);
          persistChecklistStateToStorage(cloudState);
          cloudReadyRef.current = true;
          setCloudStatus("saved");
          return;
        }

        if (!enableCloudSave) {
          cloudReadyRef.current = true;
          setCloudStatus("idle");
          return;
        }

        const response = await fetch("/api/checklist", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stateRef.current),
        });

        if (!response.ok) throw new Error("Failed to create cloud snapshot");
        cloudReadyRef.current = true;
        setCloudStatus("saved");
      })
      .catch(() => {
        if (!cancelled) setCloudStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [enableCloudSave, hasLoadedStorage, isAuthResolved, isLoggedIn, setters]);

  useEffect(() => {
    if (
      !enableCloudSave ||
      !hasLoadedStorage ||
      !isLoggedIn ||
      !isAuthResolved
    ) {
      return;
    }
    if (!cloudReadyRef.current) return;

    const timeoutId = window.setTimeout(() => {
      setCloudStatus("syncing");
      fetch("/api/checklist", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to save checklist state");
          setCloudStatus("saved");
        })
        .catch(() => {
          setCloudStatus("error");
        });
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [enableCloudSave, hasLoadedStorage, isAuthResolved, isLoggedIn, state]);

  return {
    isLoggedIn,
    isAuthResolved,
    cloudStatus,
  };
}
