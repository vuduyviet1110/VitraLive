"use client";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import UnblockBtn from "./unblockBtn";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BlockedUser = {
  id: string;
  username: string;
  userId: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<BlockedUser>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="link"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        User Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <div>
            <UserAvatar
              username={row.original.username}
              imageUrl={row.original.imageUrl}
            />
          </div>
          <div>
            <div className="font-bold">{row.original.username}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Blocked",
  },
  {
    id: "actions",
    cell: ({ row }) => <UnblockBtn id={row.original.userId} />,
  },
];
