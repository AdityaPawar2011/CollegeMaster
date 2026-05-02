export default function Assignments() {
  const assignments = [
    {
      id: 1,
      subject: "Data Structures",
      title: "Implement Binary Search Tree",
      dueDate: "May 10, 2026",
      status: "Pending",
      statusColor: "bg-amber-100 text-amber-700",
      description:
        "Implement a complete Binary Search Tree with all operations.",
    },
    {
      id: 2,
      subject: "Database Management",
      title: "SQL Query Optimization",
      dueDate: "May 8, 2026",
      status: "Submitted",
      statusColor: "bg-emerald-100 text-emerald-700",
      description: "Optimize given SQL queries for better performance.",
    },
    {
      id: 3,
      subject: "Web Development",
      title: "E-Commerce Website",
      dueDate: "May 15, 2026",
      status: "Pending",
      statusColor: "bg-amber-100 text-amber-700",
      description:
        "Build a full-stack e-commerce platform using React and Node.js.",
    },
    {
      id: 4,
      subject: "Operating Systems",
      title: "Page Replacement Algorithms",
      dueDate: "May 5, 2026",
      status: "Overdue",
      statusColor: "bg-red-100 text-red-700",
      description: "Analyze and compare different page replacement algorithms.",
    },
    {
      id: 5,
      subject: "Computer Networks",
      title: "Network Simulation Project",
      dueDate: "May 12, 2026",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-700",
      description:
        "Simulate a network topology and demonstrate routing protocols.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Academic Tasks
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Assignments
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                      {assignment.subject}
                    </p>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${assignment.statusColor}`}
                    >
                      {assignment.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2">
                    {assignment.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>📅</span>
                  <span>Due: {assignment.dueDate}</span>
                </div>
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-200 font-medium hover:bg-blue-100 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
