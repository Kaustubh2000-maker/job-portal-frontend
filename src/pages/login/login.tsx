import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginService,
  signupService,
  forgotPasswordService,
} from "../../services/auth.service";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth/useAuth";
import { motion, AnimatePresence } from "framer-motion";

import {
  nrmlLeft,
  nrmlRight,
  nrmlScaleUp,
  nrmlVisible,
} from "../../animations/animations";

type AuthMode = "LOGIN" | "SIGNUP" | "FORGOT_PASSWORD";
type SignupRole = "COMPANY" | "JOBSEEKER";

import loginImg from "./../../assets/login/login-bg.webp";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>("LOGIN");
  const [signupRole, setSignupRole] = useState<SignupRole>("JOBSEEKER");
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    passwordConfirm: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await loginService(loginData);
      const user = response.data.user;

      setUser(user);
      toast.success("Login successful");

      if (user.role === "JOBSEEKER") navigate("/jobseeker", { replace: true });
      if (user.role === "COMPANY") navigate("/company", { replace: true });
      if (user.role === "ADMIN") navigate("/admin", { replace: true });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setLoading(true);

      const response = await signupService({
        ...signupData,
        role: signupRole,
      });

      setUser(response.data.user);
      toast.success("Sign up successful");

      if (response.data.user.role === "JOBSEEKER") {
        navigate("/jobseeker", { replace: true });
      }

      if (response.data.user.role === "COMPANY") {
        navigate("/company", { replace: true });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      setLoading(true);

      await forgotPasswordService({ email: forgotEmail });

      toast.success("Password reset link sent to your email");
      setMode("LOGIN");
    } catch (error: any) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <motion.div className="login-img-div" {...nrmlVisible(0.3)}>
        <img className="login-img" src={loginImg} alt="login" />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div className="login-from" {...nrmlVisible(0.2)} key={mode}>
          <h2 className="login-from-heading">
            {mode === "LOGIN" && "Login to JobSearch"}
            {mode === "SIGNUP" && "Sign Up to JobSearch"}
            {mode === "FORGOT_PASSWORD" && "Reset your password"}
          </h2>

          {mode === "LOGIN" && (
            <>
              <div className="login-form-div">
                <label className="login-form-label">Email</label>
                <input
                  className="login-form-input"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>

              <div className="login-form-div">
                <label className="login-form-label">Password</label>
                <input
                  className="login-form-input"
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>

              <button
                className="login-form-submit-btn"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="login-form-change-text">
                New Here? Create Account Now,{" "}
                <span
                  className="login-form-change-span"
                  onClick={() => setMode("SIGNUP")}
                >
                  Sign Up
                </span>
              </p>
              <p
                className="login-form-forgot-text"
                onClick={() => setMode("FORGOT_PASSWORD")}
              >
                Forgot password?
              </p>
            </>
          )}

          {mode === "FORGOT_PASSWORD" && (
            <>
              <div className="login-form-div">
                <label className="login-form-label">Email</label>
                <input
                  className="login-form-input"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </div>

              <button
                className="login-form-submit-btn"
                onClick={handleForgotPassword}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>

              <p className="login-form-change-text">
                Back to{" "}
                <span
                  className="login-form-change-span"
                  onClick={() => setMode("LOGIN")}
                >
                  Login
                </span>
              </p>
            </>
          )}

          {mode === "SIGNUP" && (
            <>
              <div className="login-form-signup-role-btn-div">
                <button
                  className={`login-form-signup-role-btn ${
                    signupRole === "JOBSEEKER"
                      ? "login-form-signup-role-btn-active"
                      : ""
                  }`}
                  onClick={() => setSignupRole("JOBSEEKER")}
                >
                  Jobseeker
                </button>

                <button
                  className={`login-form-signup-role-btn ${
                    signupRole === "COMPANY"
                      ? "login-form-signup-role-btn-active"
                      : ""
                  }`}
                  onClick={() => setSignupRole("COMPANY")}
                >
                  Company
                </button>
              </div>

              <div className="login-form-div">
                <label className="login-form-label">Name</label>
                <input
                  className="login-form-input"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                />
              </div>

              <div className="login-form-div">
                <label className="login-form-label">Email</label>
                <input
                  className="login-form-input"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                />
              </div>

              <div className="login-form-div">
                <label className="login-form-label">Mobile</label>
                <input
                  className="login-form-input"
                  value={signupData.mobile}
                  onChange={(e) =>
                    setSignupData({ ...signupData, mobile: e.target.value })
                  }
                />
              </div>

              <div className="login-form-div">
                <label className="login-form-label">Password</label>
                <input
                  className="login-form-input"
                  type="password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                />
              </div>

              <div className="login-form-div">
                <label className="login-form-label">Confirm Password</label>
                <input
                  className="login-form-input"
                  type="password"
                  value={signupData.passwordConfirm}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      passwordConfirm: e.target.value,
                    })
                  }
                />
              </div>

              <button
                className="login-form-submit-btn"
                onClick={handleSignup}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>

              <p className="login-form-change-text">
                Already have an account?{" "}
                <span
                  className="login-form-change-span"
                  onClick={() => setMode("LOGIN")}
                >
                  Login
                </span>
              </p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
