import { useState } from "react";
import { loginService, signupService } from "../../services/auth.service";

type AuthMode = "LOGIN" | "SIGNUP";
type SignupRole = "COMPANY" | "JOBSEEKER";

import loginImg from "./../../assets/login/login-bg.webp";

export default function Login() {
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

  // 🔐 LOGIN API CALL
  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await loginService({
        email: loginData.email,
        password: loginData.password,
      });

      console.log("LOGIN SUCCESS", response);
      // later → set auth context + redirect
    } catch (error: any) {
      console.error("LOGIN ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  // 📝 SIGNUP API CALL
  const handleSignup = async () => {
    try {
      setLoading(true);

      const response = await signupService({
        ...signupData,
        role: signupRole,
      });

      console.log("SIGNUP SUCCESS", response);
      // later → auto login or switch to login
    } catch (error: any) {
      console.error("SIGNUP ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-img-div">
        <img className="login-img" src={loginImg} alt="login" />
      </div>

      <div className="login-from">
        <h2 className="login-from-heading">
          {mode === "LOGIN" ? "Login" : "Sign Up"}
        </h2>

        {/* LOGIN FORM */}
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
              New here?{" "}
              <span
                className="login-form-change-span"
                onClick={() => setMode("SIGNUP")}
              >
                Sign Up
              </span>
            </p>
          </>
        )}

        {/* SIGNUP FORM */}
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
      </div>
    </div>
  );
}
