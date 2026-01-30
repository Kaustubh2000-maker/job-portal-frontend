import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminCompaniesQuery from "./AdminCompaniesQuery";
import AdminCompaniesResults from "./AdminCompaniesResults";
import { companiesService } from "../../services/companies.service";

export default function AdminCompaniesSection() {
  const [filters, setFilters] = useState({
    search: "",
    industry: "",
    location: "",
    isActive: "ALL",
    createdAfter: "",
  });

  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const buildQueryParams = () => {
    const params: any = {};

    if (filters.search.trim()) params.search = filters.search.trim();
    if (filters.industry.trim()) params.industry = filters.industry.trim();
    if (filters.location.trim()) params.location = filters.location.trim();
    if (filters.isActive !== "ALL") params.isActive = filters.isActive;
    if (filters.createdAfter) params.createdAfter = filters.createdAfter;

    return params;
  };

  /* 🔍 Search / Load companies */
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const params = buildQueryParams();

      const res = await companiesService.getAllCompaniesForAdmin(params);

      setCompanies(res.data.companies);
    } catch {
      toast.error("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = async () => {
    try {
      const params = buildQueryParams();

      const res = await companiesService.exportCompaniesExcel(params);

      if (!res || !res.data) {
        throw new Error("Empty excel response");
      }

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "companies.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error("Failed to download Excel");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="admin-companies">
      <div className="a-sec-header">
        <h3 className="a-sec-heading">Companies</h3>
      </div>

      <AdminCompaniesQuery
        filters={filters}
        onChange={handleChange}
        onSearch={fetchCompanies}
        onDownload={downloadExcel}
      />

      <AdminCompaniesResults companies={companies} loading={loading} />
    </div>
  );
}
