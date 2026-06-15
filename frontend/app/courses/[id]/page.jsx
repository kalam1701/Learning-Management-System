"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import API from "@/app/utils/api";
import toast from "react-hot-toast";

export default function SingleCoursePage() {
  const router = useRouter();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("videos");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) { router.push("/login"); return; }
    setUser(JSON.parse(storedUser));

    API.get(`/courses/${id}`)
      .then(({ data }) => setCourse(data))
      .catch(() => toast.error("Failed to load courses"));
  }, [id]);

  const enroll = async () => {
    try {
      await API.post(`/courses/${id}/enroll`);
      toast.success("Enrolled succesfully!");
      router.push("dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to enroll");
    }
  };

  const glassCard = {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "16px",
    padding: "1.5rem"
  };

  const tabStyle = (tab) => ({
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer",
    border: "none",
    fontWeight: activeTab === tab ? "500" : "400",
    background: activeTab === tab ? "rgba(255,255,255,0.3)" : "transparent",
    color: "white"
  });

  if (!course) return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f64f59 100%)",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <p style={{ color: "white", fontSize: "18px" }}>Loading...</p>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f64f59 100%)"
    }}>
      {/* Navbar */}
      <nav style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span style={{ color: "white", fontSize: "20px", fontWeight: "500" }}>📚 LMS</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/dashboard" style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", textDecoration: "none" }}>Dashboard</Link>
          <Link href="/courses" style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", textDecoration: "none" }}>Courses</Link>
        </div>
      </nav>

      <div style={{ padding: "2.5rem" }}>
        {/* Course Header */}
        <div style={{ ...glassCard, marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h1 style={{ color: "white", fontSize: "24px", fontWeight: "500", margin: "0 0 8px" }}>
                {course.title}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: "0 0 8px" }}>
                {course.description}
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: 0 }}>
                By {course.instructor?.name} · {course.students?.length} students
              </p>
            </div>
            {user?.role === "student" && (
              <button onClick={enroll} style={{
                background: "white",
                color: "#764ba2",
                border: "none",
                borderRadius: "12px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}>
                Enroll Now
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "1.5rem",
          background: "rgba(255,255,255,0.1)",
          padding: "6px",
          borderRadius: "12px",
          width: "fit-content"
        }}>
          <button style={tabStyle("videos")} onClick={() => setActiveTab("videos")}>📹 Videos</button>
          <button style={tabStyle("assignments")} onClick={() => setActiveTab("assignments")}>📝 Assignments</button>
          <button style={tabStyle("quizzes")} onClick={() => setActiveTab("quizzes")}>🧠 Quizzes</button>
        </div>

        {/* Videos Tab */}
        {activeTab === "videos" && (
          <div>
            {course.videos?.length === 0 ? (
              <div style={{ ...glassCard, textAlign: "center" }}>
                <p style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}>No videos uploaded yet.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                {course.videos.map((video, index) => (
                  <div key={index} style={glassCard}>
                    <div style={{
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "10px",
                      height: "160px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "12px",
                      cursor: "pointer"
                    }}
                      onClick={() => window.open(video.url, "_blank")}
                    >
                      <span style={{ fontSize: "40px" }}>▶️</span>
                    </div>
                    <h3 style={{ color: "white", fontSize: "15px", fontWeight: "500", margin: "0 0 8px" }}>
                      {video.title}
                    </h3>
                    <button
                      onClick={() => window.open(video.url, "_blank")}
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "7px 14px",
                        fontSize: "13px",
                        cursor: "pointer"
                      }}>
                      Watch Video →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === "assignments" && (
          <div style={glassCard}>
            <p style={{ color: "rgba(255,255,255,0.6)", margin: 0, textAlign: "center" }}>
              Assignments coming soon. Submit them from your dashboard.
            </p>
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === "quizzes" && (
          <div style={glassCard}>
            <p style={{ color: "rgba(255,255,255,0.6)", margin: 0, textAlign: "center" }}>
              Quizzes coming soon. Attempt them from your dashboard.
            </p>
          </div>
        )}
      </div>

    </div>
  )

}