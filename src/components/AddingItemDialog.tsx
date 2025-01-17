import { ItemCreateInput } from "@/actions/items";
import { DetectedItem } from "@/lib/upload-helper";
import { ItemPlan } from "@prisma/client";

interface AddingItemDialogProps {
  isOpen: boolean;
  detectedItems: DetectedItem[];
  onConfirm: (confirmedItems: ItemCreateInput[]) => void;
  onCancel: () => void;
}

const AddingItemDialog = ({
  isOpen,
  detectedItems,
  onConfirm,
  onCancel,
}: AddingItemDialogProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    const confirmedItems = detectedItems.map((item) => ({
      name: item.label,
      pieces: 1,
      deadline: new Date(new Date().setDate(new Date().getDate() + 30)),
      plan: ItemPlan.UNDECIDED,
    }));
    onConfirm(confirmedItems);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Detected Items</h3>
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
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddingItemDialog;
