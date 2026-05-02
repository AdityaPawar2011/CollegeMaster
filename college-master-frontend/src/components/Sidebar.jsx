import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { id: 1, label: "Dashboard", path: "/dashboard", icon: "◧" },
  { id: 2, label: "Attendance", path: "/attendance", icon: "📅" },
  { id: 3, label: "Marks & Results", path: "/marks", icon: "🎓" },
  { id: 4, label: "My Courses", path: "/courses", icon: "📚" },
  { id: 5, label: "Fees", path: "/fees", icon: "$" },
  { id: 6, label: "Timetable", path: "/timetable", icon: "⏰" },
  { id: 7, label: "Assignments", path: "/assignments", icon: "📋" },
  { id: 8, label: "Library", path: "/library", icon: "≡" },
  { id: 9, label: "Profile", path: "/profile", icon: "👤" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 shadow-sm flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-100">
  <p className="text-xl font-bold text-blue-600 text-left">College Master</p>
  <p className="text-xs text-slate-800 mt-1 font-normal text-left">
    Student Portal
  </p>
</div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition duration-200 text-left ${
              isActive(item.path)
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-slate-800 hover:bg-slate-50 font-normal"
            }`}
          >
            <span className="text-lg w-5 flex items-center">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm font-medium hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
