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
    <div className="p-4 relative px-30 pb-30 pt-15 bg-slate-900 min-h-screen text-white">
      <IoChevronBack onClick={()=>navigate("/dashboard")} className="absolute hover:text-cyan-500 cursor-pointer top-16 w-8 h-8 left-8" />

      <div
        onClick={() => navigate("/dashboard/create-course")}
        className="absolute text-white text-xl flex items-center cursor-pointer hover:bg-cyan-700 gap-2 bg-cyan-600 px-3 rounded-md py-1  top-16 right-31"
      >
        <div>
          <AiOutlinePlus className="text-md" />
        </div>
        <p> Create course</p>
      </div>

      <h1 className="text-3xl font-bold mb-1">Your Courses</h1>
      <table className="w-full   border border-gray-700 mt-10">
        <thead>
          <tr>
            <th className="border border-gray-700 px-4 py-2">thumbnail</th>
            <th className="border border-gray-700 px-4 py-2">Course Title</th>
            <th className="border border-gray-700 px-4 py-2">Status</th>
            <th className="border border-gray-700 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td className="border border-gray-700 w-1/4 px-4 py-2">
                <img
                  src={course?.thumbnail}
                  alt="Course Thumbnail"
                  className=" w-full h-full px-3 py-2  object-cover"
                />
              </td>
              <td className="border  border-gray-700 pl-10 pr-5  text-2xl font-bold py-2">
                {course.title}
              </td>
              <td
                className={`border border-gray-700 z-10 text-center text-black  px-4 py-2 ${course.ispublished == true ? "text-green-500" : "text-red-400"}`}
              >
                {course.ispublished == true ? "published" : "draft"}
              </td>
              <td className="border  border-gray-700 px-4 py-2">
                <div className="w-full flex">
                  <FiEdit
                    onClick={() => navigate(`/dashboard/create-course/edit/${course._id}`)}
                    className="mx-auto hover:text-blue-300 cursor-pointer "
                  />
                </div>
              </td>
            </tr>
          ))}
          {/* Add more courses as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default CreatorCourses;
