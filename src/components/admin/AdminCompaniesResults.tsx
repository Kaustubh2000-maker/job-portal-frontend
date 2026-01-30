interface Company {
  _id: string;
  name: string;
  industry?: string;
  location?: string;
  website?: string;
  isActive?: boolean;
  createdAt?: string;
}

interface Props {
  companies: Company[];
  loading: boolean;
}

export default function AdminCompaniesResults({ companies, loading }: Props) {
  return (
    <div className="admin-company-results-container">
      <h4 className="admin-company-results-heading">Filtered Results</h4>

      {loading && <p className="admin-company-results-loading">Loading...</p>}

      {!loading && companies.length === 0 && (
        <p className="admin-company-results-empty">No companies found</p>
      )}

      {!loading && companies.length > 0 && (
        <div className="admin-company-results-table-wrapper">
          <table className="admin-company-results-table">
            <thead className="admin-company-results-thead">
              <tr className="admin-company-results-head-row">
                <th className="admin-company-results-th">Name</th>
                <th className="admin-company-results-th">Industry</th>
                <th className="admin-company-results-th">Location</th>
                <th className="admin-company-results-th">Website</th>
                <th className="admin-company-results-th">Status</th>
                <th className="admin-company-results-th">Created At</th>
              </tr>
            </thead>

            <tbody className="admin-company-results-tbody">
              {companies.map((c) => (
                <tr key={c._id} className="admin-company-results-row">
                  <td className="admin-company-results-td">{c.name || "—"}</td>

                  <td className="admin-company-results-td">
                    {c.industry || "—"}
                  </td>

                  <td className="admin-company-results-td">
                    {c.location || "—"}
                  </td>

                  <td className="admin-company-results-td">
                    {c.website ? (
                      <a href={c.website} target="_blank" rel="noreferrer">
                        {c.website}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="admin-company-results-td">
                    {c.isActive ? "Active" : "Inactive"}
                  </td>

                  <td className="admin-company-results-td">
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
