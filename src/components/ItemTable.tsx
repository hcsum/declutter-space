"use client";

import {
  deleteItem,
  ItemUpdateInput,
  updateItem,
  archiveItem,
} from "@/actions/items";
import { Prisma, Category } from "@prisma/client";
import { useEffect, useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { MenuItem, Pagination, Select, Chip, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { formatDistanceToNow } from "date-fns";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ItemSkeleton from "./ItemSkeleton";
import LetGoDialog from "./LetGoDialog";

type Item = Prisma.ItemGetPayload<{
  include: { category: true };
}>;

type EditingItem = ItemUpdateInput & {
  id: string;
};

const ItemTable = ({
  items,
  categories,
  totalPages,
  currentPage,
  category,
  search,
}: {
  items: Item[];
  categories: Category[];
  totalPages: number;
  currentPage: number;
  category: string;
  search: string;
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [field: string]: string[];
  }>({});
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isArchiving, setIsArchiving] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLetGoDialogOpen, setIsLetGoDialogOpen] = useState(false);
  const [page, setPage] = useState(currentPage);

  const queryObject = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    return params;
  }, [searchQuery, selectedCategory, page]);

  useEffect(() => {
    setPage(currentPage);
    setSelectedCategory(category);
    setSearchQuery(search);
  }, [currentPage, category, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    const updatedParams = new URLSearchParams(queryObject);
    updatedParams.set("page", "1");
    updatedParams.delete("search");
    startTransition(() => {
      router.push(`/dashboard?${updatedParams.toString()}`);
    });
  };

  const handleSearchSubmit = () => {
    startTransition(() => {
      const updatedParams = new URLSearchParams(queryObject);
      updatedParams.set("page", "1");
      router.push(`/dashboard?${updatedParams.toString()}`);
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleEditClick = (item: Item) => {
    setEditingItem({
      id: item.id,
      name: item.name,
      pieces: item.pieces,
      deadline: item.deadline,
      categoryId: item.categoryId,
    });
  };

  const handleInputChange = (
    field: "name" | "pieces" | "deadline" | "categoryId",
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
        originalItem.deadline.getTime() !== editingItem.deadline?.getTime() ||
        originalItem.categoryId !== editingItem.categoryId;

      if (!hasChanges) {
        setEditingItem(null);
        setValidationErrors({});
        return;
      }

      const result = await updateItem(itemId, {
        name: editingItem.name,
        pieces: editingItem.pieces,
        deadline: editingItem.deadline,
        categoryId: editingItem.categoryId ?? "",
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
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${editingItem!.name}?`,
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

  const handleCategoryChange = (categoryId: string) => {
    const updatedParams = new URLSearchParams(queryObject);
    if (selectedCategory === categoryId) {
      updatedParams.delete("category");
      setSelectedCategory("");
    } else {
      updatedParams.set("category", categoryId);
      setSelectedCategory(categoryId);
    }

    updatedParams.set("page", "1");
    startTransition(() => {
      router.push(`/dashboard?${updatedParams.toString()}`);
    });
  };

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
    if (
      window.confirm(`Are you sure you want to archive ${editingItem!.name}?`)
    ) {
      setIsLetGoDialogOpen(false);
      setIsArchiving(editingItem!.id);
      await archiveItem(editingItem!.id);
      router.refresh();
      setIsArchiving(null);
    }
  };

  const handleNotYet = () => {
    setIsLetGoDialogOpen(false);
  };

  return (
    <div className="mb-6">
      {/* Category Filter */}
      <div className="flex flex-wrap items-center mb-4 md:w-[50%] gap-2 p-2">
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            clickable
            disabled={isPending}
            color={selectedCategory === category.id ? "primary" : "default"}
            onClick={() => handleCategoryChange(category.id)}
            className="m-1"
          />
        ))}
      </div>
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

                  <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Category:
                    </div>
                    {editingItem?.id === item.id ? (
                      <Select
                        value={editingItem?.categoryId ?? ""}
                        onChange={(e) =>
                          handleInputChange("categoryId", e.target.value ?? "")
                        }
                        size="small"
                        variant="outlined"
                      >
                        <MenuItem value="">None</MenuItem>
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <div className="text-gray-900 dark:text-gray-100">
                        {item.category?.name ?? "-"}
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
