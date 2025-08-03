// components/landing/LoginForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginService } from "../../service/AuthService";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import './landing.css';

export default function LoginForm() {
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, formState, reset } = useForm();
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();

  const formSubmit = async (data) => {
    const result = await loginService(data);

    if (result.status !== 200) {
      setErrorMsg(result.message);
    } else {
      setErrorMsg("");
      sessionStorage.setItem("token", result.token);
      login(result.role[0]);

      if (result.role[0] === "ROLE_ADMIN") navigate("/admin");
      else if (result.role[0] === "ROLE_USER") navigate("/user");
      else if (result.role[0] === "ROLE_TEACHER") navigate("/teacher");
    }

    reset();
  };

  return (
    <>
      <Header />
   
<div className="login-wrapper d-flex justify-content-center align-items-center">
  <div className="card login-card shadow p-4">
    <h2 className="text-center mb-4">Login</h2>
    {errorMsg && <p className="text-danger text-center">{errorMsg}</p>}
    <form onSubmit={handleSubmit(formSubmit)} noValidate>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          {...register("username", { required: "Email is required" })}
        />
        <div className="invalid-feedback">{errors.username?.message}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          {...register("password", { required: "Password is required" })}
        />
        <div className="invalid-feedback">{errors.password?.message}</div>
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>

      <p className="mt-3 text-center">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  </div>
</div>

      <Footer />
    </>
  );
}
