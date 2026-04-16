import {
  ChecklistItemSource,
  ChecklistListSource,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  buildEntryKey,
  getAllChecklistCategories,
} from "@/lib/checklist/checklist";
import { ChecklistState, emptyChecklistState } from "@/lib/checklist/state";

function getStartOfDay(dateKey: string) {
  return new Date(`${dateKey}T00:00:00.000Z`);
}

function splitEntryKey(entryKey: string) {
  const [categoryKey, itemKey] = entryKey.split("::");
  return { categoryKey, itemKey };
}

function inferListSource(categoryKey: string) {
  return categoryKey.startsWith("imported-")
    ? ChecklistListSource.IMPORTED
    : ChecklistListSource.PRESET;
}

function inferItemSource(categoryKey: string, itemKey: string) {
  if (itemKey.startsWith("custom-")) return ChecklistItemSource.CUSTOM;
  if (
    categoryKey.startsWith("imported-") ||
    itemKey.startsWith("imported-item-")
  ) {
    return ChecklistItemSource.IMPORTED;
  }

  return ChecklistItemSource.PRESET;
}

function sortImportedLists<T extends { title: string }>(lists: T[]) {
  return [...lists].sort((left, right) =>
    left.title.localeCompare(right.title),
  );
}

export async function loadChecklistState(userId: string) {
  const [lists, completions, preference] = await Promise.all([
    prisma.checklistList.findMany({
      where: { userId },
      include: {
        items: {
          orderBy: [{ createdAt: "asc" }, { text: "asc" }],
        },
      },
      orderBy: [{ createdAt: "asc" }, { title: "asc" }],
    }),
    prisma.checklistCompletion.findMany({
      where: { userId },
      include: { item: true },
      orderBy: [{ completedOn: "asc" }, { createdAt: "asc" }],
    }),
    prisma.checklistPreference.findUnique({ where: { userId } }),
  ]);

  const hasData =
    lists.length > 0 || completions.length > 0 || Boolean(preference);
  if (!hasData) {
    return { hasData: false, state: emptyChecklistState };
  }

  const importedLists = sortImportedLists(
    lists
      .filter(
        (list) => list.isActive && list.source === ChecklistListSource.IMPORTED,
      )
      .map((list) => ({
        id: list.key,
        title: list.title,
        items: list.items
          .filter(
            (item) =>
              item.isActive && item.source === ChecklistItemSource.IMPORTED,
          )
          .map((item) => ({ id: item.itemKey, text: item.text }))
          .sort((left, right) => left.text.localeCompare(right.text)),
      }))
      .filter((list) => list.items.length > 0),
  );

  const customItemsByCategory = Object.fromEntries(
    lists
      .map((list) => {
        const items = list.items
          .filter(
            (item) =>
              item.isActive && item.source === ChecklistItemSource.CUSTOM,
          )
          .map((item) => ({ id: item.itemKey, text: item.text }))
          .sort((left, right) => left.text.localeCompare(right.text));

        if (items.length === 0) return null;
        return [list.key, items];
      })
      .filter(
        (entry): entry is [string, Array<{ id: string; text: string }>] =>
          Array.isArray(entry) && entry.length === 2,
      ),
  );

  const removedItemsByCategory = Object.fromEntries(
    lists
      .map((list) => {
        const itemKeys = list.items
          .filter(
            (item) =>
              !item.isActive && item.source === ChecklistItemSource.PRESET,
          )
          .map((item) => item.itemKey)
          .sort((left, right) => left.localeCompare(right));

        if (itemKeys.length === 0) return null;
        return [list.key, itemKeys];
      })
      .filter(
        (entry): entry is [string, string[]] =>
          Array.isArray(entry) && entry.length === 2,
      ),
  );

  const archivedItemsByEntryKey = Object.fromEntries(
    lists.flatMap((list) =>
      list.items
        .filter((item) => !item.isActive)
        .map(
          (item) =>
            [
              item.entryKey,
              {
                category: list.title,
                text: item.text,
              },
            ] as const,
        ),
    ),
  );

  const historyByDate = completions.reduce<Record<string, string[]>>(
    (history, completion) => {
      const dateKey = completion.completedOn.toISOString().slice(0, 10);
      history[dateKey] = [
        ...(history[dateKey] ?? []),
        completion.item.entryKey,
      ];
      return history;
    },
    {},
  );

  return {
    hasData: true,
    state: {
      customItemsByCategory,
      archivedItemsByEntryKey,
      removedItemsByCategory,
      historyByDate,
      importedLists,
      hasSeenMomentumDialog: preference?.hasSeenMomentumDialog ?? false,
    } satisfies ChecklistState,
  };
}

