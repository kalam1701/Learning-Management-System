export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <div className="font-semibold">LMS</div>
      <div className="flex gap-4 text-sm">
        <a href="/" className="hover:underline">Home</a>
        <a href="/courses" className="hover:underline">Courses</a>
        <a href="/dashboard" className="hover:underline">Dashboard</a>
      </div>
    </nav>
  );
}
