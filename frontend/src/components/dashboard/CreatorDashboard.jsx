import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  MdDashboard,
  MdOutlineAnalytics,
  MdSettings,
  MdArrowBackIos,
  MdMenu,
  MdClose,
} from "react-icons/md";

import {
  AiOutlineProduct,
  AiOutlineUsergroupAdd,
  AiOutlineDollarCircle,
} from "react-icons/ai";

import {
  FiPlusCircle,
  FiTrendingUp,
} from "react-icons/fi";

const CreatorDashboard = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  const stats = [
    {
      title: "Courses",
      value: "12",
      icon: <AiOutlineProduct />,
    },
    {
      title: "Students",
      value: "1,245",
      icon: <AiOutlineUsergroupAdd />,
    },
    {
      title: "Revenue",
      value: "$12.5K",
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: "Growth",
      value: "+18%",
      icon: <FiTrendingUp />,
    },
  ];

  const navItems = [
    {
      label: "Dashboard",
      icon: <MdDashboard size={22} />,
      active: true,
      onClick: () => navigate("/dashboard"),
    },
    {
      label: "Courses",
      icon: <AiOutlineProduct size={22} />,
      active: false,
      onClick: () => navigate("/dashboard/courses"),
    },
    {
      label: "Students",
      icon: <AiOutlineUsergroupAdd size={22} />,
      active: false,
      onClick: () => {},
    },
    {
      label: "Analytics",
      icon: <MdOutlineAnalytics size={22} />,
      active: false,
      onClick: () => {},
    },
    {
      label: "Settings",
      icon: <MdSettings size={22} />,
      active: false,
      onClick: () => {},
    },
  ];

  const renderNav = (items) =>
    items.map((item, index) => (
      <button
        key={index}
        onClick={() => {
          item.onClick();
          setMenuOpen(false);
        }}
        className={`flex items-center gap-3 w-full p-4 rounded-xl transition ${
          item.active
            ? "bg-cyan-500/10 text-cyan-400"
            : "hover:bg-slate-800 text-gray-300"
        }`}
      >
        {item.icon}
        {item.label}
      </button>
    ));

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Back to home */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 lg:top-6 lg:left-2 z-30 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur border border-slate-800 hover:border-cyan-500 text-cyan-500 hover:text-cyan-300 rounded-xl px-3 py-2 text-sm font-medium transition"
      >
        <MdArrowBackIos size={14} />
      </button>

      <div className="flex min-h-screen">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:flex w-72 bg-[#111827] border-r border-slate-800 p-6 flex-col shrink-0">
          <h1 className="text-2xl pl-8 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Creator Studio
          </h1>

          <div className="mt-12 space-y-2">{renderNav(navItems)}</div>
        </aside>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMenuOpen(false)}
            />
            <aside className="absolute left-0 top-0 h-full w-72 bg-[#111827] border-r border-slate-800 p-6 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Creator Studio
                </h1>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <MdClose size={26} />
                </button>
              </div>

              <div className="mt-10 space-y-2">{renderNav(navItems)}</div>
            </aside>
          </div>
        )}

        {/* Main */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 min-w-0">
          {/* Mobile top bar with menu on the right */}
          <div className="flex justify-end mb-6 lg:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-gray-300 hover:text-white transition"
              aria-label="Open menu"
            >
              <MdMenu size={22} />
            </button>
          </div>

          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/20 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Welcome Back, {user.name} 👋
            </h1>

            <p className="text-slate-300 mt-3 text-sm md:text-lg">
              Manage courses, track students, monitor revenue
              and grow your creator business.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 hover:border-cyan-500 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400">{item.title}</p>

                    <h2 className="text-2xl md:text-3xl font-bold mt-2">
                      {item.value}
                    </h2>
                  </div>

                  <div className="text-3xl md:text-4xl text-cyan-400">
                    {item.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Analytics + Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-6">
                Revenue Analytics
              </h2>

              <div className="h-[220px] md:h-[300px] rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                Chart Component Here
              </div>
            </div>

            {/* Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">
                <button
                  onClick={() => navigate("/dashboard/create-course")}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 md:py-4 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
                >
                  <FiPlusCircle />
                  Create Course
                </button>

                <button
                  onClick={() => navigate("/dashboard/courses")}
                  className="w-full bg-slate-800 hover:bg-slate-700 py-3 md:py-4 rounded-xl transition"
                >
                  Manage Courses
                </button>

                <button className="w-full bg-slate-800 hover:bg-slate-700 py-3 md:py-4 rounded-xl transition">
                  View Students
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-6">
              Recent Activity
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="text-left border-b border-slate-800">
                    <th className="pb-4">Student</th>
                    <th className="pb-4">Course</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-4">No Activity Yet</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatorDashboard;
