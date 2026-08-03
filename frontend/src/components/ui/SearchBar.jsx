import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

const SearchBar = ({
  searchTerm,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions = [],
  placeholder = "Search records...",
  onAddClick,
  addButtonLabel = "Add New"
}) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3 mb-4">
      <div className="d-flex flex-grow-1 gap-2 flex-column flex-sm-row">
        <div className="position-relative flex-grow-1">
          <Search
            size={18}
            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
          />
          <input
            type="text"
            className="form-control rounded-pill ps-5 pe-3 py-2 border-secondary-subtle"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {filterOptions.length > 0 && (
          <div className="d-flex align-items-center gap-2">
            <div className="input-group">
              <span className="input-group-text rounded-start-pill bg-light border-secondary-subtle text-muted">
                <Filter size={16} />
              </span>
              <select
                className="form-select rounded-end-pill border-secondary-subtle py-2 text-secondary"
                value={filterValue}
                onChange={(e) => onFilterChange(e.target.value)}
              >
                <option value="ALL">All Statuses / Categories</option>
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {onAddClick && (
        <button
          className="btn btn-primary rounded-pill px-4 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
          onClick={onAddClick}
        >
          <Plus size={18} />
          <span>{addButtonLabel}</span>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
