import React, { createContext, useState, useContext, useEffect } from "react";
import { studentAPI } from "../services/studentAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if student is logged in on mount
  useEffect(() => {
    if (token) {
      fetchStudentProfile();
    }
  }, [token]);

  const fetchStudentProfile = async () => {
    try {
      setLoading(true);
      const response = await studentAPI.getProfile();
      setStudent(response.data.student);
    } catch (error) {
      console.error("Error fetching profile:", error);
      localStorage.removeItem("token");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await studentAPI.register(data);
      setToken(response.data.token);
      setStudent(response.data.student);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      setError(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await studentAPI.login({ email, password });
      setToken(response.data.token);
      setStudent(response.data.student);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed";
      setError(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await studentAPI.logout();
      setStudent(null);
      setToken(null);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await studentAPI.updateProfile(data);
      setStudent(response.data.student);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Update failed";
      setError(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    student,
    token,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
