'use client';

import { type ColumnDef, type SortingState } from '@tanstack/react-table';
import * as React from 'react';

import { Button } from '@/components/ui/button';

import { DataTable } from './data-table';

// Example data type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    createdAt: '2024-01-16',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: '2024-01-17',
  },
  {
    id: 4,
    name: 'Alice Wilson',
    email: 'alice@example.com',
    role: 'Manager',
    status: 'active',
    createdAt: '2024-01-18',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'User',
    status: 'active',
    createdAt: '2024-01-19',
  },
];

// Column definitions
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <div className="capitalize">{row.getValue('role')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }): React.JSX.Element => {
      const status = row.getValue('status') as string;
      return (
        <div className="flex w-[100px] items-center">
          <div
            className={`h-2 w-2 rounded-full mr-2 ${
              status === 'active' ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
          <span className="capitalize">{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => <div>{row.getValue('createdAt')}</div>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <div className="flex space-x-2">
        <Button size="sm" variant="outline">
          Edit
        </Button>
        <Button size="sm" variant="outline">
          Delete
        </Button>
      </div>
    ),
  },
];

export function DataTableExample(): React.JSX.Element {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Simulate fetching data
  const fetchData = React.useCallback((): void => {
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      // Randomly simulate error (20% chance)
      if (Math.random() < 0.2) {
        setError('Failed to load data. Please try again.');
        setLoading(false);
        return;
      }

      setLoading(false);
    }, 1000);
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData, pagination, sorting]);

  const handleRefetch = (): void => {
    fetchData();
  };

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">DataTable Example</h1>
          <p className="text-muted-foreground">
            Example usage of the DataTable component with loading, error states, and pagination.
          </p>
        </div>

        <div className="flex space-x-2">
          <Button onClick={() => setLoading(true)}>Simulate Loading</Button>
          <Button variant="destructive" onClick={() => setError('Simulated error message')}>
            Simulate Error
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setError(null);
              setLoading(false);
            }}
          >
            Clear States
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={mockUsers}
          error={error}
          loading={loading}
          pagination={pagination}
          sorting={sorting}
          totalItems={mockUsers.length}
          onPaginationChange={setPagination}
          onRefetch={handleRefetch}
          onSortingChange={setSorting}
        />
      </div>
    </div>
  );
}
