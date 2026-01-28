import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordService } from "../../services/auth.service";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!token) {
      toast.error("Invalid reset link");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await resetPasswordService(token, {
        password,
        passwordConfirm,
      });

      toast.success("Password reset successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-from">
        <h2 className="login-from-heading">Reset Password</h2>

        <div className="login-form-div">
          <label className="login-form-label">New Password</label>
          <input
            className="login-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-form-div">
          <label className="login-form-label">Confirm Password</label>
          <input
            className="login-form-input"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <button
          className="login-form-submit-btn"
          onClick={handleReset}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
