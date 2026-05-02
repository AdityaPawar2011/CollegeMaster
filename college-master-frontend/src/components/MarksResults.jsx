import { useAuth } from "../context/AuthContext";

export default function MarksResults() {
  const { student } = useAuth();

  const subjects = student?.subjects ?? [];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Academic Performance
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Exam Results & Marks
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Your Results
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Latest marks from your exams with internal and external scores
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3 pr-6 font-medium">Subject</th>
                  <th className="py-3 pr-6 font-medium">Internal</th>
                  <th className="py-3 pr-6 font-medium">External</th>
                  <th className="py-3 pr-6 font-medium">Total</th>
                  <th className="py-3 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {subjects.length > 0 ? (
                  subjects.map((subject, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-4 pr-6 font-medium">
                        {subject.name || "Unknown"}
                      </td>
                      <td className="py-4 pr-6">
                        {subject.internalScore || "N/A"}
                      </td>
                      <td className="py-4 pr-6">
                        {subject.externalScore || "N/A"}
                      </td>
                      <td className="py-4 pr-6">
                        {subject.totalScore || "N/A"}
                      </td>
                      <td className="py-4 font-semibold text-emerald-600">
                        {subject.grade || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500">
                      No results available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
