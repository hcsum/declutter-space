import { createManyItems, ItemCreateInput } from "@/actions/items";
import { DetectedItem } from "@/lib/upload-helper";
import { ItemPlan } from "@prisma/client";
import { useActionState } from "react";

interface AddingItemDialogProps {
  isOpen: boolean;
  detectedItems: DetectedItem[];
  onConfirm: () => void;
  onCancel: () => void;
}

const AddingItemDialog = ({
  isOpen,
  detectedItems,
  onConfirm,
  onCancel,
}: AddingItemDialogProps) => {
  const [, action, pending] = useActionState(
    (prevState: void, items: ItemCreateInput[]) => createManyItems(items),
    undefined,
  );

  const handleConfirm = () => {
    const confirmedItems = detectedItems.map((item) => ({
      name: item.label,
      pieces: 1,
      deadline: new Date(new Date().setDate(new Date().getDate() + 30)),
      plan: ItemPlan.UNDECIDED,
    }));
    action(confirmedItems);
    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Detected Items</h3>
        <form action={handleConfirm}>
          <div className="space-y-2 mb-6">
            {detectedItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{item.label}</span>
                <span className="text-sm text-gray-500">
                  {(item.score * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className={`px-4 py-2 rounded text-white ${
                pending ? "bg-gray-500 text-gray-200" : "bg-blue-500"
              } hover:bg-blue-600`}
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
