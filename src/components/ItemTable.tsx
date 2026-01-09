"use client";

import { deleteItem, updateItem, archiveItem } from "@/actions/items";
import { Prisma } from "@prisma/client";
import { useEffect, useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { Pagination, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { formatDistanceToNow } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ItemSkeleton from "./ItemSkeleton";
import LetGoDialog from "./LetGoDialog";
import { useDialogState } from "./DialogProvider";

type Item = Prisma.ItemGetPayload<{}>;

// Local editing shape without category handling
type EditingItem = {
  id: string;
  name: string | null;
  pieces: number | null;
  deadline: Date | null;
};

const ItemTable = ({
  items,
  totalPages,
  currentPage,
  search,
}: {
  items: Item[];
  totalPages: number;
  currentPage: number;
  search: string;
}) => {
  const router = useRouter();
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [field: string]: string[];
  }>({});
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isArchiving, setIsArchiving] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  // Category feature removed
  const [isLetGoDialogOpen, setIsLetGoDialogOpen] = useState(false);
  const [page, setPage] = useState(currentPage);
  const { setDialogContent } = useDialogState();

  const queryObject = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (search) params.set("search", search);
    return params;
  }, [search, page]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  // Search UI removed

  const handleEditClick = (item: Item) => {
    setEditingItem({
      id: item.id,
      name: item.name,
      pieces: item.pieces,
      deadline: item.deadline,
    });
  };

  const handleInputChange = (
    field: "name" | "pieces" | "deadline",
    value: string | number | Date,
  ) => {
    setEditingItem((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleSaveClick = async (itemId: string) => {
    try {
      if (!editingItem) return;
      setIsUpdating(itemId);
      console.log("editingItem", editingItem);

      const originalItem = items.find((item) => item.id === itemId);
      if (!originalItem) return;

      const hasChanges =
        originalItem.name !== editingItem.name ||
        originalItem.pieces !== editingItem.pieces ||
        originalItem.deadline.getTime() !== editingItem.deadline?.getTime();

      if (!hasChanges) {
        setEditingItem(null);
        setValidationErrors({});
        return;
      }

      const result = await updateItem(itemId, {
        name: editingItem.name,
        pieces: editingItem.pieces,
        deadline: editingItem.deadline,
      });

      console.log("result", result);

      if (result?.errors) {
        setValidationErrors(result.errors);
        return;
      }

      setEditingItem(null);
      setValidationErrors({});
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async () => {
    setIsLetGoDialogOpen(false);
    const itemId = editingItem!.id;

    setDialogContent({
      title: "Confirm Deletion",
      content: `Are you sure you want to delete ${editingItem!.name}?`,
      onConfirm: async () => {
        try {
          setIsDeleting(itemId);
          await deleteItem(itemId);
          router.refresh();
        } catch (error) {
          console.error("Error deleting item:", error);
        } finally {
          setIsDeleting(null);
        }
      },
    });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setPage(page);
    const updatedParams = new URLSearchParams(queryObject);
    updatedParams.set("page", page.toString());
    startTransition(() => {
      router.push(`/dashboard?${updatedParams.toString()}`);
    });
  };

  // Category handling removed

  const handleLetGo = (item: Item) => {
    setEditingItem(item);
    setIsLetGoDialogOpen(true);
  };

  const isExpiringSoon = (deadline: Date) => {
    const now = new Date();
    const oneWeekFromNow = new Date(now);
    oneWeekFromNow.setDate(now.getDate() + 7);
    return deadline <= oneWeekFromNow && deadline >= now;
  };

  const isExpired = (deadline: Date) => {
    const now = new Date();
    return deadline < now;
  };

  const handleLetGoClose = () => {
    setIsLetGoDialogOpen(false);
    setEditingItem(null);
  };

  const handleArchive = async () => {
    setDialogContent({
      title: "Confirm Archiving",
      content: `Are you sure you want to archive ${editingItem!.name}?`,
      onConfirm: async () => {
        setIsLetGoDialogOpen(false);
        setIsArchiving(editingItem!.id);
        await archiveItem(editingItem!.id);
        router.refresh();
        setIsArchiving(null);
      },
    });
  };

  const handleNotYet = () => {
    setIsLetGoDialogOpen(false);
  };

  return (
    <div className="mb-6">
      {/* Search removed */}
      <Pagination
        className="my-4"
        count={totalPages}
        page={page}
        onChange={handlePageChange}
      />
      {isPending ? (
        <ItemSkeleton />
      ) : (
        <div className="space-y-4 mb-6">
          {items.map((item) => {
            const expiringSoon = isExpiringSoon(item.deadline);
            const expired = isExpired(item.deadline);
            return (
              <div
                key={item.id}
                className={`p-4 md:p-8 border rounded-lg transition-colors ${
                  isUpdating === item.id ||
                  isDeleting === item.id ||
                  isArchiving === item.id
                    ? "fade-animation"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                } ${
                  expired
                    ? "border-red-500 bg-red-100 dark:border-red-400 dark:bg-gray-900 opacity-75"
                    : expiringSoon
                      ? "border-orange-500 bg-orange-100 dark:border-orange-400 dark:bg-gray-900 opacity-75"
                      : "dark:border-gray-700"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-[1.5]">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Item:
                    </div>
                    {editingItem?.id === item.id ? (
                      <TextField
                        fullWidth
                        value={editingItem?.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        error={!!validationErrors.name}
                        helperText={validationErrors.name?.join(", ")}
                        size="small"
                        variant="outlined"
                      />
                    ) : (
                      <h3 className="text-gray-900 dark:text-gray-100 max-w-[200px] break-words">
                        {item.name}
                      </h3>
                    )}
                  </div>

                  <div className="flex-[0.5]">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Pieces:
                    </div>
                    {editingItem?.id === item.id ? (
                      <TextField
                        type="number"
                        value={editingItem?.pieces}
                        onChange={(e) =>
                          handleInputChange("pieces", parseInt(e.target.value))
                        }
                        error={!!validationErrors.pieces}
                        helperText={validationErrors.pieces?.join(", ")}
                        size="small"
                        variant="outlined"
                      />
                    ) : (
                      <div className="text-gray-900 dark:text-gray-100">
                        {item.pieces}
                      </div>
                    )}
                  </div>

                  {/* Category field removed from item UI */}

                  <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Deadline:
                    </div>
                    {editingItem?.id === item.id ? (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={editingItem.deadline}
                          onChange={(newValue) => {
                            if (newValue) {
                              handleInputChange("deadline", newValue);
                            }
                          }}
                          shouldDisableDate={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date <= today;
                          }}
                          format="MM/dd/yyyy"
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              error: !!validationErrors.deadline,
                              helperText: validationErrors.deadline?.join(", "),
                            },
                          }}
                        />
                      </LocalizationProvider>
                    ) : (
                      <div className="text-gray-900 dark:text-gray-100">
                        {expired ? "Expired " : ""}
                        {`${formatDistanceToNow(item.deadline, {
                          addSuffix: true,
                        })}`}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {editingItem?.id === item.id ? (
                      <>
                        <button
                          onClick={() => handleSaveClick(item.id)}
                          disabled={
                            isUpdating === item.id || isDeleting === item.id
                          }
                          className="p-2 text-green-500 hover:bg-green-100 rounded-lg dark:hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isUpdating === item.id ? (
                            <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <SaveIcon />
                          )}
                        </button>
                        <button
                          onClick={handleDelete}
                          disabled={
                            isUpdating === item.id || isDeleting === item.id
                          }
                          className="p-2 text-red-500 hover:bg-red-100 rounded-lg dark:hover:bg-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isDeleting === item.id ? (
                            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <DeleteIcon />
                          )}
                        </button>
                      </>
                    ) : (
                      <>
                        {expired ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleLetGo(item)}
                          >
                            Ready to let go?
                          </Button>
                        ) : (
                          <button
                            onClick={() => handleEditClick(item)}
                            className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg dark:hover:bg-blue-900"
                          >
                            <EditIcon />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {items.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p>No items found. Add an item or change the filters.</p>
            </div>
          )}
        </div>
      )}
      <LetGoDialog
        open={isLetGoDialogOpen}
        onClose={handleLetGoClose}
        onArchive={handleArchive}
        onDelete={handleDelete}
        onNotYet={handleNotYet}
      />
    </div>
  );
};

export default ItemTable;
