export default function CourseCard({ title, description }) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}
