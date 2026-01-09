"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createItem } from "@/actions/items";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function QuickAddItem() {
  const [name, setName] = useState("");
  const router = useRouter();

  const { mutate, isPending, data } = useMutation({
    mutationFn: createItem,
    onSuccess(res) {
      if (res?.success) {
        setName("");
        router.push("/dashboard?page=1");
      }
    },
  });

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const fd = new FormData();
    fd.set("name", trimmed);
    fd.set("pieces", String(1));
    fd.set("deadline", String(3)); // months
    mutate(fd);
  };

  return (
    <div className="mb-4 sm:mb-6">
      {/* Use the old prompt as a heading above the input for clarity */}
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-8 font-signika">
        {"What's something you're unsure about decluttering?"}
      </h1>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          className="flex-1 text-lg sm:text-xl md:text-2xl px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the item in your mind"
          aria-label="Enter the item in your mind"
        />
        <button
          onClick={submit}
          disabled={isPending}
          className="inline-flex items-center justify-center h-[48px] w-[48px] rounded-md bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-60"
          aria-label="Add"
          title="Add"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      {data?.errors?.name && (
        <p className="mt-2 text-sm text-red-600">{data.errors.name}</p>
      )}
    </div>
  );
}
