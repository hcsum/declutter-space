"use client";

import React, { useState } from "react";
import { bulkAddItemsByImage } from "@/actions/items";
import { DetectedItem } from "@/lib/upload-helper";
import AddingItemDialog from "@/components/AddingItemDialog";

export default function ImageUploadBox() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const onItemsAdded = async () => {
    setShowConfirmDialog(false);
    setDetectedItems([]);
    setUploadedImage(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        if (typeof reader.result === "string") {
          setUploadedImage(reader.result);
          try {
            const items = await bulkAddItemsByImage(reader.result);
            setDetectedItems(items);
            setShowConfirmDialog(true);
          } catch (error) {
            console.error("Failed to process image:", error);
          }
        }
      };
      reader.readAsDataURL(file);
    }
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
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        if (typeof reader.result === "string") {
          setUploadedImage(reader.result);
          try {
            const items = await bulkAddItemsByImage(reader.result);
            setDetectedItems(items);
            setShowConfirmDialog(true);
          } catch (error) {
            console.error("Failed to process image:", error);
          }
        }
      };
      reader.readAsDataURL(file);
    }
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
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Choose File</span> or drag and
                drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="file_input"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        {uploadedImage && (
          <img
            src={uploadedImage}
            alt="Uploaded Preview"
            className="mt-4 w-32 h-32 object-cover rounded"
          />
        )}
      </div>
    </>
  );
}
