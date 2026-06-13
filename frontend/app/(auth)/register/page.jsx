"use client";
// import React hook for local component state
import { useState } from "react";
// import API helper for backend requests
import API from "../../utils/api";
// import toast notifications
import toast from "react-hot-toast";
// import router helper for client navigation
import { useRouter } from "next/navigation";
// import Next.js Link component
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter(); // initialize router
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" }); // form state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // update form field value
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission
    try {
      await API.post("/auth/register", form); // send registration request
      toast.success("Registered successfully!"); // show success message
      router.push("/login"); // redirect to login page
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong"); // show error message
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "12px",
    padding: "12px 14px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box"
  };

  const labelStyle = {
    color: "rgba(255,255,255,0.85)",
    fontSize: "13px",
    display: "block",
    marginBottom: "6px"
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f64f59 100%)" }}>
      <div style={{
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: "24px",
        padding: "2.5rem",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
      }}>
        <div className="text-center mb-8">
          <div style={{
            width: "52px", height: "52px",
            background: "rgba(255,255,255,0.25)",
            borderRadius: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1rem"
          }}>
            <span style={{ fontSize: "26px" }}>📚</span>
          </div>
          <h2 style={{ color: "white", fontSize: "22px", fontWeight: "500", margin: "0 0 4px" }}>
            Create account
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: 0 }}>
            Join LMS today
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label style={labelStyle}>Full Name</label>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required style={inputStyle} />
          </div>
          <div className="mb-4">
            <label style={labelStyle}>Email</label>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={inputStyle} />
          </div>
          <div className="mb-4">
            <label style={labelStyle}>Password</label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={inputStyle} />
          </div>
          <div className="mb-6">
            <label style={labelStyle}>Role</label>
            <select name="role" onChange={handleChange} style={{ ...inputStyle }}>
              <option value="student" style={{ background: "#764ba2" }}>Student</option>
              <option value="instructor" style={{ background: "#764ba2" }}>Instructor</option>
            </select>
          </div>

          <button type="submit" style={{
            width: "100%", background: "white", color: "#764ba2",
            border: "none", borderRadius: "12px", padding: "13px",
            fontSize: "15px", fontWeight: "500", cursor: "pointer", marginBottom: "1.25rem"
          }}>
            Create account
          </button>
        </form>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "13px", margin: 0 }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "white", fontWeight: "500" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}