"use client";

import { Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddItemForm from "./AddItemForm";
import ImageUploadBox from "./ImageUploadBox";
import { Category } from "@prisma/client";

const AddItemPanel = ({
  itemCount,
  categories,
}: {
  itemCount: number;
  categories: Category[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-semibold">Add Items</span>
        <IconButton
          sx={{
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
          className="text-gray-800 dark:text-gray-200"
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <Collapse in={isExpanded}>
        <div className="p-4">
          {/* AI image feature temporarily removed from UI */}
          {/* <ImageUploadBox /> */}
          {/* <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div> */}
          {/* Keep legacy form available if needed in the future */}
          {/* <AddItemForm categories={categories} /> */}
        </div>
      </Collapse>
    </div>
  );
};

export default AddItemPanel;
