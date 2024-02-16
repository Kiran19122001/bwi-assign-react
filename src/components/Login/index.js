import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Cookies from "js-cookie";
import "./index.css";

const validationSchema = yup.object().shape({
  email: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const [isUser, setNouser] = useState(false);
  const [isValid, setPassOruserError] = useState(false);
  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/");
    }
  }, []);
  const initialValues = {
    email: "kminchelle",
    password: "0lelplR",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.email,
          password: values.password,
        }),
      };
      const response = await fetch("https://dummyjson.com/auth/login", options);
      const result = await response.json();
      if (response.ok) {
        Cookies.set("token", result.token, { expires: 7 });
        navigate("/");
      } else {
        setPassOruserError(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="login-form-cont">
        <h1 className="login">Login</h1>
        <label>UserName</label>
        <input
          type="text"
          name="email"
          placeholder="Enter username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}

        {isUser && (
          <p style={{ color: "red" }}>No user found please register</p>
        )}
        {isValid && (
          <p style={{ color: "red" }}>Username or Password is Incorrect</p>
        )}
        <button type="submit" disabled={formik.isSubmitting}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
