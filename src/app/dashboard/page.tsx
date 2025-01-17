"use client";

import {
  getItems,
  createManyItems,
  bulkAddItemsByImage,
  ItemCreateInput,
} from "@/actions/items";
import AddingItemDialog from "@/components/AddingItemDialog";
import { DetectedItem } from "@/lib/upload-helper";
import React, { useState } from "react";
import useSWR from "swr";

const Dashboard = () => {
  const { data: items, error, mutate } = useSWR("items", getItems);

  console.log("data", items);
  console.log("error", error);

  const [search, setSearch] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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

  const handleConfirmItems = async (confirmedItems: ItemCreateInput[]) => {
    if (confirmedItems) {
      // Here you would add logic to create the items in your database
      console.log("Items confirmed:", confirmedItems);
      await createManyItems(confirmedItems);
      await mutate(); // Refresh the items list
    }
    setShowConfirmDialog(false);
    setDetectedItems([]);
    setUploadedImage(null);
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
            await bulkAddItemsByImage(reader.result);
            // Refresh the items list after processing
            await mutate();
          } catch (error) {
            console.error("Failed to process image:", error);
            // You might want to add error handling UI here
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredItems =
    items?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <div className="flex justify-center p-6 w-full min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <AddingItemDialog
        isOpen={showConfirmDialog}
        detectedItems={detectedItems}
        onConfirm={handleConfirmItems}
        onCancel={() => setShowConfirmDialog(false)}
      />
      <div className="w-full md:w-full lg:max-w-[70%] mt-4 md:mt-8">
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Image Upload */}
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

        <div className="flex justify-between items-center mb-6 mt-12">
          <h2 className="text-2xl font-bold">Your Items</h2>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search items"
            className="border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-md flex-1 md:max-w-lg mb-4 md:mb-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 text-left text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                  Name
                </th>
                <th className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4 whitespace-nowrap">
                  Pieces
                </th>
                <th className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4 whitespace-nowrap">
                  Deadline
                </th>
                <th className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4 whitespace-nowrap">
                  Future Plan
                </th>
                <th className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                    {item.name}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                    {item.pieces}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                    {item.deadline.toLocaleDateString()}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                    {item.plan}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                    <button className="text-blue-500 dark:text-blue-400 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center items-center">
          <a
            href="#"
            className="flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
          >
            Previous
          </a>
          <a
            href="#"
            className="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          >
            1
          </a>
          <a
            href="#"
            className="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          >
            Next
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
