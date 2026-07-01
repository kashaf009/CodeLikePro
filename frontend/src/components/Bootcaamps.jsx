import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Nav from "./Nav";

const Bootcaamps = () => {
  const courses = useSelector((store) => store.course);

  const [Category, setCategory] = useState([]);
  const [FilteredCourses, setFilteredCourses] = useState([]);
  const [SelectedLevel, setSelectedLevel] = useState("");
  // const [PriceRange, setPriceRange] = useState(5000)

  const toggleCategory = (e) => {
    if (Category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const ApplyFilter = () => {
    let CourseCopy = courses?.slice();

    if (Category.length > 0) {
      CourseCopy = CourseCopy.filter((c) => Category.includes(c.category));
    }

    if (SelectedLevel !== "") {
      CourseCopy = CourseCopy.filter((c) => c.level === SelectedLevel);
    }
    setFilteredCourses(CourseCopy);
  };

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  useEffect(() => {
    ApplyFilter();
  }, [Category, SelectedLevel, courses]);

  return (
    <div className="">
      <Nav />

      <div className=" pt-25 px-10 text-gray-200 mb-10 ">
        <h1 className="text-[3rem] font-bold text-white tracking-tight">
          Explore Bootcamps
        </h1>

        <p className="mt-3 text-gray-400 text-lg max-w-2xl">
          Discover industry-ready bootcamps designed to help you master
          in-demand skills and accelerate your career.
        </p>
      </div>

      <div className="grid pr-15 grid-cols-[18%_82%] gap-5  ">
        {/* left side */}
        <div className="text-white mx-3 px-7 sticky top-24 rounded-xl h-120 border border-gray-400 flex flex-col gap-3">
          <p className="pt-5 text-xl ">Filter</p>
          {/* category ["web development","mobile development","data science","artificial intelligence","cloud computing","cyber security","agentic ai","other","machine learning","data analysis"] */}

          <div className="flex pt-5 gap-3 w-40 justify-between">
            <p className="text-sm font-sans">Web development</p>
            <input
              className="text-white"
              type="checkbox"
              value={"web development"}
              name="web development"
              onChange={toggleCategory}
              id=""
            />
          </div>

          <div className="flex gap-3 w-40 justify-between">
            <p className="text-sm font-sans">Mobile development</p>
            <input
              className="text-white"
              type="checkbox"
              value={"mobile development"}
              onChange={toggleCategory}
              id=""
            />
          </div>

          <div className="flex gap-3 w-40 justify-between">
            <p className="text-sm font-sans">Cloud Computing</p>
            <input
              className="text-white"
              type="checkbox"
              onChange={toggleCategory}
              value={"cloud computing"}
              id=""
            />
          </div>

          <div className="flex gap-3 w-40 justify-between">
            <p className="text-sm font-sans">Data Science</p>
            <input
              className="text-white"
              type="checkbox"
              value={"data science"}
              onChange={toggleCategory}
              id=""
            />
          </div>

          <div className="flex gap-3 w-40 justify-between">
            <p className="text-sm font-sans">Artificial intelligence</p>
            <input
              className="text-white"
              type="checkbox"
              value={"artificial intelligence"}
              onChange={toggleCategory}
              id=""
            />
          </div>

          <div className="flex gap-3 w-40 justify-between">
            <p className="text-sm font-sans">Cyber security</p>
            <input
              className="text-white"
              type="checkbox"
              value={"cyber security"}
              onChange={toggleCategory}
              id=""
            />
          </div>

          <div className="flex gap-3 w-40 justify-between">
            <p className="text-sm font-sans">Agentic ai</p>
            <input
              className="text-white"
              type="checkbox"
              value={"agentic ai"}
              onChange={toggleCategory}
              id=""
            />
          </div>

          <div className="flex gap-3 w-40 justify-between">
            <p className="text-sm font-sans">Machine learning</p>
            <input
              className="text-white"
              type="checkbox"
              value={"machine learning"}
              onChange={toggleCategory}
              id=""
            />
          </div>

          <div className="flex gap-3 w-40 justify-between">
            <p className="text-sm font-sans">data analysis</p>
            <input
              className="text-white"
              type="checkbox"
              value={"data analysis"}
              onChange={toggleCategory}
              id=""
            />
          </div>

          <div>
            <label className="text-white text-md block mt-5 mb-3">Level</label>

            <select
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2 text-white"
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value={""}>All</option>
              <option value={"Begineer"}>Beginner</option>
              <option value={"Intermediate"}>Intermediate</option>
              <option value={"Advanced"}>Advanced</option>
            </select>
          </div>
        </div>

        {/* right side */}
        {FilteredCourses.length > 0 ? (
          <div className="text-white  grid grid-cols-3 gap-5">
            {FilteredCourses.map((course) => {
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
                    <p className=" text-[#eef5fe] line-clamp-2 font-['space_grotesk'] font-bold text-2xl">
                      {course?.title}
                    </p>
                    <p className="text-cyan-500 text-xl ">$ {course?.price}</p>
                  </div>
                  <div className="mx-6 mb-4 ">
                    <p className="text-sm   text-[#c2c8d9] line-clamp-2">
                      {course?.description}
                    </p>
                  </div>
                  <div className="flex mx-5 items-center gap-4">
                    <p className="text-gray-400 border text-xs  bg-slate-900 rounded-3xl inline border-gray-600 py-1 px-3 ">
                      {course?.category}
                    </p>
                    <p className="text-gray-400 border  bg-slate-900 text-xs  rounded-3xl inline border-gray-600 py-1 px-3 ">
                      {course?.level}
                    </p>
                  </div>

                  <div className="px-7 mt-5 flex items-center justify-between mb-5">
                    <div className="px-10 py-1 cursor-pointer tracking-wide rounded-md bg-cyan-500 text-md">
                      Enroll
                    </div>
                    <div className="text-sm cursor-pointer text-cyan-500 ">
                      View →
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className=" flex flex-col h-[50vh] justify-center text-center">
            <h2 className="text-3xl font-bold text-gray-300">
              No Courses Found
            </h2>

            <p className="mt-3 text-gray-500">
              Try changing the category or level filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bootcaamps;
