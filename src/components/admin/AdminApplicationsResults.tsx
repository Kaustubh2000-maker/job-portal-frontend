export default function AdminApplicationsResults({
  applications,
  loading,
}: any) {
  return (
    <div className="admin-application-results-container">
      <h4 className="admin-application-results-heading">Filtered Results</h4>

      {loading && (
        <p className="admin-application-results-loading">Loading...</p>
      )}

      {!loading && applications.length === 0 && (
        <p className="admin-application-results-empty">No applications found</p>
      )}

      {!loading && applications.length > 0 && (
        <div className="admin-application-results-table-wrapper">
          <table className="admin-application-results-table">
            <thead className="admin-application-results-thead">
              <tr className="admin-application-results-head-row">
                <th className="admin-application-results-th">Name</th>
                <th className="admin-application-results-th">Email</th>
                <th className="admin-application-results-th">Job</th>
                <th className="admin-application-results-th">Company</th>
                <th className="admin-application-results-th">Status</th>
                <th className="admin-application-results-th">Applied At</th>
              </tr>
            </thead>

            <tbody className="admin-application-results-tbody">
              {applications.map((a: any) => (
                <tr key={a._id} className="admin-application-results-row">
                  <td className="admin-application-results-td">
                    {a.profileSnapshot?.name || "—"}
                  </td>

                  <td className="admin-application-results-td">
                    {a.profileSnapshot?.email || "—"}
                  </td>

                  <td className="admin-application-results-td">
                    {a.job?.title || "—"}
                  </td>

                  <td className="admin-application-results-td">
                    {a.job?.company?.name || "—"}
                  </td>

                  <td className="admin-application-results-td">{a.status}</td>

                  <td className="admin-application-results-td">
                    {a.createdAt
                      ? new Date(a.createdAt).toLocaleDateString()
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
