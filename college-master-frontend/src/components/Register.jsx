import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rollNumber: "",
    department: "",
    semester: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.rollNumber ||
      !formData.department ||
      !formData.semester
    ) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const registerData = { ...formData };
      delete registerData.confirmPassword;
      await register(registerData);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden py-16 flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-lg bg-white rounded-[20px] shadow-[0_35px_120px_rgba(15,23,42,0.12)] p-10 sm:p-8 max-h-[calc(100vh-5rem)] overflow-y-auto hide-scrollbar">
        <h2 className="text-4xl font-semibold text-center mb-2 text-slate-900">
          Create Account
        </h2>
        <p className="text-center text-slate-600 mb-8">
          Register to access student portal
        </p>

        {error && (
          <div className="mb-5 mt-3 h-9 px-5 bg-red-100 text-red-700 rounded-[9px] text-sm flex items-center shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full flex flex-col gap-2 mt-5">
            <label className="text-left text-sm font-medium text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full max-w-full h-10 px-5 border border-slate-300 rounded-[9px] bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition shadow-sm"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-left text-sm font-medium text-slate-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full max-w-full h-10 px-5 border border-slate-300 rounded-[9px] bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition shadow-sm"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-left text-sm font-medium text-slate-700">
              Roll Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="Enter your roll number"
              className="w-full max-w-full h-10 px-5 border border-slate-300 rounded-[9px] bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="w-full flex flex-col gap-2">
              <label className="text-left text-sm font-medium text-slate-700">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., CS, IT"
                className="w-full max-w-full h-10 px-5 border border-slate-300 rounded-[9px] bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition shadow-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-left text-sm font-medium text-slate-700">
                Semester <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="1-8"
                min="1"
                max="8"
                className="w-full max-w-full h-10 px-5 border border-slate-300 rounded-[9px] bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition shadow-sm"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-left text-sm font-medium text-slate-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full max-w-full h-10 px-5 border border-slate-300 rounded-[9px] bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition shadow-sm"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-left text-sm font-medium text-slate-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password (min 6 chars)"
              className="w-full max-w-full h-10 px-5 border border-slate-300 rounded-[9px] bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition shadow-sm"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-left text-sm font-medium text-slate-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full max-w-full h-10 px-5 border border-slate-300 rounded-[9px] bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition shadow-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-[9px] transition duration-200 flex items-center justify-center shadow-md"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin mr-2">⏳</span>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center text-slate-600 pt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
