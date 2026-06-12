export default function CourseDetailPage({ params }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Course Details</h1>
      <p className="mt-2">Course ID: {params.id}</p>
    </div>
  );
}
