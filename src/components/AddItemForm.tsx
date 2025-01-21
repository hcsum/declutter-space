"use client";

import { createItem } from "@/actions/items";
import { useActionState } from "react";

const AddItemForm = () => {
  const [state, action, pending] = useActionState(createItem, undefined);

  return (
    <form action={action} className="mb-6 space-y-4">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Item Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-md"
          />
          {state?.errors?.name && (
            <p className="text-sm text-red-500">{state.errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="pieces" className="block text-sm font-medium mb-1">
            Pieces
          </label>
          <input
            type="number"
            id="pieces"
            name="pieces"
            min="1"
            defaultValue="1"
            step="1"
            required
            className="w-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-md [&::-webkit-inner-spin-button]:opacity-100 [&::-webkit-outer-spin-button]:opacity-100"
          />
          {state?.errors?.pieces && (
            <p className="text-sm text-red-500">{state.errors.pieces}</p>
          )}
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium mb-1">
            Deadline
          </label>
          <select
            id="deadline"
            name="deadline"
            required
            className="w-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 rounded-md"
          >
            <option value="1">1 month</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="9">9 months</option>
            <option value="12">1 year</option>
            <option value="18">1.5 years</option>
            <option value="24">2 years</option>
          </select>
          {state?.errors?.deadline && (
            <p className="text-sm text-red-500">{state.errors.deadline}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 mb-1 rounded-md ${
              pending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={pending}
            aria-disabled={pending}
          >
            {pending ? "Adding..." : "Add Item"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddItemForm;
