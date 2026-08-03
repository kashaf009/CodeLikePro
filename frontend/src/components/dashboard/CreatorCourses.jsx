import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { FiEdit } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";

const CreatorCourses = () => {
  const navigate = useNavigate();
  const [courses, setcourses] = useState([]);

  const getCourses = async () => {
    // api call to get courses for the creator
    const res = await axios.get(BASE_URL + "/MyCourses", {
      withCredentials: true,
    });
    console.log(res?.data?.data);
    setcourses(res?.data?.data || []);
  };

  useEffect(() => {
    // fetch courses for the creator
    getCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 lg:px-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-500 text-cyan-400 hover:text-cyan-300 transition cursor-pointer shrink-0"
            aria-label="Go back"
          >
            <IoChevronBack size={22} />
          </button>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Your Courses</h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage and create your published courses
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard/create-course")}
          className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 md:px-5 py-2.5 rounded-xl font-semibold transition cursor-pointer"
        >
          <AiOutlinePlus size={18} />
          Create Course
        </button>
      </div>

      {/* Mobile / Tablet: Card Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 md:hidden">
        {courses.length === 0 && (
          <div className="sm:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-10 text-center text-slate-400">
            No courses yet. Click "Create Course" to get started.
          </div>
        )}

        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500 transition-all duration-300"
          >
            <div className="aspect-video overflow-hidden bg-slate-700">
              {course?.thumbnail ? (
                <img
                  src={course?.thumbnail}
                  alt="Course Thumbnail"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                  No thumbnail
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-lg leading-snug line-clamp-2">
                  {course.title}
                </h3>

                <span
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                    course.ispublished == true
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {course.ispublished == true ? "Published" : "Draft"}
                </span>
              </div>

              <button
                onClick={() =>
                  navigate(`/dashboard/create-course/edit/${course._id}`)
                }
                className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-cyan-600/20 hover:text-cyan-300 py-2.5 rounded-lg font-medium transition cursor-pointer"
              >
                <FiEdit size={16} />
                Edit Course
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block mt-8 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-slate-700/50 text-left text-slate-300">
                <th className="px-5 py-4 font-semibold">Thumbnail</th>
                <th className="px-5 py-4 font-semibold">Course Title</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-5 py-12 text-center text-slate-400">
                    No courses yet. Click "Create Course" to get started.
                  </td>
                </tr>
              )}

              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-t border-slate-700 hover:bg-slate-700/30 transition"
                >
                  <td className="px-5 py-4 w-48">
                    {course?.thumbnail ? (
                      <img
                        src={course?.thumbnail}
                        alt="Course Thumbnail"
                        className="w-40 h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-40 h-24 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 text-sm">
                        No thumbnail
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-bold text-lg">{course.title}</p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        course.ispublished == true
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {course.ispublished == true ? "Published" : "Draft"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() =>
                        navigate(
                          `/dashboard/create-course/edit/${course._id}`,
                        )
                      }
                      className="flex items-center gap-2 bg-slate-700 hover:bg-cyan-600/20 hover:text-cyan-300 px-4 py-2 rounded-lg font-medium transition cursor-pointer"
                    >
                      <FiEdit size={16} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreatorCourses;