export async function saveChecklistState(
  userId: string,
  state: ChecklistState,
) {
  const activeCategories = getAllChecklistCategories(state.importedLists);
  const activeListRecords = new Map<
    string,
    { title: string; source: ChecklistListSource; isActive: boolean }
  >();
  const itemRecords = new Map<
    string,
    {
      categoryKey: string;
      itemKey: string;
      text: string;
      source: ChecklistItemSource;
      isActive: boolean;
      archivedAt: Date | null;
    }
  >();

  activeCategories.forEach((category) => {
    const removedPresetItems = new Set(
      state.importedLists.length === 0
        ? (state.removedItemsByCategory[category.key] ?? [])
        : [],
    );

    activeListRecords.set(category.key, {
      title: category.category,
      source:
        category.source === "imported"
          ? ChecklistListSource.IMPORTED
          : ChecklistListSource.PRESET,
      isActive: true,
    });

    category.defaultItems
      .filter((item) => !removedPresetItems.has(item.id))
      .forEach((item) => {
        const entryKey = buildEntryKey(category.key, item.id);
        itemRecords.set(entryKey, {
          categoryKey: category.key,
          itemKey: item.id,
          text: item.text,
          source:
            category.source === "imported"
              ? ChecklistItemSource.IMPORTED
              : ChecklistItemSource.PRESET,
          isActive: true,
          archivedAt: null,
        });
      });
  });

  Object.entries(state.customItemsByCategory).forEach(
    ([categoryKey, items]) => {
      const activeList = activeCategories.find(
        (category) => category.key === categoryKey,
      );
      if (activeList) {
        activeListRecords.set(categoryKey, {
          title: activeList.category,
          source:
            activeList.source === "imported"
              ? ChecklistListSource.IMPORTED
              : ChecklistListSource.PRESET,
          isActive: true,
        });
      }

      items.forEach((item) => {
        itemRecords.set(buildEntryKey(categoryKey, item.id), {
          categoryKey,
          itemKey: item.id,
          text: item.text,
          source: ChecklistItemSource.CUSTOM,
          isActive: true,
          archivedAt: null,
        });
      });
    },
  );

  Object.entries(state.archivedItemsByEntryKey).forEach(
    ([entryKey, details]) => {
      if (itemRecords.has(entryKey)) return;
      const { categoryKey, itemKey } = splitEntryKey(entryKey);
      if (!categoryKey || !itemKey) return;

      activeListRecords.set(categoryKey, {
        title: details.category,
        source: inferListSource(categoryKey),
        isActive: false,
      });
      itemRecords.set(entryKey, {
        categoryKey,
        itemKey,
        text: details.text,
        source: inferItemSource(categoryKey, itemKey),
        isActive: false,
        archivedAt: new Date(),
      });
    },
  );

  const historyEntryKeys = Array.from(
    new Set(Object.values(state.historyByDate).flat()),
  );
  const fallbackCategories = getAllChecklistCategories(state.importedLists);
  const fallbackEntryMap = new Map<
    string,
    { category: string; text: string }
  >();

  fallbackCategories.forEach((category) => {
    category.defaultItems.forEach((item) => {
      fallbackEntryMap.set(buildEntryKey(category.key, item.id), {
        category: category.category,
        text: item.text,
      });
    });

    (state.customItemsByCategory[category.key] ?? []).forEach((item) => {
      fallbackEntryMap.set(buildEntryKey(category.key, item.id), {
        category: category.category,
        text: item.text,
      });
    });
  });

  historyEntryKeys.forEach((entryKey) => {
    if (itemRecords.has(entryKey)) return;
    const fallback = fallbackEntryMap.get(entryKey);
    const { categoryKey, itemKey } = splitEntryKey(entryKey);
    if (!fallback || !categoryKey || !itemKey) return;

    activeListRecords.set(categoryKey, {
      title: fallback.category,
      source: inferListSource(categoryKey),
      isActive: false,
    });
    itemRecords.set(entryKey, {
      categoryKey,
      itemKey,
      text: fallback.text,
      source: inferItemSource(categoryKey, itemKey),
      isActive: false,
      archivedAt: new Date(),
    });
  });

  const listRows = Array.from(activeListRecords.entries()).map(
    ([key, record]) => ({
      id: crypto.randomUUID(),
      userId,
      key,
      title: record.title,
      source: record.source,
      isActive: record.isActive,
    }),
  );
  const listIdByKey = new Map(listRows.map((list) => [list.key, list.id]));

  const itemRows = Array.from(itemRecords.entries())
    .map(([entryKey, record]) => {
      const listId = listIdByKey.get(record.categoryKey);
      if (!listId) return null;

      return {
        id: crypto.randomUUID(),
        userId,
        listId,
        itemKey: record.itemKey,
        entryKey,
        text: record.text,
        source: record.source,
        isActive: record.isActive,
        archivedAt: record.archivedAt,
      } satisfies Prisma.ChecklistItemCreateManyInput;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
  const itemIdByEntryKey = new Map(
    itemRows.map((item) => [item.entryKey, item.id]),
  );

  const completionRows: Prisma.ChecklistCompletionCreateManyInput[] = [];
  Object.entries(state.historyByDate).forEach(([dateKey, entryKeys]) => {
    Array.from(new Set(entryKeys)).forEach((entryKey) => {
      const itemId = itemIdByEntryKey.get(entryKey);
      if (!itemId) return;
      completionRows.push({
        id: crypto.randomUUID(),
        userId,
        itemId,
        completedOn: getStartOfDay(dateKey),
      });
    });
  });

  await prisma.$transaction(async (tx) => {
    await tx.checklistCompletion.deleteMany({ where: { userId } });
    await tx.checklistItem.deleteMany({ where: { userId } });
    await tx.checklistList.deleteMany({ where: { userId } });

    if (listRows.length > 0) {
      await tx.checklistList.createMany({ data: listRows });
    }

    if (itemRows.length > 0) {
      await tx.checklistItem.createMany({ data: itemRows });
    }

    if (completionRows.length > 0) {
      await tx.checklistCompletion.createMany({ data: completionRows });
    }

    await tx.checklistPreference.upsert({
      where: { userId },
      update: {
        hasSeenMomentumDialog: state.hasSeenMomentumDialog,
      },
      create: {
        userId,
        hasSeenMomentumDialog: state.hasSeenMomentumDialog,
      },
    });
  });
}
