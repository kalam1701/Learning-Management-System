"use client"
import { useEffect ,  useState } from  "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "../utils/api";
import toast from "react-hot-toast";

export default function CoursePage(){
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [user, setuser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(!storedUser){ router.push("/login"); return;}
    setuser(JSON.parse(storedUser));
    API.get("/courses")
    .then(({data})=> setCourses(data))
    .catch(()=> toast.error("Failed to load courese"))
  }, [])
  
  const enroll = async (courseId) => {
    try {
      await API.post(`/courses/${courseId}/enroll`);
      toast.success("Enrolled succesfully!");
      router.push("/dashboard")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to enroll")
    }
  };

  const logout =() =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return(
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
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link href="/dashboard" style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", textDecoration: "none" }}>Dashboard</Link>
          <Link href="/courses" style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", textDecoration: "none" }}>Courses</Link>
          <button onClick={logout} style={{
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "10px",
            color: "white",
            padding: "8px 16px",
            fontSize: "13px",
            cursor: "pointer"
          }}>Logout</button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: "2.5rem" }}>
        {/* Welcome */}
        <div style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "20px",
          padding: "2rem",
          marginBottom: "2rem"
        }}>
          <h1 style={{ color: "white", fontSize: "26px", fontWeight: "500", margin: "0 0 6px" }}>
            Welcome back, {user?.name} 👋
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", margin: 0, fontSize: "15px" }}>
            Role: {user?.role}
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          {[
            { label: "Enrolled Courses", value: courses.length, icon: "📖" },
            { label: "In Progress", value: courses.length, icon: "⏳" },
            { label: "Completed", value: 0, icon: "✅" }
          ].map((stat) => (
            <div key={stat.label} style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "16px",
              padding: "1.5rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{stat.icon}</div>
              <div style={{ color: "white", fontSize: "24px", fontWeight: "500" }}>{stat.value}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* My Courses */}
        <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500", marginBottom: "1rem" }}>
          My Courses
        </h2>

        {courses.length === 0 ? (
          <div style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "16px",
            padding: "3rem",
            textAlign: "center"
          }}>
            <p style={{ color: "rgba(255,255,255,0.6)", margin: "0 0 1rem" }}>
              You haven't enrolled in any courses yet.
            </p>
            <Link href="/courses" style={{
              background: "white",
              color: "#764ba2",
              padding: "10px 24px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "500",
              textDecoration: "none"
            }}>Browse Courses</Link>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem"
          }}>
            {courses.map((course) => (
              <div key={course._id} style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "16px",
                padding: "1.5rem"
              }}>
                <h3 style={{ color: "white", fontSize: "16px", fontWeight: "500", margin: "0 0 8px" }}>
                  {course.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", margin: "0 0 12px" }}>
                  {course.description}
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", margin: "0 0 16px" }}>
                  By {course.instructor?.name}
                </p>
                <Link href={`/courses/${course._id}`} style={{
                  background: "rgba(255,255,255,0.25)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  textDecoration: "none",
                  display: "inline-block"
                }}>View Course →</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}