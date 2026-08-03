import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants.js";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { IoCheckmarkDoneCircle, IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [Error, setError] = useState(null);
  const [state, setstate] = useState(1);

  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const userId = user.id;

  const handleCreateCourse = async () => {
    setError(null);
    try {
      if (!titleRef || !categoryRef) {
        setError("all fields required");
      }
      setloading(true);
      const res = await axios.post(
        BASE_URL + "/createCourse",
        {
          title: titleRef.current.value,
          category: categoryRef.current.value,
          userId: userId,
        },
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        setstate(2);
      }

      console.log("course created successfully");
    } catch (error) {
      console.log(error.message || "something went wrong");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      {state == 1 && (
        <div className="max-w-xl mx-auto mt-4 md:mt-8">
          {/* Header with back button */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate("/dashboard/courses")}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-500 text-cyan-400 hover:text-cyan-300 transition cursor-pointer shrink-0"
              aria-label="Go back"
            >
              <IoChevronBack size={22} />
            </button>

            <div>
              <h1 className="text-2xl md:text-3xl font-['ibm_plex_mono'] font-bold">
                Create Course
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Add the basic details of your new course
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-800 border border-slate-700 p-5 md:p-10 shadow-xl">
            <label htmlFor="course-title" className="font-medium mb-2 block">
              Course Title
            </label>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
              <input
                type="text"
                ref={titleRef}
                onChange={() => setError(null)}
                id="course-title"
                placeholder="Course Title"
                className="border mb-5 border-gray-700 px-4 py-3 rounded-lg bg-slate-800 text-white placeholder:text-slate-500 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
              />

              <label htmlFor="category" className="font-medium mb-2 block">
                Category
              </label>

              <select
                ref={categoryRef}
                onChange={() => setError(null)}
                id="category"
                className={`border border-gray-700 px-4 py-3 rounded-lg bg-slate-800 text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition ${
                  Error ? "mb-5" : "mb-8"
                }`}
              >
                <option value="">Select Category</option>
                <option value="web development">Web Development</option>
                <option value="mobile development">Mobile Development</option>
                <option value="data science">Data Science</option>
                <option value="artificial intelligence">
                  Artificial Intelligence
                </option>
                <option value="cloud computing">Cloud Computing</option>
                <option value="cyber security">Cyber Security</option>
                <option value="agentic ai">Agentic AI</option>
                <option value="machine learning">Machine Learning</option>
                <option value="data analysis">Data Analysis</option>
                <option value="other">Other</option>
              </select>

              {Error && <p className="text-red-500 text-md mb-2">{Error}</p>}

              <button
                onClick={handleCreateCourse}
                type="submit"
                className="bg-cyan-600 cursor-pointer font-['ibm_plex_mono'] hover:bg-cyan-700 px-4 py-3 rounded-lg text-white font-semibold transition"
              >
                {loading ? (
                  <ImSpinner2 className="animate-spin mx-auto text-md justify-center" />
                ) : (
                  "Create"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {state == 2 && (
        <div className="w-full max-w-md mx-auto mt-8 rounded-2xl bg-slate-800 border border-slate-700 justify-center items-center flex flex-col p-6 md:p-10 text-center shadow-xl">
          <h1 className="text-2xl mb-5 text-center font-['ibm_plex_mono'] tracking-tight font-bold">
            Course created successfully
          </h1>
          <IoCheckmarkDoneCircle className="w-32 h-32 md:w-40 md:h-40 mb-3 fill-green-500" />
          <div
            onClick={() => navigate("/dashboard/courses")}
            className="bg-blue-900 hover:bg-blue-700 cursor-pointer rounded-md px-4 py-2 transition"
          >
            <p className="font-['ibm_plex_mono']">Back to creator page</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;
