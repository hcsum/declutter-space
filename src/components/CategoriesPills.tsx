"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createCategory, deleteCategory } from "@/actions/category";

type CategoryLite = { id: string; name: string };

export default function CategoriesPills({ categories }: { categories: CategoryLite[] }) {
  const router = useRouter();
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");
  const [errmsg, setErrmsg] = useState<string | null>(null);

  const addMutation = useMutation({
    mutationFn: async (catName: string) => {
      const fd = new FormData();
      fd.set("name", catName);
      return createCategory(undefined, fd);
    },
    onSuccess: (res) => {
      if (res?.errors?.name?.length) {
        setErrmsg(res.errors.name.join(", "));
        return;
      }
      setName("");
      setShowInput(false);
      setErrmsg(null);
      router.refresh();
    },
  });

  const delMutation = useMutation({
    mutationFn: async (id: string) => deleteCategory(id),
    onSuccess: (res: { errors?: { name?: string[] } } | undefined) => {
      if (res?.errors?.name?.length) {
        setErrmsg(res.errors.name.join(", "));
        return;
      }
      router.refresh();
    },
  });

  const onAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    addMutation.mutate(trimmed);
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-2 items-center">
        {categories.map((c) => (
          <span
            key={c.id}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm hover:border-gray-400 dark:hover:border-gray-500"
            title={c.name}
          >
            <span className="capitalize">{c.name}</span>
            <button
              onClick={() => delMutation.mutate(c.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-5 h-5 inline-flex items-center justify-center text-gray-500 hover:text-red-600"
              aria-label={`Remove ${c.name}`}
              title="Remove"
            >
              ×
            </button>
          </span>
        ))}

        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            className="px-3 py-1.5 rounded-full border border-dashed border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 text-sm"
          >
            + Add category
          </button>
        ) : (
          <div className="inline-flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onAdd();
                if (e.key === "Escape") { setShowInput(false); setName(""); setErrmsg(null); }
              }}
              placeholder="New category"
              className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={onAdd}
              className="px-3 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm"
            >
              Add
            </button>
            <button
              onClick={() => { setShowInput(false); setName(""); setErrmsg(null); }}
              className="px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {errmsg && (
        <p className="mt-2 text-sm text-red-600">{errmsg}</p>
      )}
    </div>
  );
}
