import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const savedStudent = JSON.parse(localStorage.getItem("ourclass"));
    let allStudents = JSON.parse(localStorage.getItem("students")) || [];

    // Add student only once
    if (
      savedStudent &&
      !allStudents.find((s) => s.email === savedStudent.email)
    ) {
      allStudents.push({
        ...savedStudent,
        name: savedStudent.email.split("@")[0],
        currentLesson: savedStudent.currentLesson || 1,
      });
      localStorage.setItem("students", JSON.stringify(allStudents));
    }

    setStudents(allStudents);
  }, []);

  const today = new Date();

  const activeStudents = students.filter(
    (s) => new Date(s.expiresAt) > today
  );
  const expiredStudents = students.filter(
    (s) => new Date(s.expiresAt) <= today
  );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          👨‍🍳 Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-2 sm:mt-0">
          Training Management Overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<FaUsers />}
          title="Total Students"
          value={students.length}
          color="blue"
        />
        <StatCard
          icon={<FaCheckCircle />}
          title="Active"
          value={activeStudents.length}
          color="green"
        />
        <StatCard
          icon={<FaTimesCircle />}
          title="Expired"
          value={expiredStudents.length}
          color="red"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-gray-700">
            Registered Students
          </h2>
        </div>

        {students.length === 0 ? (
          <p className="p-6 text-gray-600">
            No students have registered yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Lesson</th>
                  <th className="p-4 text-left">Expiry</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, i) => {
                  const isActive = new Date(s.expiresAt) > today;

                  return (
                    <tr
                      key={i}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-semibold text-gray-800">
                        {s.name}
                      </td>
                      <td className="p-4 text-gray-600">{s.email}</td>
                      <td className="p-4 font-medium">
                        Lesson {s.currentLesson}
                      </td>
                      <td className="p-4 text-gray-600">
                        {new Date(s.expiresAt).toDateString()}
                      </td>
                      <td className="p-4">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-semibold">
                            <FaCheckCircle /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 font-semibold">
                            <FaClock /> Expired
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

/* =======================
   Stat Card Component
======================= */
const StatCard = ({ icon, title, value, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4">
      <div
        className={`p-3 rounded-xl text-xl ${colors[color]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-extrabold text-gray-800">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default AdminDashboard;
