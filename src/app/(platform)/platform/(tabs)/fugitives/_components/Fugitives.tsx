'use client';

import Link from 'next/link';

import type { FugitiveRaw } from '@/server/db/types';
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { CircleHelp, MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { getFugitiveStatusDescription, relativeDate } from '@/lib/utils';

export const columns: ColumnDef<FugitiveRaw>[] = [
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => {
      return (
        <Badge variant="secondary" className="capitalize">
          {row.original.gender}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'dangerLevel',
    header: 'Danger Level',
    cell: ({ row }) => {
      const value = row.original.dangerLevel;

      return (
        <Badge variant={value === 'extreme' || value === 'high' ? 'destructive' : 'secondary'} className="uppercase">
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const value = row.original.status;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className="cursor-default uppercase">
                {value}
                <CircleHelp />
              </Badge>
            </TooltipTrigger>
            <TooltipContent>{getFugitiveStatusDescription(value)}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'identifyNumber',
    header: 'ID Number',
  },
  {
    accessorKey: 'nationality',
    header: 'Nationality',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => {
      return <span>{relativeDate(row.original.updatedAt)}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      return <span>{relativeDate(row.original.createdAt)}</span>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const fugitiveId = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="left">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/platform/fugitives/${fugitiveId}`} className="cursor-pointer">
                View profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/platform/fugitives/${fugitiveId}/edit`} className="cursor-pointer">
                Edit details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Fugitives: React.FC<{ fugitives: FugitiveRaw[] }> = ({ fugitives }) => {
  const table = useReactTable({
    data: fugitives,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Fugitives;
