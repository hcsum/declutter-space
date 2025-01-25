"use client";

import React, { useState } from "react";
import { bulkAddItemsByImage } from "@/actions/items";
import { DetectedItemChatGPT } from "@/lib/upload-helper-chatgpt";
import AddingItemDialog from "@/components/AddingItemDialog";
import { resizeImageFile } from "@/client-lib/resize-image";
import useSWRMutation from "swr/mutation";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import NextImage from "next/image";
import { MAX_FILE_SIZE_ALLOWED_MB } from "@/lib/definitions";

export default function ImageUploadBox() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedItems, setDetectedItems] = useState<DetectedItemChatGPT[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const { trigger: processImage, isMutating } = useSWRMutation(
    "bulkAddItemsByImage",
    async (url: string, { arg }: { arg: File }) => {
      try {
        const resizedImage = await resizeImageFile(arg);
        if (!resizedImage) return;
        setUploadedImage(resizedImage);

        // Get image dimensions when it's loaded
        const img = new Image();
        img.onload = () => {
          setImageSize({ width: img.width, height: img.height });
        };
        img.src = resizedImage;

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
        imageSize={imageSize}
      />

      <div className="mb-6">
        <label className="text-lg font-medium text-gray-900 dark:text-white group relative flex items-center gap-2">
          Upload image
          <Tooltip
            title={
              <div className="p-2">
                <p className="text-sm font-medium mb-3">
                  For better results, lay your items flat on a surface and take
                  a photo of them. In beta, the object detection is not perfect,
                  we are fine toning it and will roll out asap with the paid
                  version. Stay tuned!
                </p>
                <NextImage
                  src="/example-image-stuff.jpg"
                  alt="Example of automatic item detection"
                  className="mt-2 w-full rounded-lg border-2 border-gray-200 shadow-sm"
                  width={300}
                  height={300}
                />
              </div>
            }
            arrow
            enterTouchDelay={0}
            leaveTouchDelay={1500}
          >
            <InfoIcon className="w-5 h-5 ml-1 cursor-help text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
          </Tooltip>
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
                    PNG, JPG, JPEG (MAX. {MAX_FILE_SIZE_ALLOWED_MB}MB)
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
