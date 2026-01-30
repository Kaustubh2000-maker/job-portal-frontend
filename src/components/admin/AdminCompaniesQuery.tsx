import React from "react";

interface Filters {
  search: string;
  industry: string;
  location: string;
  isActive: string;
  createdAfter: string;
}

interface Props {
  filters: Filters;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSearch: () => void;
  onDownload: () => void;
}

export default function AdminCompaniesQuery({
  filters,
  onChange,
  onSearch,
  onDownload,
}: Props) {
  return (
    <div className="admin-company-query-container">
      <div className="admin-company-query-grid admin-company-query-grid-5-col">
        <div className="admin-company-query-field">
          <label className="admin-company-query-label">Search</label>
          <input
            name="search"
            value={filters.search}
            onChange={onChange}
            placeholder="Name, location..."
            className="admin-company-query-input"
          />
        </div>

        <div className="admin-company-query-field">
          <label className="admin-company-query-label">Industry</label>
          <input
            name="industry"
            value={filters.industry}
            onChange={onChange}
            className="admin-company-query-input"
          />
        </div>

        <div className="admin-company-query-field">
          <label className="admin-company-query-label">Location</label>
          <input
            name="location"
            value={filters.location}
            onChange={onChange}
            className="admin-company-query-input"
          />
        </div>

        <div className="admin-company-query-field">
          <label className="admin-company-query-label">Status</label>
          <select
            name="isActive"
            value={filters.isActive}
            onChange={onChange}
            className="admin-company-query-select"
          >
            <option value="ALL">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="admin-company-query-field">
          <label className="admin-company-query-label">Created After</label>
          <input
            type="date"
            name="createdAfter"
            value={filters.createdAfter}
            onChange={onChange}
            className="admin-company-query-date"
          />
        </div>
      </div>

      <div className="admin-company-query-actions">
        <button
          type="button"
          className="admin-company-query-btn admin-company-query-btn-search"
          onClick={onSearch}
        >
          Search
        </button>

        <button
          type="button"
          className="admin-company-query-btn admin-company-query-btn-download"
          onClick={onDownload}
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}
