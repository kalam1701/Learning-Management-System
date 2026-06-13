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
      
    </div>
  );
  
}