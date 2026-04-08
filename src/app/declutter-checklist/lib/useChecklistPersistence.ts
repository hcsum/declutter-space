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

function serializeChecklistState(state: ChecklistState) {
  return JSON.stringify(state);
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
  const [isBootstrapResolved, setIsBootstrapResolved] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<
    "idle" | "syncing" | "saved" | "error"
  >("idle");
  const cloudReadyRef = useRef(false);
  const stateRef = useRef(state);
  const settersRef = useRef(setters);
  const lastSyncedStateRef = useRef<string | null>(null);
  const inFlightSaveRef = useRef(false);
  const queuedSaveRef = useRef<ChecklistState | null>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    settersRef.current = setters;
  }, [setters]);

  useEffect(() => {
    queuedSaveRef.current = state;
  }, [state]);

  useEffect(() => {
    if (hasLoadedStorage) return;

    const storageState = loadChecklistStateFromStorage();
    applyChecklistState(storageState, settersRef.current);
    settersRef.current.setHasLoadedStorage(true);
  }, [hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    persistChecklistStateToStorage(state);
  }, [hasLoadedStorage, state]);

  useEffect(() => {
    if (!hasLoadedStorage) return;

    let cancelled = false;
    setCloudStatus("syncing");

    fetch("/api/checklist", { cache: "no-store" })
      .then((response) => response.json() as Promise<ChecklistApiResponse>)
      .then(async (data) => {
        if (cancelled) return;

        setIsLoggedIn(data.loggedIn);

        if (!data.loggedIn) {
          cloudReadyRef.current = false;
          setCloudStatus("idle");
          setIsBootstrapResolved(true);
          return;
        }

        if (data.hasData && data.state) {
          const cloudState = normalizeChecklistState(data.state);
          applyChecklistState(cloudState, settersRef.current);
          persistChecklistStateToStorage(cloudState);
          lastSyncedStateRef.current = serializeChecklistState(cloudState);
          cloudReadyRef.current = true;
          setCloudStatus("saved");
          setIsBootstrapResolved(true);
          return;
        }

        if (!enableCloudSave) {
          lastSyncedStateRef.current = serializeChecklistState(
            stateRef.current,
          );
          cloudReadyRef.current = true;
          setCloudStatus("idle");
          setIsBootstrapResolved(true);
          return;
        }

        const response = await fetch("/api/checklist", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stateRef.current),
        });

        if (!response.ok) throw new Error("Failed to create cloud snapshot");
        lastSyncedStateRef.current = serializeChecklistState(stateRef.current);
        cloudReadyRef.current = true;
        setCloudStatus("saved");
        setIsBootstrapResolved(true);
      })
      .catch(() => {
        if (!cancelled) {
          setCloudStatus("error");
          setIsBootstrapResolved(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [enableCloudSave, hasLoadedStorage]);

  useEffect(() => {
    if (
      !enableCloudSave ||
      !hasLoadedStorage ||
      !isLoggedIn ||
      !isBootstrapResolved
    ) {
      return;
    }
    if (!cloudReadyRef.current) return;

    const saveState = async (nextState: ChecklistState): Promise<void> => {
      const serializedState = serializeChecklistState(nextState);
      if (serializedState === lastSyncedStateRef.current) return;

      if (inFlightSaveRef.current) {
        queuedSaveRef.current = nextState;
        return;
      }

      inFlightSaveRef.current = true;
      setCloudStatus("syncing");

      try {
        const response = await fetch("/api/checklist", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: serializedState,
        });

        if (!response.ok) throw new Error("Failed to save checklist state");

        lastSyncedStateRef.current = serializedState;
        setCloudStatus("saved");
      } catch {
        setCloudStatus("error");
      } finally {
        inFlightSaveRef.current = false;

        const queuedState = queuedSaveRef.current;
        if (
          queuedState &&
          serializeChecklistState(queuedState) !== lastSyncedStateRef.current
        ) {
          queuedSaveRef.current = null;
          void saveState(queuedState);
        }
      }
    };

    const timeoutId = window.setTimeout(() => {
      void saveState(state);
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    enableCloudSave,
    hasLoadedStorage,
    isBootstrapResolved,
    isLoggedIn,
    state,
  ]);

  return {
    isLoggedIn,
    isAuthResolved: isBootstrapResolved,
    cloudStatus,
  };
}
