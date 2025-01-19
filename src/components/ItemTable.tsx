"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import Pagination from "./Pagination";
import { Prisma } from "@prisma/client";

const getRelativeTimeString = (deadline: Date) => {
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Past due";
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? "day" : "days"}`;
  const weeks = Math.floor(diffDays / 7);
  if (diffDays < 30) return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  const months = Math.floor(diffDays / 30);
  if (diffDays < 365) return `${months} ${months === 1 ? "month" : "months"}`;
  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? "year" : "years"}`;
};

const ItemTable = ({
  items,
  totalPages,
  currentPage,
}: {
  items: Prisma.ItemGetPayload<null>[];
  totalPages: number;
  currentPage: number;
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <Table aria-label="Items table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Pieces</TableColumn>
            <TableColumn>Deadline</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.pieces}</TableCell>
                <TableCell>{`in ${getRelativeTimeString(item.deadline)}`}</TableCell>
                <TableCell>
                  <button className="text-blue-500 dark:text-blue-400 hover:underline">
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default ItemTable;
