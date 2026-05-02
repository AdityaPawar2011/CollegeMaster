export default function Timetable() {
  const timetable = [
    {
      day: "Monday",
      classes: [
        { time: "9:00 - 10:00", subject: "Data Structures", room: "A-101" },
        { time: "10:15 - 11:15", subject: "Lab (DS)", room: "L-201" },
        { time: "12:00 - 1:00", subject: "Database Management", room: "A-102" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { time: "9:00 - 10:00", subject: "Operating Systems", room: "A-103" },
        { time: "10:15 - 11:15", subject: "Computer Networks", room: "A-104" },
        { time: "2:00 - 3:00", subject: "Web Development", room: "L-202" },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { time: "9:00 - 10:00", subject: "Database Management", room: "A-102" },
        { time: "11:00 - 12:00", subject: "Lab (Database)", room: "L-203" },
        { time: "2:00 - 3:00", subject: "Data Structures", room: "A-101" },
      ],
    },
    {
      day: "Thursday",
      classes: [
        { time: "9:00 - 10:00", subject: "Computer Networks", room: "A-104" },
        { time: "10:15 - 11:15", subject: "Web Development", room: "A-105" },
        { time: "12:00 - 1:00", subject: "Operating Systems", room: "A-103" },
      ],
    },
    {
      day: "Friday",
      classes: [
        { time: "9:00 - 10:00", subject: "Lab (Networks)", room: "L-204" },
        { time: "10:15 - 12:15", subject: "Seminar", room: "A-106" },
      ],
    },
  ];

  const colors = {
    "Data Structures": "bg-blue-100 border-blue-300",
    "Operating Systems": "bg-purple-100 border-purple-300",
    "Database Management": "bg-green-100 border-green-300",
    "Computer Networks": "bg-orange-100 border-orange-300",
    "Web Development": "bg-pink-100 border-pink-300",
    "Lab (DS)": "bg-cyan-100 border-cyan-300",
    "Lab (Database)": "bg-lime-100 border-lime-300",
    "Lab (Networks)": "bg-indigo-100 border-indigo-300",
    Seminar: "bg-yellow-100 border-yellow-300",
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Schedule
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Class Timetable
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {timetable.map((day, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                {day.day}
              </h2>
              <div className="space-y-3">
                {day.classes.map((cls, cidx) => (
                  <div
                    key={cidx}
                    className={`p-4 rounded-2xl border-2 ${
                      colors[cls.subject] || "bg-slate-100 border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {cls.subject}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          {cls.time}
                        </p>
                      </div>
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-white border border-slate-200">
                        {cls.room}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
