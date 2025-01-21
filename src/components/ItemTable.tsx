"use client";

import { FaSearch, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { deleteItem, updateItem } from "@/actions/items";
import Pagination from "./Pagination";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const getRelativeTimeString = (deadline: Date) => {
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Past due";
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? "day" : "days"}`;
  const weeks = Math.floor(diffDays / 7);
  if (diffDays < 30) return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  const months = Math.floor(diffDays / 30);
  if (diffDays < 365) return `${months} ${months === 1 ? "month" : "months"}`;
  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? "year" : "years"}`;
};

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<{
    [key: string]: { name: string; pieces: number; deadline: Date };
  }>({});

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
    setEditingId(item.id);
    setEditedValues({
      [item.id]: {
        name: item.name,
        pieces: item.pieces,
        deadline: item.deadline,
      },
    });
  };

  const handleInputChange = (
    itemId: string,
    field: "name" | "pieces" | "deadline",
    value: string | number | Date,
  ) => {
    setEditedValues((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));
  };

  const handleSaveClick = async (itemId: string) => {
    try {
      const editedItem = editedValues[itemId];
      if (!editedItem) return;

      await updateItem(itemId, {
        name: editedItem.name,
        pieces: editedItem.pieces,
        deadline: editedItem.deadline,
      });

      setEditingId(null);
      setEditedValues({});
    } catch (error) {
      console.error("Error updating item:", error);
      // Optionally add error handling UI here
    }
  };

  const handleDelete = async (itemId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (isConfirmed) {
      try {
        await deleteItem(itemId);
        setEditingId(null);
        router.refresh();
      } catch (error) {
        console.error("Error deleting item:", error);
        // Optionally add error handling UI here
      }
    }
  };

  const calculateNewDeadline = (months: number): Date => {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date;
  };

  return (
    <>
      {/* Search Box */}
      <div className="flex items-center mb-4 md:w-[50%]">
        <input
          type="text"
          placeholder="Search items"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          className="border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-md flex-1"
        />
        <button
          onClick={handleSearchSubmit}
          className="ml-2 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          <FaSearch />
        </button>
      </div>

      <div className="space-y-4">
        {/* List container with gap */}
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Item:
                </div>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editedValues[item.id]?.name || item.name}
                    onChange={(e) =>
                      handleInputChange(item.id, "name", e.target.value)
                    }
                    className="border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg w-full"
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
                {editingId === item.id ? (
                  <input
                    type="number"
                    value={editedValues[item.id]?.pieces || item.pieces}
                    onChange={(e) =>
                      handleInputChange(
                        item.id,
                        "pieces",
                        parseInt(e.target.value),
                      )
                    }
                    className="border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg w-full"
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
                {editingId === item.id ? (
                  <select
                    value={
                      Math.round(
                        (editedValues[item.id]?.deadline?.getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24 * 30),
                      ) || 1
                    }
                    onChange={(e) => {
                      const months = parseInt(e.target.value);
                      const newDeadline = calculateNewDeadline(months);
                      handleInputChange(item.id, "deadline", newDeadline);
                    }}
                    className="border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg w-full"
                  >
                    <option value="1">1 month</option>
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                    <option value="9">9 months</option>
                    <option value="12">1 year</option>
                    <option value="18">1 and a half year</option>
                    <option value="24">2 years</option>
                  </select>
                ) : (
                  <div className="text-gray-900 dark:text-gray-100">
                    {`in ${getRelativeTimeString(item.deadline)}`}
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
                {editingId === item.id ? (
                  <>
                    <button
                      onClick={() => handleSaveClick(item.id)}
                      className="p-2 text-green-500 hover:bg-green-100 rounded-lg dark:hover:bg-green-900"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-lg dark:hover:bg-red-900"
                    >
                      <FaTrash />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditClick(item)}
                    className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg dark:hover:bg-blue-900"
                  >
                    <FaEdit />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default ItemTable;
