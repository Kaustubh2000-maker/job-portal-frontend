import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../auth/useAuth";
import { companyUserService } from "../../services/companyuser.service";

interface CompanyUser {
  _id: string;
  user: {
    name: string;
    email: string;
    mobile?: string;
  };
  role: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function CompanyUsersSection() {
  const { company, user } = useAuth();
  const [users, setUsers] = useState<CompanyUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (company?._id) {
      fetchPendingUsers();
    }
  }, [company?._id]);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const res = await companyUserService.getPendingCompanyUsers(company!._id);
      setUsers(res.data.companyUsers);
    } catch {
      toast.error("Failed to load company users");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    companyUserId: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      await companyUserService.approveOrRejectUser(companyUserId, {
        status,
        actionBy: user!._id,
      });

      toast.success(`User ${status.toLowerCase()} successfully`);
      fetchPendingUsers(); // refresh list
    } catch (error: any) {
      toast.error(error?.message || "Failed to update status");
    }
  };

  if (loading) {
    return <div>Loading company users...</div>;
  }

  return (
    <div className="company-dash-section company-dash-users">
      <h3 className="company-dash-section-title">Company Users</h3>

      {users.length === 0 && (
        <p className="company-dash-users-empty">No pending requests</p>
      )}

      {users.map((cu) => (
        <div key={cu._id} className="company-dash-user-card">
          <div className="company-dash-user-info">
            <strong className="company-dash-user-name">{cu.user.name}</strong>
            <p className="company-dash-user-email">{cu.user.email}</p>
            {cu.user.mobile && (
              <p className="company-dash-user-mobile">{cu.user.mobile}</p>
            )}
            <p className="company-dash-user-status">Status: {cu.status}</p>
          </div>

          {cu.status === "PENDING" && (
            <div className="company-dash-user-actions">
              <button
                className="company-dash-user-approve-btn"
                onClick={() => updateStatus(cu._id, "APPROVED")}
              >
                Approve
              </button>

              <button
                className="company-dash-user-reject-btn"
                onClick={() => updateStatus(cu._id, "REJECTED")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
