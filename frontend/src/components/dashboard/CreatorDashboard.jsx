import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  MdDashboard,
  MdOutlineAnalytics,
  MdSettings,
  MdNotificationsNone,
  MdArrowBackIos,
} from "react-icons/md";

import {
  AiOutlineProduct,
  AiOutlineUsergroupAdd,
  AiOutlineDollarCircle,
} from "react-icons/ai";

import {
  FiSearch,
  FiPlusCircle,
  FiTrendingUp,
} from "react-icons/fi";

const CreatorDashboard = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex">

      <div onClick={()=>navigate("/")} className="absolute text-xl top-7.5  left-7 hover:text-cyan-400 text-cyan-600 cursor-pointer"> <MdArrowBackIos/></div>

      {/* Sidebar */}
      <aside className="w-72 bg-[#111827] border-r border-slate-800 p-6 flex flex-col">

        <h1 className="text-2xl pl-8 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Creator Studio
        </h1>

        <div className="mt-12 space-y-2">

          <button className="flex items-center gap-3 w-full p-4 rounded-xl bg-cyan-500/10 text-cyan-400">
            <MdDashboard size={22} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/dashboard/courses")}
            className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-slate-800 transition"
          >
            <AiOutlineProduct size={22} />
            Courses
          </button>

          <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-slate-800 transition">
            <AiOutlineUsergroupAdd size={22} />
            Students
          </button>

          <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-slate-800 transition">
            <MdOutlineAnalytics size={22} />
            Analytics
          </button>

          <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-slate-800 transition">
            <MdSettings size={22} />
            Settings
          </button>

        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">

        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-10">

          <div className="relative w-[450px]">

            <FiSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 py-3 outline-none focus:border-cyan-500"
            />

          </div>

          <div className="flex items-center gap-5">

            <button className="relative bg-slate-900 p-3 rounded-xl">
              <MdNotificationsNone size={25} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <img
              src={user.photoUrl}
              alt=""
              className="w-12 h-12 rounded-full border-2 border-cyan-500"
            />

          </div>

        </div>

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/20 rounded-3xl p-8 mb-8">

          <h1 className="text-4xl font-bold">
            Welcome Back, {user.name} 👋
          </h1>

          <p className="text-slate-300 mt-3 text-lg">
            Manage courses, track students, monitor revenue
            and grow your creator business.
          </p>

        </div>

        {/* Stats */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition-all duration-300"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-400">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div className="text-4xl text-cyan-400">
                  {item.icon}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Analytics + Actions */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          {/* Chart Area */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <h2 className="text-xl font-semibold mb-6">
              Revenue Analytics
            </h2>

            <div className="h-[300px] rounded-xl bg-slate-800 flex items-center justify-center">
              Chart Component Here
            </div>

          </div>

          {/* Actions */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <h2 className="text-xl font-semibold mb-6">
              Quick Actions
            </h2>

            <div className="space-y-4">

              <button
                onClick={() =>
                  navigate("/dashboard/create-course")
                }
                className="w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-xl font-semibold flex justify-center items-center gap-2"
              >
                <FiPlusCircle />
                Create Course
              </button>

              <button
                onClick={() =>
                  navigate("/dashboard/courses")
                }
                className="w-full bg-slate-800 hover:bg-slate-700 py-4 rounded-xl"
              >
                Manage Courses
              </button>

              <button className="w-full bg-slate-800 hover:bg-slate-700 py-4 rounded-xl">
                View Students
              </button>

            </div>

          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Recent Activity
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">
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
  );
};

export default CreatorDashboard;