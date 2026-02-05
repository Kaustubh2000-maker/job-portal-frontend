import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import { AuthProvider } from "./context/auth/AuthProvider";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobseekerRoutes from "./routes/JobseekerRoutes";
import AdminRoutes from "./routes/AdminRoutes";

import CompanyRoutes from "./routes/CompanyRoutes";
import ResetPassword from "./pages/login/ResetPassword";
//
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
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
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AdminRoutes />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer
          position={window.innerWidth < 768 ? "top-center" : "top-right"}
          autoClose={1000}
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
