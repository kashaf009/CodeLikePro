import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { BASE_URL } from "../utils/constants";
import axios from "axios";

const ViewCourse = () => {
  const courses = useSelector((store) => store.course);
  console.log(courses);
  const [SelectedCourse, setSelectedCourse] = useState("");

  const {lectures} = SelectedCourse;

  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/Course/${courseId}`, {
          withCredentials: true,
        });

        setSelectedCourse(res?.data?.data);
        console.log(res?.data?.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCourse();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4">
      <div className="max-w-6xl border border-gray-700 mx-auto gap-8  bg-slate-900 text-white rounded-2xl mt-20 shadow-lg overflow-hidden md:flex">
        {/* Left Side */}
        <div key={SelectedCourse._id} className="">
          <img
            className="w-full m-5 rounded-xl h-100"
            src={SelectedCourse.thumbnail}
            alt={SelectedCourse.title}
          />
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl mt-8 font-bold text-gray-200">
              {SelectedCourse.title}
            </h1>

            <p className="text-3xl font-bold text-cyan-400 mt-4">
              ${SelectedCourse.price}
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
              Course Description
            </h2>

            <p className="text-gray-400 leading-7">
              {SelectedCourse.description}
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-700 cursor-pointer hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition">
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl border border-gray-700 mx-auto gap-8  bg-slate-900 text-white rounded-2xl mt-2 shadow-lg overflow-hidden md:flex">

        
      </div>
    </div>
  );
};

export default ViewCourse;
