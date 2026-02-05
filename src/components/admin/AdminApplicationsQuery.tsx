import React from "react";

interface Filters {
  status: string;
  jobTitle: string;
  companyName: string;
  candidate: string;
  appliedFrom: string;
  appliedTo: string;
}

interface Props {
  filters: Filters;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSearch: () => void;
  onDownload: () => void;
}

export default function AdminApplicationsQuery({
  filters,
  onChange,
  onSearch,
  onDownload,
}: Props) {
  return (
    <div className="admin-application-query-container">
      <div className="admin-application-query-grid admin-application-query-grid-6-col">
        <div className="admin-application-query-field">
          <label className="admin-application-query-label">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={onChange}
            className="admin-application-query-select"
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div className="admin-application-query-field">
          <label className="admin-application-query-label">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={filters.jobTitle}
            onChange={onChange}
            placeholder="e.g. Frontend Developer"
            className="admin-application-query-input"
          />
        </div>

        <div className="admin-application-query-field">
          <label className="admin-application-query-label">Company</label>
          <input
            type="text"
            name="companyName"
            value={filters.companyName}
            onChange={onChange}
            placeholder="e.g. Google"
            className="admin-application-query-input"
          />
        </div>

        <div className="admin-application-query-field">
          <label className="admin-application-query-label">Candidate</label>
          <input
            type="text"
            name="candidate"
            value={filters.candidate}
            onChange={onChange}
            placeholder="Name or email"
            className="admin-application-query-input"
          />
        </div>

        <div className="admin-application-query-field">
          <label className="admin-application-query-label">Applied From</label>
          <input
            type="date"
            name="appliedFrom"
            value={filters.appliedFrom}
            onChange={onChange}
            className="admin-application-query-date"
          />
        </div>

        <div className="admin-application-query-field">
          <label className="admin-application-query-label">Applied To</label>
          <input
            type="date"
            name="appliedTo"
            value={filters.appliedTo}
            onChange={onChange}
            className="admin-application-query-date"
          />
        </div>
      </div>

      <div className="admin-application-query-actions">
        <button
          type="button"
          className="admin-application-query-btn admin-application-query-btn-search"
          onClick={onSearch}
        >
          Search
        </button>

        <button
          type="button"
          className="admin-application-query-btn admin-application-query-btn-download"
          onClick={onDownload}
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}
