import React from "react";
import { useSelector } from "react-redux";
import {} from "react-router-dom";

const Bootcaamps = () => {
  const courses = useSelector((store) => store.course);
  return (
    <div className=" py-10">
      <p className="text-4xl px-20 text-gray-200 mb-10  ">Bootcamps</p>

      <div className="grid pr-10 grid-cols-[18%_82%] ">
        <div className="text-white">kashaf</div>
        <div className="text-white grid grid-cols-3 gap-5">
          {courses.map((course) => {
            return (
              <section
                key={course?.id}
                className="bg-slate-800 mb-10 border-b flex flex-col justify-between hover:border-b-[#4f84c9] border-transparent  rounded-md min-h-110  transform transition-all duration-300 hover:scale-101"
              >
                <img
                  className="rounded-t-md w-full h-60 object-cover "
                  src={course?.thumbnail}
                  alt=""
                  srcset=""
                />

                <div className="flex items-center  mb-2 gap-5 pt-5 justify-between px-5">
                  <p className=" text-[#eef5fe] line-clamp-2 font-['space_grotesk'] font-bold text-3xl">
                    {course?.title}
                  </p>
                  <p className="text-cyan-500 text-xl ">$ {course?.price}</p>
                </div>
                <div className="mx-6 mb-4 ">
                  <p className="text-sm   text-[#c2c8d9] line-clamp-2">
                    {course?.description}
                  </p>
                </div>
                <div className="flex mx-8 items-center gap-4">
                  <p className="text-gray-400 border text-xs  bg-slate-900 rounded-3xl inline border-gray-600 py-1 px-3 ">
                    {course?.category}
                  </p>
                  <p className="text-gray-400 border  bg-slate-900 text-xs  rounded-3xl inline border-gray-600 py-1 px-3 ">
                    {course?.level}
                  </p>
                </div>

                
                <div className="px-10 mt-5 flex items-center justify-between mb-5">
                  <div className="px-5 py-1 cursor-pointer tracking-wide rounded-md bg-cyan-500 text-md">Enroll</div>
                  <div className="text-sm cursor-pointer text-cyan-500 ">View →</div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bootcaamps;
