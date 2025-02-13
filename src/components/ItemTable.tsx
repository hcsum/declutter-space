"use client";

import { deleteItem, updateItem } from "@/actions/items";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { Pagination } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { formatDistanceToNow } from "date-fns";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const ItemTable = ({
  items,
  totalPages,
  currentPage,
}: {
  items: Prisma.ItemGetPayload<null>[];
  totalPages: number;
  currentPage: number;
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingItem, setEditingItem] =
    useState<Prisma.ItemGetPayload<null> | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [field: string]: string[];
  }>({});
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    router.push(`/dashboard?page=1`);
  };

  const handleSearchSubmit = () => {
    // trigger client side navigation and trigger a revalidation
    router.push(`/dashboard?page=1&search=${searchQuery}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleEditClick = (item: Prisma.ItemGetPayload<null>) => {
    setEditingItem(item);
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

      // Check if any values have changed
      const originalItem = items.find((item) => item.id === itemId);
      if (!originalItem) return;

      const hasChanges =
        originalItem.name !== editingItem.name ||
        originalItem.pieces !== editingItem.pieces ||
        originalItem.deadline.getTime() !== editingItem.deadline.getTime();

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

  const handleDelete = async (itemId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (isConfirmed) {
      try {
        setIsDeleting(itemId);
        await deleteItem(itemId);
        router.refresh();
      } catch (error) {
        console.error("Error deleting item:", error);
      } finally {
        setIsDeleting(null);
      }
    }
  };

  // const calculateNewDeadline = (months: number): Date => {
  //   const date = new Date();
  //   date.setMonth(date.getMonth() + months);
  //   return date;
  // };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    router.push(`/dashboard?page=${page}&search=${searchQuery}`);
  };

  return (
    <div className="mb-6">
      {/* Search Box */}
      <div className="flex items-center mb-4 md:w-[50%]">
        <div className="relative flex-1">
          <TextField
            fullWidth
            placeholder="Search items"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            size="small"
            variant="outlined"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          )}
        </div>
        <button
          onClick={handleSearchSubmit}
          className="ml-2 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          <SearchIcon />
        </button>
      </div>
      <Pagination
        className="my-4"
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 md:p-8 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Item:
                </div>
                {editingItem?.id === item.id ? (
                  <TextField
                    fullWidth
                    value={editingItem?.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={!!validationErrors.name}
                    helperText={validationErrors.name?.join(", ")}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  <div className="text-gray-900 dark:text-gray-100 font-medium">
                    {item.name}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Pieces:
                </div>
                {editingItem?.id === item.id ? (
                  <TextField
                    fullWidth
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
                      disablePast
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
                    {`${formatDistanceToNow(item.deadline, {
                      addSuffix: true,
                    })}`}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Date Added:
                </div>
                <div className="text-gray-900 dark:text-gray-100">
                  {item.createdAt.toLocaleDateString()}
                </div>
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
                      onClick={() => handleDelete(item.id)}
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
                  <button
                    onClick={() => handleEditClick(item)}
                    className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg dark:hover:bg-blue-900"
                  >
                    <EditIcon />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>No items found. Get started by adding an item.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemTable;
