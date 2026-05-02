import { useAuth } from "../context/AuthContext";

export default function Fees() {
  const { student } = useAuth();

  const feeDetails = student?.fees ?? [];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Fee Management
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Fee Details & Payment
          </h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              Total Due
            </p>
            <p className="mt-2 text-3xl font-semibold text-rose-600">
              ₹{student?.pendingFees || 0}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              Total Paid
            </p>
            <p className="mt-2 text-3xl font-semibold text-emerald-600">
              ₹{student?.paidFees || 0}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              Total Fees
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              ₹{student?.totalFees || 0}
            </p>
          </div>
        </div>

        {/* Fee Table */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Semester-wise Fee Breakdown
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3 pr-6 font-medium">Semester</th>
                  <th className="py-3 pr-6 font-medium">Total</th>
                  <th className="py-3 pr-6 font-medium">Paid</th>
                  <th className="py-3 pr-6 font-medium">Pending</th>
                  <th className="py-3 pr-6 font-medium">Due Date</th>
                  <th className="py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {feeDetails.length > 0 ? (
                  feeDetails.map((fee, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-4 pr-6 font-medium">
                        {fee.semester || "N/A"}
                      </td>
                      <td className="py-4 pr-6">{fee.total || "N/A"}</td>
                      <td className="py-4 pr-6 text-emerald-600">
                        {fee.paid || "N/A"}
                      </td>
                      <td className="py-4 pr-6 text-rose-600">
                        {fee.pending || "N/A"}
                      </td>
                      <td className="py-4 pr-6">{fee.due || "N/A"}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            fee.status === "Paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {fee.status || "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500">
                      No fee details available
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
