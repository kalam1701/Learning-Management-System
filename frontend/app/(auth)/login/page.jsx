"use client";                                     // Opt-in to Next.js client-side behavior
import { useState } from "react";                 // React hook for component state
import API from "../../utils/api";                // API helper for HTTP requests
import toast from "react-hot-toast";              // Toast notifications library
import { useRouter } from "next/navigation";      // Next.js router for client navigation
import Link from "next/link";                     // Link component for client-side navigation

export default function LoginPage() {             // Default exported component for the login page
  const router = useRouter();                     // Router instance to programmatically navigate
  const [form, setForm] = useState({ email: "", password: "" }); // Local state for form fields

  const handleChange = (e) => {                   // Update form state when an input changes
    setForm({ ...form, [e.target.name]: e.target.value }); // Merge existing state with changed field
  };

  const handleSubmit = async (e) => {             // Handle form submission asynchronously
    e.preventDefault();                           // Prevent default HTML form submission
    try {
      const { data } = await API.post("/auth/login", form); // Send POST request to login endpoint
      localStorage.setItem("token", data.token);            // Persist JWT token to localStorage
      localStorage.setItem("user", JSON.stringify(data.user)); // Persist user object
      toast.success("Logged in!");                          // Show success notification
      router.push("/dashboard");                            // Redirect the user to the dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong"); // Show error message
    }
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
        {/* Logo */}
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
            Welcome back
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: 0 }}>
            Sign in to your LMS account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", display: "block", marginBottom: "6px" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "12px",
                padding: "12px 14px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", display: "block", marginBottom: "6px" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "12px",
                padding: "12px 14px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "white",
              color: "#764ba2",
              border: "none",
              borderRadius: "12px",
              padding: "13px",
              fontSize: "15px",
              fontWeight: "500",
              cursor: "pointer",
              marginBottom: "1.25rem"
            }}
          >
            Sign in
          </button>
        </form>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "13px", margin: 0 }}>
          No account?{" "}
          <Link href="/register" style={{ color: "white", fontWeight: "500" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}