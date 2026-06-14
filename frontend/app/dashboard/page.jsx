"use client";
import { useState ,useEffect } from "react";  
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import API from "../utils/api";

export default function DashboardPage(){
  const router =useRouter();
  const [user, setuser] = useState(null);
  const [course, setcourse] = useState([]);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setuser(JSON.stringify(storedUser));

    //fetch enrolled courses
    API.get("/courses/my/courses")
        .then(({data})=>setcourse(data))
        .catch(()=>router.push("/login"));

  }, []);
  return (
    <div>
      <Navbar/>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-2">
          Welcome , {user?.name} 👋
        </h1>
        <p className="text-gray-500 mb-6">Role : {user?.role}</p>
        <h2 className="text-xl font-semibold mb-4">My Courses</h2>
        {courses.length === 0 ?(
          <p className="text-gray-400">No courses enrolled yet.</p>
        ):(
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course)=>(
              <div key={course._id} className="bg-white p-4 rounded-xl shadow">
                <h3 className="font-bold text-lg">{course.title}</h3>
                <p className="text-gray-500 text-sm">{course.description}</p>
                <p className="text-sm mt-2 text-blue-600">
                  Instructor : {course.instructor?.name}
                </p>
              </div>
            ))} 
          </div>
        )} 
      </div>
    </div>
  );
  
}