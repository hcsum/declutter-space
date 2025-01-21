"use client";

import React, { useState } from "react";
import { bulkAddItemsByImage } from "@/actions/items";
import { DetectedItem } from "@/lib/upload-helper";
import AddingItemDialog from "@/components/AddingItemDialog";
import { resizeImageFile } from "@/client-lib/resize-image";
import useSWRMutation from "swr/mutation";

export default function ImageUploadBox() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { trigger: processImage, isMutating } = useSWRMutation(
    "bulkAddItemsByImage",
    async (url: string, { arg }: { arg: File }) => {
      try {
        const resizedImage = await resizeImageFile(arg);
        setUploadedImage(resizedImage);
        if (!resizedImage) return;
        const items = await bulkAddItemsByImage(resizedImage);
        if (items) {
          setDetectedItems(items);
          setShowConfirmDialog(true);
        }
      } catch (error) {
        console.error("Failed to process image:", error);
        alert("Failed to process image");
      }
    },
  );

  const onItemsAdded = async (itemTotal: number) => {
    setShowConfirmDialog(false);
    setDetectedItems([]);
    setUploadedImage(null);
    console.log(`${itemTotal} items added`);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processImage(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await processImage(file);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    setDetectedItems([]);
    setUploadedImage(null);
  };

  return (
    <>
      <AddingItemDialog
        isOpen={showConfirmDialog}
        detectedItems={detectedItems}
        uploadedImage={uploadedImage}
        onConfirm={onItemsAdded}
        onCancel={handleCancel}
      />

      <div className="mb-6">
        <label className="text-lg font-medium text-gray-900 dark:text-white">
          Upload file
        </label>
        <div className="mt-2 flex items-center justify-center w-full">
          <label
            htmlFor="file_input"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 
              ${
                isDragging
                  ? "border-blue-500 dark:border-blue-400"
                  : "border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
              } ${isMutating ? "opacity-50 cursor-wait" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isMutating ? (
                <div className="flex flex-col items-center">
                  <p className="mb-2 text-md">Processing image...</p>
                  <div className="w-48 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-blue-500 dark:bg-blue-400 animate-[loading_1.5s_ease-in-out_infinite] translate-x-[-100%]" />
                  </div>
                </div>
              ) : (
                <>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Choose File</span> or drag
                    and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, JPEG (MAX. 10MB)
                  </p>
                </>
              )}
            </div>
            <input
              id="file_input"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isMutating}
            />
          </label>
        </div>
      </div>
    </>
  );
}
