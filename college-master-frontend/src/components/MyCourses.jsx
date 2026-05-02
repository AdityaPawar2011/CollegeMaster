import { useAuth } from "../context/AuthContext";

export default function MyCourses() {
  const { student } = useAuth();

  const subjects = student?.subjects ?? [];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Course Management
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            My Courses
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.length > 0 ? (
            subjects.map((subject, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Course Code
                    </p>
                    <h3 className="text-sm font-semibold text-slate-700 mt-1">
                      {subject.code || "N/A"}
                    </h3>
                  </div>
                  <span className="text-2xl">📚</span>
                </div>

                <h2 className="text-lg font-semibold text-slate-900 mb-3">
                  {subject.name || "Unknown Course"}
                </h2>

                <div className="space-y-2 text-sm">
                  <p className="text-slate-600">
                    <span className="font-medium">Instructor:</span>{" "}
                    {subject.teacher || "N/A"}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-medium">Credits:</span>{" "}
                    {subject.credits || "N/A"}
                  </p>
                </div>

                <button className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-200 font-medium hover:bg-blue-100 transition">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500">No courses available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
