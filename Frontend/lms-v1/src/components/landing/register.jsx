


import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../../service/AuthService";
import "./landing.css";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();

  const formSubmit = async (data) => {
    const result = await registerService(data);
    if (result.statusCode !== 200) {
      setErrorMsg(result.message);
    } else {
      setErrorMsg(result.message);
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center register-wrapper">
        <div className="card shadow p-4 register-card">
          <h2 className="text-center mb-4">Student Registration</h2>
          {errorMsg && (
            <p className="text-danger text-center mb-3">{errorMsg}</p>
          )}
      {/* <Header /> */}
      <div className="register-student">
        <br />
        <div className="register-form">
          <h1 style={{ textAlign: "center" }}>Register Student</h1>
          <p style={{textAlign:"center", color:"red"}}>{errorMsg}</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                autoComplete="off"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              <div className="invalid-feedback">{errors.name?.message}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                autoComplete="off"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                autoComplete="off"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <div className="invalid-feedback">
                {errors.password?.message}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>


            <p className="mt-3 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </p>
            <p>Already have an account? <Link to='/login'>Login</Link></p>
            <p><Link to='/'>Go home</Link></p>

          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
