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
    <div className="p-4 px-30 relative pt-30 bg-slate-950 min-h-screen text-white">
      <IoChevronBack onClick={()=>navigate("/dashboard/courses")} className="absolute hover:text-cyan-500 cursor-pointer top-37 w-8 h-8 left-60" />
      {state == 1 && (
        <div className="pt-10 px-10 pb-15 rounded-2xl flex mx-auto w-[50%] bg-slate-800 flex-col  mt-5">
          {/* label for course title and category */}
          <h1 className="text-3xl font-['ibm_plex_mono'] mb-10  text-center font-bold ">
            Create Course
          </h1>
          <label htmlFor="course-title" className="font-medium  mb-2">
            Course Title
          </label>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
            <input
              type="text"
              ref={titleRef}
              onChange={() => setError(null)}
              id="course-title"
              placeholder="Course Title"
              className="border mb-5 border-gray-700 px-4 py-2 rounded-md bg-slate-800 text-white"
            />

            <label htmlFor="category" className="font-medium mb-2">
              Category
            </label>

            {/* category ["web development","mobile development","data science","artificial intelligence","cloud computing","cyber security","agentic ai","other","machine learning","data analysis"] */}
            <select
              ref={categoryRef}
              onChange={() => setError(null)}
              id="category"
              className={`border border-gray-700 px-4 py-2 rounded-md bg-slate-800 text-white ${Error ? "mb-5" : "mb-8"}`}
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
              className="bg-blue-900 cursor-pointer font-['ibm_plex_mono'] hover:bg-blue-700 px-4 py-2 rounded-md text-white"
            >
              {loading ? (
                <>
                  <ImSpinner2 className="animate-spin mx-auto text-md  justify-center " />
                </>
              ) : (
                "Create"
              )}
            </button>
          </form>
        </div>
      )}

      {state == 2 && (
        <div className="pt-10 px-10 pb-10 rounded-2xl justify-center items-center flex mx-auto w-[50%] bg-slate-800 flex-col  mt-5">
          <h1 className="text-2xl mb-5 text-center font-['ibm_plex_mono'] tracking-tight font-bold">
            Course created successfully
          </h1>
          <IoCheckmarkDoneCircle className="w-40 mb-3 fill-green-500 h-40 " />
          <div
            onClick={() => navigate("/dashboard/courses")}
            className="bg-blue-900 hover:bg-blue-700 cursor-pointer rounded-md px-3 py-1"
          >
            <p className="font-['ibm_plex_mono']">Back to creator page</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;
