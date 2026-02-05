import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth/useAuth";

export default function JobseekerEntry() {
  const navigate = useNavigate();
  const { setJobSeeker } = useAuth();

  useEffect(() => {
    const checkJobseekerProfile = async () => {
      try {
        const res = await api.get("/jobseekers/me");

        setJobSeeker(res.data.data.jobseeker);

        navigate("/jobseeker/dashboard", { replace: true });
      } catch (error: any) {
        if (error?.response?.status === 404) {
          navigate("/jobseeker/onboarding", { replace: true });
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    };

    checkJobseekerProfile();
  }, [navigate, setJobSeeker]);

  return (
    <div className="loading-div">
      <p className="loading-text"> Loading please wait...</p>
    </div>
  );
}
