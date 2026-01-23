import { Routes, Route } from "react-router-dom";
import CompanyEntry from "../pages/company/CompanyEntry";
import CompanySelect from "../pages/company/CompanySelect";
import CompanyDashboard from "../pages/company/CompanyDashboard";
import CompanyCreate from "../pages/company/CompanyCreate";

export default function CompanyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CompanyEntry />} />
      <Route path="select" element={<CompanySelect />} />
      <Route path="create" element={<CompanyCreate />} />
      <Route path="dashboard" element={<CompanyDashboard />} />
    </Routes>
  );
}
