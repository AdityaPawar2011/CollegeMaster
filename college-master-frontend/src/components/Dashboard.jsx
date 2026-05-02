import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BookOpen, CalendarDays, IndianRupee, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { student } = useAuth();
  const navigate = useNavigate();
  

  const subjects = student?.subjects ?? [];
  const attendanceOverview = subjects.map((subject) => ({
    subject: subject.name || "Unknown Subject",
    score: subject.attendance
      ? `${subject.attendance}/100`
      : subject.totalScore || "0/0",
    percent: subject.attendance ?? 0,
    status:
      subject.attendance >= 85
        ? "bg-emerald-500"
        : subject.attendance >= 75
          ? "bg-amber-500"
          : "bg-red-500",
  }));

  const recentResults = subjects.map((subject) => ({
    subject: subject.name || "Unknown Subject",
    internal: subject.internalScore || "0/0",
    external: subject.externalScore || "0/0",
    total: subject.totalScore || "0/0",
    grade: subject.grade || "N/A",
  }));

  const courses = subjects.map((subject) => ({
    title: subject.name || "Unknown Subject",
    code: subject.code || "N/A",
    teacher: subject.teacher || "N/A",
    credits: subject.credits || "0 Credits",
  }));

  const notices =
    student?.notices?.map((notice) => ({
      ...notice,
      color: notice.color || "bg-slate-100 text-slate-700",
    })) ?? [];

  const activities =
    student?.activities?.map((activity) => ({
      ...activity,
      iconColor: activity.iconColor || "bg-slate-100 text-slate-700",
    })) ?? [];

  const feeDetails = student?.fees ?? [];

  const topCards = [
    {
      title: "Total Subjects",
      value: student?.totalSubjects ?? subjects.length ?? 0,
      icon: <BookOpen size={20} />,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Attendance",
      value: `${student?.attendancePercentage ?? 0}%`,
      icon: <CalendarDays size={20} />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Fees",
      value: `₹${student?.pendingFees ?? 0}`,
      icon: <IndianRupee size={20} />,
      bg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "CGPA",
      value: student?.cgpa ?? 0,
      icon: <TrendingUp size={20} />,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const firstName = student?.name?.split(" ")[0] || "Student";

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-xl font-semibold text-slate-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-5">
          <div>
            <p className=" font-bold text-2xl  text-slate-900">
              Student Dashboard
            </p>
            <p className="mt-2 text-sm text-left  text-slate-600">
              Welcome back, {firstName}!
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300">
              <span className="text-xl">🔔</span>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[11px] font-semibold text-white">
                
              </span>
            </button> */}
            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white">
                {student?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{student?.name}</p>
                <p className="text-sm text-slate-500">
                  {student?.department || "BTech CSE"} -{" "}
                  {student?.semester
                    ? `Semester ${student.semester}`
                    : "3rd Year"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4">
          {topCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                {/* Left Content */}
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {card.value}
                  </p>
                </div>

                {/* Icon Box */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bg} ${card.iconColor}`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.65fr_0.95fr]">
          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Attendance Overview
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Subject-wise attendance performance and current attendance
                    percentage.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  Overall: {student?.attendancePercentage ?? 0}%
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {attendanceOverview.map((item) => (
                  <div key={item.subject} className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                      <span>{item.subject}</span>
                      <span>
                        {item.score} • {item.percent}%
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`${item.status} h-full rounded-full`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Recent Exam Results
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Latest marks from your exams with internal and external
                    scores.
                  </p>
                </div>
                <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700">
                  Updated recently
                </span>
              </div>

              <div className="mt-6 overflow-x-auto">
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
                  <tbody className="divide-y divide-slate-200">
                    {recentResults.map((result) => (
                      <tr key={result.subject} className="hover:bg-slate-50">
                        <td className="py-4 pr-6 font-medium text-slate-900">
                          {result.subject}
                        </td>
                        <td className="py-4 pr-6">{result.internal}</td>
                        <td className="py-4 pr-6">{result.external}</td>
                        <td className="py-4 pr-6">{result.total}</td>
                        <td className="py-4 font-semibold text-slate-900">
                          {result.grade}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    My Courses
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Active subjects and instructor details.
                  </p>
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  5 Courses
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.title}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {course.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {course.code}
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                          {course.teacher}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                        {course.credits}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
          <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 overflow-hidden">
  <div className="flex items-center justify-between gap-4 mb-2">
    <div>
      <h2 className="  text-2xl font-semibold text-slate-900">Profile</h2>
     
    </div>
   <button
  onClick={() => navigate("/profile")}
  className="inline-flex items-center gap-2 rounded-full border border-slate-400 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
    
  </svg>
  
  Edit
</button>
  </div>

  <div className="relative rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-6">
    {/* Decorative accent */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-2xl -mr-16 -mt-16"></div>
    
    <div className="relative">
      {/* Header with avatar and name */}
      <div className="flex items-center gap-5 pb-5 border-b border-slate-200">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl font-bold text-white shadow-lg ring-4 ring-white">
            {student?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1.5 border-2 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">
            {student?.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
              <path d="M4 4v16h16V4H4z"/>
              <path d="M8 9h8"/>
              <path d="M8 13h6"/>
              <path d="M8 17h4"/>
            </svg>
            <p className="text-sm font-medium text-slate-600">
              Roll No: <span className="text-slate-900">{student?.rollNumber || "N/A"}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mt-5 pb-5 border-b border-slate-200">
        <div className="text-center p-2 rounded-xl bg-blue-50">
          <p className="text-xs text-blue-600 font-medium">CGPA</p>
          <p className="text-lg font-bold text-blue-700">{student?.cgpa || "8.7"}</p>
        </div>
        <div className="text-center p-2 rounded-xl bg-emerald-50">
          <p className="text-xs text-emerald-600 font-medium">Attendance</p>
          <p className="text-lg font-bold text-emerald-700">{student?.attendancePercentage || "86"}%</p>
        </div>
        <div className="text-center p-2 rounded-xl bg-amber-50">
          <p className="text-xs text-amber-600 font-medium">Semester</p>
          <p className="text-lg font-bold text-amber-700">{student?.semester || "3rd"}</p>
        </div>
      </div>

      {/* Contact details grid */}
      <div className="grid gap-3 mt-5">
        <div className="group flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-10 7L2 7"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-400 uppercase tracking-wide">Email Address</p>
            <p className="text-sm font-semibold text-slate-800 break-all">
              {student?.email}
            </p>
          </div>
        </div>

        <div className="group flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-400 uppercase tracking-wide">Phone Number</p>
            <p className="text-sm font-semibold text-slate-800">
              {student?.phoneNumber || "Not provided"}
            </p>
          </div>
        </div>

        <div className="group flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-400 uppercase tracking-wide">Course</p>
            <p className="text-sm font-semibold text-slate-800">
              {student?.department || "BTech Computer Science"} • Semester {student?.semester || "3rd"}
            </p>
          </div>
        </div>

        {student?.address && (
          <div className="group flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-400 uppercase tracking-wide">Address</p>
              <p className="text-sm font-semibold text-slate-800">
                {student?.address}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick action badge */}
      <div className="mt-5 pt-3 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  </div>
</section>

            <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Notices & Announcements
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Stay updated with important announcements.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {notices.map((notice) => (
                  <div
                    key={notice.title}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {notice.title}
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                          {notice.subtitle}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${notice.color}`}
                      >
                        {notice.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Fee Details
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Pending and paid fee summary by semester.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {feeDetails.map((fee) => (
                  <div
                    key={fee.semester}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">
                          {fee.semester}
                        </p>
                        <p className="text-sm text-slate-500">
                          Total Fees: {fee.total}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${fee.statusClass}`}
                      >
                        {fee.status}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                        <p className="text-slate-500">Paid</p>
                        <p className="mt-1 font-semibold text-emerald-600">
                          {fee.paid}
                        </p>
                      </div>
                      <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                        <p className="text-slate-500">Pending</p>
                        <p className="mt-1 font-semibold text-rose-600">
                          {fee.pending}
                        </p>
                      </div>
                      <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                        <p className="text-slate-500">Due Date</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {fee.due}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Recent Activity
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Latest student updates and actions.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.title}
                    className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div
                      className={`${activity.iconColor} grid h-11 w-11 place-items-center rounded-2xl text-lg`}
                    >
                      {activity.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {activity.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {activity.description}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
