import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
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

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden py-16 flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-lg bg-white rounded-[20px] shadow-[0_35px_120px_rgba(15,23,42,0.12)] p-10 sm:p-8 max-h-[calc(100vh-5rem)] overflow-y-auto hide-scrollbar">
        <h2 className="text-4xl font-semibold text-center mb-2 text-slate-900">
          Welcome Back
        </h2>
        <p className="text-center text-slate-600 mb-8">
          Login to your student account
        </p>

        {error && (
          <div className="mb-4 mt-3 h-9 px-5 bg-red-100 text-red-700 rounded-[9px] text-sm flex items-center shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full flex flex-col gap-2 mt-5 ">
            <label className="text-left text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-10 px-5 border border-slate-300 rounded-[9px] bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition shadow-sm"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-left text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-10 px-5 border border-slate-300 rounded-[9px] bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition shadow-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-blue-600  mb-5 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-[10px] transition duration-200 flex items-center justify-center shadow-md"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin mr-2">⏳</span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-slate-600 ">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
