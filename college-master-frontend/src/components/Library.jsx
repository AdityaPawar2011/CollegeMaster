export default function Library() {
  const books = [
    {
      id: 1,
      title: "Data Structures and Algorithms",
      author: "Cormen, Leiserson, Rivest",
      isbn: "978-0-262-03384-8",
      status: "Borrowed",
      dueDate: "May 15, 2026",
      copies: 3,
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0-13-235088-4",
      status: "Available",
      dueDate: null,
      copies: 5,
    },
    {
      id: 3,
      title: "Database System Concepts",
      author: "Abraham Silberschatz",
      isbn: "978-0-07-352332-3",
      status: "Available",
      dueDate: null,
      copies: 4,
    },
    {
      id: 4,
      title: "Computer Networks",
      author: "Andrew S. Tanenbaum",
      isbn: "978-0-13-359535-7",
      status: "Borrowed",
      dueDate: "May 20, 2026",
      copies: 2,
    },
    {
      id: 5,
      title: "The Pragmatic Programmer",
      author: "David Thomas, Andrew Hunt",
      isbn: "978-0-13-595705-9",
      status: "Available",
      dueDate: null,
      copies: 6,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Knowledge Hub
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Library System
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Available Books
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {books.map((book) => (
              <div
                key={book.id}
                className="p-5 rounded-2xl border-2 border-slate-200 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {book.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      by {book.author}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                      book.status === "Borrowed"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {book.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-slate-600 pt-3 border-t border-slate-100">
                  <p>
                    <span className="font-medium">ISBN:</span> {book.isbn}
                  </p>
                  <p>
                    <span className="font-medium">Copies Available:</span>{" "}
                    {book.copies}
                  </p>
                  {book.dueDate && (
                    <p className="text-orange-600 font-medium">
                      Due: {book.dueDate}
                    </p>
                  )}
                </div>

                <button className="mt-4 w-full px-3 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-200 text-sm font-medium hover:bg-blue-100 transition">
                  {book.status === "Borrowed" ? "Renew" : "Borrow"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
