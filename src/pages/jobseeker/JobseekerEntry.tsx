import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function JobseekerEntry() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkJobseekerProfile = async () => {
      try {
        // 🔍 Check if jobseeker profile exists
        await api.get("/jobseekers/me");

        // ✅ Profile exists → go to dashboard
        navigate("/jobseeker/dashboard", { replace: true });
      } catch (error: any) {
        // ❌ Profile not found → onboarding required
        if (error?.response?.status === 404) {
          navigate("/jobseeker/onboarding", { replace: true });
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    };

    checkJobseekerProfile();
  }, [navigate]);

  // Simple loading state (no UI yet)
  return <div>Loading...</div>;
}
