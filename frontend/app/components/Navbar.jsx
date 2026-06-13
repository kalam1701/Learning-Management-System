"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/dashboard" className="text-xl font-bold">LMS</Link>
      <div className="flex gap-4">
        <Link href="/courses" className="hover:underline">Courses</Link>
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <button onClick={logout} className="hover:underline">Logout</button>
      </div>
    </nav>
  );
}