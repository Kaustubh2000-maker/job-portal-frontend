import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import { AuthProvider } from "./auth/AuthProvider";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobseekerRoutes from "./routes/JobseekerRoutes";

import CompanyRoutes from "./routes/CompanyRoutes";
import ResetPassword from "./pages/login/ResetPassword";

// pages
// import JobseekerEntry from "./pages/jobseeker/JobseekerEntry";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* JOBSEEKER ENTRY */}
          <Route
            path="/jobseeker/*"
            element={
              <ProtectedRoute allowedRole="JOBSEEKER">
                <JobseekerRoutes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/*"
            element={
              <ProtectedRoute allowedRole="COMPANY">
                <CompanyRoutes />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
