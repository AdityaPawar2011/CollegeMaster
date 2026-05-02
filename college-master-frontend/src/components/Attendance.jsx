import { useAuth } from "../context/AuthContext";

export default function Attendance() {
  const { student } = useAuth();

  const subjects = student?.subjects ?? [];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Attendance Tracking
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Your Attendance Record
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Subject-wise Attendance
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your current attendance percentage for each subject
              </p>
            </div>
            <div className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              Overall: {student?.attendancePercentage ?? 0}%
            </div>
          </div>

          <div className="space-y-4">
            {subjects.length > 0 ? (
              subjects.map((subject, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>{subject.name || "Unknown Subject"}</span>
                    <span>{subject.attendance ?? 0}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${
                        subject.attendance >= 85
                          ? "bg-emerald-500"
                          : subject.attendance >= 75
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${subject.attendance ?? 0}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-8">
                No attendance data available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
