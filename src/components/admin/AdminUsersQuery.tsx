import React from "react";

interface Filters {
  gender: string;
  education: string;
  status: string;
  skill: string;
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

export default function AdminUsersQuery({
  filters,
  onChange,
  onSearch,
  onDownload,
}: Props) {
  return (
    <div className="admin-user-query-container">
      <div className="admin-user-query-grid admin-user-query-grid-5-col">
        <div className="admin-user-query-field">
          <label className="admin-user-query-label">Gender</label>
          <select
            name="gender"
            value={filters.gender}
            onChange={onChange}
            className="admin-user-query-select"
          >
            <option value="ALL">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="admin-user-query-field">
          <label className="admin-user-query-label">Education</label>
          <select
            name="education"
            value={filters.education}
            onChange={onChange}
            className="admin-user-query-select"
          >
            <option value="ALL">All</option>
            <option value="BACHELORS">Bachelors</option>
            <option value="MASTERS">Masters</option>
            <option value="PHD">PhD</option>
          </select>
        </div>

        <div className="admin-user-query-field">
          <label className="admin-user-query-label">Skill</label>
          <input
            name="skill"
            placeholder="e.g. react, node"
            value={filters.skill}
            onChange={onChange}
            className="admin-user-query-input"
          />
        </div>

        <div className="admin-user-query-field">
          <label className="admin-user-query-label">Work Experience</label>
          <select
            name="status"
            value={filters.status}
            onChange={onChange}
            className="admin-user-query-select"
          >
            <option value="ALL">All</option>
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </select>
        </div>

        <div className="admin-user-query-field">
          <label className="admin-user-query-label">Created After</label>
          <input
            type="date"
            name="createdAfter"
            value={filters.createdAfter}
            onChange={onChange}
            className="admin-user-query-date"
          />
        </div>
      </div>

      <div className="admin-user-query-actions">
        <button
          type="button"
          className="admin-user-query-btn admin-user-query-btn-search"
          onClick={onSearch}
        >
          Search
        </button>

        <button
          type="button"
          className="admin-user-query-btn admin-user-query-btn-download"
          onClick={onDownload}
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}
