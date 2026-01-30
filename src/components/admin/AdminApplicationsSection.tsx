import { useEffect, useState } from "react";
import { applicationService } from "../../services/application.service";
import AdminApplicationsQuery from "./AdminApplicationsQuery";
import AdminApplicationsResults from "./AdminApplicationsResults";

export default function AdminApplicationsSection() {
  const [filters, setFilters] = useState({
    status: "ALL",
    jobTitle: "",
    companyName: "",
    candidate: "",
    appliedFrom: "",
    appliedTo: "",
  });

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const buildQueryParams = () => {
    const params: any = {};

    if (filters.status !== "ALL") params.status = filters.status;
    if (filters.jobTitle.trim()) params.jobTitle = filters.jobTitle.trim();
    if (filters.companyName.trim())
      params.companyName = filters.companyName.trim();
    if (filters.candidate.trim()) params.candidate = filters.candidate.trim();
    if (filters.appliedFrom) params.appliedFrom = filters.appliedFrom;
    if (filters.appliedTo) params.appliedTo = filters.appliedTo;

    return params;
  };

  const fetchApplications = async () => {
    setLoading(true);
    const res = await applicationService.getAllApplicationsForAdmin(
      buildQueryParams()
    );
    setApplications(res.data.applications);
    setLoading(false);
  };
  useEffect(() => {
    fetchApplications();
  }, []);

  const downloadExcel = async () => {
    const res = await applicationService.exportApplicationsExcel(
      buildQueryParams()
    );
    const blob = new Blob([res.data]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "applications.xlsx";
    a.click();
  };

  return (
    <>
      <div className="a-sec-header">
        <h3 className="a-sec-heading">Applications</h3>
      </div>

      <AdminApplicationsQuery
        filters={filters}
        onChange={(e: any) =>
          setFilters({ ...filters, [e.target.name]: e.target.value })
        }
        onSearch={fetchApplications}
        onDownload={downloadExcel}
      />

      <AdminApplicationsResults applications={applications} loading={loading} />
    </>
  );
}
