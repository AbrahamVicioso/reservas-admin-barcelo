import React from 'react';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
}

export function Table<T extends Record<string, any>>({ data, columns, onRowClick }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50/50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-xs font-normal text-textColor-light uppercase tracking-wide"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-50">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-16 text-center text-textColor-light font-light"
              >
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(item)}
                className={onRowClick ? 'hover:bg-gray-50/50 cursor-pointer transition-all duration-150' : ''}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-textColor-secondary font-light">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
