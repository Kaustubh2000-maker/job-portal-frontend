import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import AdminUsersQuery from "./AdminUsersQuery";
import AdminUsersResults from "./AdminUsersResults";

interface Filters {
  gender: string;
  education: string;
  status: string;
  skill: string;
  createdAfter: string;
}

export default function AdminUsersSection() {
  const [filters, setFilters] = useState<Filters>({
    gender: "ALL",
    education: "ALL",
    status: "ALL",
    skill: "",
    createdAfter: "",
  });

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const buildQueryParams = () => {
    const params: any = {};

    if (filters.gender !== "ALL") params.gender = filters.gender;
    if (filters.education !== "ALL") params.education = filters.education;
    if (filters.status !== "ALL") params.status = filters.status;
    if (filters.skill.trim()) params.skill = filters.skill.trim();
    if (filters.createdAfter) params.createdAfter = filters.createdAfter;

    return params;
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const queryParams = buildQueryParams();
      console.log("🔍 QUERY PARAMS:", queryParams);

      const res = await api.get("/jobseekers", {
        params: queryParams,
      });

      setUsers(res.data.data.jobSeekers);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = async () => {
    try {
      const queryParams = buildQueryParams();

      const res = await api.get("/jobseekers/export", {
        params: queryParams,
        responseType: "blob",
      });

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "jobseekers.xlsx";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error("Failed to download Excel");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-users">
      <div className="a-sec-header">
        <h3 className="a-sec-heading">Users</h3>
      </div>

      <AdminUsersQuery
        filters={filters}
        onChange={handleChange}
        onSearch={fetchUsers}
        onDownload={downloadExcel}
      />

      <AdminUsersResults users={users} loading={loading} />
    </div>
  );
}
