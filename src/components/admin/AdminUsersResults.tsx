interface JobSeeker {
  _id: string;
  gender?: string;
  status?: string;
  createdAt?: string;
  skills?: string[];
  user?: {
    name?: string;
    email?: string;
    mobile?: string;
  } | null;
}

interface Props {
  users: JobSeeker[];
  loading: boolean;
}

export default function AdminUsersResults({ users, loading }: Props) {
  return (
    <div className="admin-user-results-container">
      <h4 className="admin-user-results-heading">Filtered Results</h4>

      {loading && <p className="admin-user-results-loading">Loading...</p>}

      {!loading && users.length === 0 && (
        <p className="admin-user-results-empty">No users found</p>
      )}

      {!loading && users.length > 0 && (
        <div className="admin-user-results-table-wrapper">
          <table className="admin-user-results-table">
            <thead className="admin-user-results-thead">
              <tr className="admin-user-results-head-row">
                <th className="admin-user-results-th">Name</th>
                <th className="admin-user-results-th">Email</th>
                <th className="admin-user-results-th">Mobile</th>
                <th className="admin-user-results-th">Gender</th>
                <th className="admin-user-results-th">Status</th>
                <th className="admin-user-results-th">Skills</th>
                <th className="admin-user-results-th">Created At</th>
              </tr>
            </thead>

            <tbody className="admin-user-results-tbody">
              {users.map((u) => (
                <tr key={u._id} className="admin-user-results-row">
                  <td className="admin-user-results-td">
                    {u.user?.name || "—"}
                  </td>
                  <td className="admin-user-results-td">
                    {u.user?.email || "—"}
                  </td>
                  <td className="admin-user-results-td">
                    {u.user?.mobile || "—"}
                  </td>
                  <td className="admin-user-results-td">{u.gender || "—"}</td>
                  <td className="admin-user-results-td">{u.status || "—"}</td>
                  <td className="admin-user-results-td">
                    {u.skills && u.skills.length > 0
                      ? u.skills.join(", ")
                      : "—"}
                  </td>
                  <td className="admin-user-results-td">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
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
