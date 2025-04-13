'use client';

import type { FugitiveRaw, FugitiveStatus } from '@/server/db/types';
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { CircleHelp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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
    cell: ({ cell }) => {
      return (
        <Badge variant="secondary" className="capitalize">
          {cell.getValue() as string}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'dangerLevel',
    header: 'Danger Level',
    cell: ({ cell }) => {
      const value = cell.getValue() as FugitiveRaw['dangerLevel'];

      return (
        <Badge variant={value === 'extreme' || value === 'high' ? 'destructive' : 'secondary'} className="uppercase">
          {cell.getValue() as string}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ cell }) => {
      const value = cell.getValue() as FugitiveStatus;

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
    cell: ({ cell }) => {
      return <span>{relativeDate(cell.getValue() as Date)}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ cell }) => {
      return <span>{relativeDate(cell.getValue() as Date)}</span>;
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
