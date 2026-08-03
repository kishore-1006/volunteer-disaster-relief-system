import React from 'react';
import { Edit2, Trash2, Eye, Inbox } from 'lucide-react';
import Pagination from '../common/Pagination';

const DataTable = ({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  onView,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
  emptyMessage = "No records found matching criteria."
}) => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="table-responsive">
        <table className="table custom-table mb-0 align-middle">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} style={{ width: col.width || 'auto' }}>
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete || onView) && (
                <th className="text-end" style={{ width: '130px' }}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete || onView ? 1 : 0)} className="text-center py-5">
                  <div className="text-muted d-flex flex-column align-items-center">
                    <Inbox size={36} className="mb-2 text-secondary opacity-50" />
                    <p className="mb-0 fw-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id}>
                  {columns.map((col, cIdx) => (
                    <td key={cIdx}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  {(onEdit || onDelete || onView) && (
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-1">
                        {onView && (
                          <button
                            className="btn btn-sm btn-outline-info rounded-circle p-1.5"
                            onClick={() => onView(row)}
                            title="View Details"
                          >
                            <Eye size={15} />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            className="btn btn-sm btn-outline-primary rounded-circle p-1.5"
                            onClick={() => onEdit(row)}
                            title="Edit Record"
                          >
                            <Edit2 size={15} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            className="btn btn-sm btn-outline-danger rounded-circle p-1.5"
                            onClick={() => onDelete(row.id)}
                            title="Delete Record"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default DataTable;
