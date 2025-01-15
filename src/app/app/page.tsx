"use client";

import getUserById from "@/actions/user";
import React, { useEffect, useState } from "react";

const ItemList = () => {
  useEffect(() => {
    getUserById().then(console.log);
  }, []);
  // formAction();
  const [items, setItems] = useState([
    { id: 1, name: "Laptop", pieces: 1, deadline: "3 days", plan: "Donate" },
    { id: 2, name: "Books", pieces: 5, deadline: "7 days", plan: "Sell" },
    {
      id: 3,
      name: "Clothes",
      pieces: 10,
      deadline: "15 days",
      plan: "Discard",
    },
  ]);

  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newPieces, setNewPieces] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const addItem = () => {
    if (newItem.trim()) {
      setItems([
        ...items,
        {
          id: items.length + 1,
          name: newItem,
          pieces: newPieces,
          deadline: "30 days",
          plan: "Undecided",
        },
      ]);
      setNewItem("");
      setNewPieces(1);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setUploadedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex justify-center items-center p-6 w-full h-[90vh] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full md:w-full lg:max-w-[70%]">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            placeholder="New item name"
            className="border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-md flex-1 md:max-w-sm mb-4 md:mb-0"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <input
            type="number"
            min="1"
            className="border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-md w-20"
            value={newPieces}
            onChange={(e) => setNewPieces(Number(e.target.value))}
          />
          <button
            onClick={addItem}
            className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
          >
            Add Item
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 mb-2">
            Upload an Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:border-gray-600 dark:file:bg-gray-800 dark:file:text-blue-300"
            onChange={handleImageUpload}
          />
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
        <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 text-left">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                Name
              </th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                Pieces
              </th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                Deadline
              </th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                Future Plan
              </th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">
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
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                  {item.pieces}
                </td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                  {item.deadline}
                </td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                  {item.plan}
                </td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                  <button className="text-blue-500 dark:text-blue-400 hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

export default ItemList;
