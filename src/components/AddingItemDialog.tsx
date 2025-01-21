import { createManyItems, ItemCreateInput } from "@/actions/items";
import { DetectedItem } from "@/lib/upload-helper";
import { ItemPlan } from "@prisma/client";
import { useActionState } from "react";
import { useState, useEffect } from "react";

interface AddingItemDialogProps {
  isOpen: boolean;
  detectedItems: DetectedItem[];
  uploadedImage: string | null;
  onConfirm: (itemTotal: number) => void;
  onCancel: () => void;
}

interface DetectedItemWithChecked extends DetectedItem {
  checked: boolean;
  pieces: number;
}

const AddingItemDialog = ({
  isOpen,
  detectedItems,
  uploadedImage,
  onConfirm,
  onCancel,
}: AddingItemDialogProps) => {
  const [editableItems, setEditableItems] = useState<DetectedItemWithChecked[]>(
    [],
  );

  useEffect(() => {
    if (detectedItems.length > 0) {
      setEditableItems(
        detectedItems.map((item) => ({ ...item, checked: true, pieces: 1 })),
      );
    }
  }, [detectedItems]);

  const [, action, pending] = useActionState(
    (prevState: { errors?: string } | undefined, items: ItemCreateInput[]) =>
      createManyItems(items),
    undefined,
  );

  const handleConfirm = () => {
    const confirmedItems = editableItems
      .filter((item) => item.checked)
      .map((item) => ({
        name: item.label,
        pieces: item.pieces,
        deadline: new Date(new Date().setDate(new Date().getDate() + 30)),
        plan: ItemPlan.UNDECIDED,
      }));
    action(confirmedItems);
    onConfirm(confirmedItems.length);
  };

  const handleLabelChange = (index: number, newLabel: string) => {
    setEditableItems((items) =>
      items.map((item, i) =>
        i === index ? { ...item, label: newLabel } : item,
      ),
    );
  };

  const handlePiecesChange = (index: number, pieces: number) => {
    setEditableItems((items) =>
      items.map((item, i) =>
        i === index ? { ...item, pieces: Math.max(1, pieces) } : item,
      ),
    );
  };

  const handleCheckChange = (index: number, checked: boolean) => {
    setEditableItems((items) =>
      items.map((item, i) => (i === index ? { ...item, checked } : item)),
    );
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = ""; // Allow scrolling again
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 md:p-4 z-10">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full h-full md:h-auto md:max-w-md md:w-full flex flex-col md:rounded-lg">
        {uploadedImage && (
          <img
            src={uploadedImage}
            alt="Uploaded Preview"
            className="mt-4 w-32 h-32 object-cover rounded"
          />
        )}
        <h3 className="text-lg font-semibold mb-4">Detected Items</h3>
        <form action={handleConfirm} className="flex flex-col h-full">
          <div className="space-y-2 mb-6 overflow-y-auto flex-grow max-h-[60vh] md:max-h-80 overflow-y-scroll">
            {editableItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => handleCheckChange(index, !item.checked)}
                  className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    item.checked ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {item.checked ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleLabelChange(index, e.target.value)}
                  className="flex-1 px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="number"
                  value={item.pieces ?? 1}
                  onChange={(e) =>
                    handlePiecesChange(index, parseInt(e.target.value) || 1)
                  }
                  min="1"
                  className="w-20 px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {(item.score * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={pending}
              className={`px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
                pending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className={`px-4 py-2 rounded text-white hover:bg-blue-600 ${
                pending
                  ? "bg-gray-500 text-gray-200 hover:bg-gray-500"
                  : "bg-blue-500"
              }`}
            >
              {pending ? "Adding..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddingItemDialog;
