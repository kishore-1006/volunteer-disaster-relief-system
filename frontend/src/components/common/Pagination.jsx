import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 pt-3 px-3">
      <div className="text-muted small">
        Showing <span className="fw-semibold text-dark">{startItem}</span> to{' '}
        <span className="fw-semibold text-dark">{endItem}</span> of{' '}
        <span className="fw-semibold text-dark">{totalItems}</span> entries
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination pagination-sm m-0">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link d-flex align-items-center"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
          </li>
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <li
                key={pageNum}
                className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => onPageChange(pageNum)}>
                  {pageNum}
                </button>
              </li>
            );
          })}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link d-flex align-items-center"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
