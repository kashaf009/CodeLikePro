import { useRef } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants.js";
import axios from "axios";

const CreateCourse = () => {
  const user = useSelector((store) => store.user);

  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const userId = user.id;

 console.log("kashaf");
 
  const handleCreateCourse =async () => {
    try {
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

      console.log(res.data);


    } catch (error) {
      console.log(error.message);
    }
  };

  return ( 
    <div className="p-4 px-30  pt-15 bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl  text-center font-bold mb-1">Create Course</h1>

      <div className="pt-15 px-10 pb-15 rounded-2xl flex mx-auto w-[50%] bg-slate-800 flex-col  mt-5">
        {/* label for course title and category */}
        <label htmlFor="course-title" className="font-medium mb-2">
          Course Title
        </label>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
          <input
            type="text"
            ref={titleRef}
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
            id="category"
            className="border border-gray-700 px-4 mb-8 py-2 rounded-md bg-slate-800 text-white"
          >
            <option value="">Select Category</option>
            <option value="web-development">Web Development</option>
            <option value="mobile-development">Mobile Development</option>
            <option value="data-science">Data Science</option>
            <option value="artificial-intelligence">
              Artificial Intelligence
            </option>
            <option value="cloud-computing">Cloud Computing</option>
            <option value="cyber-security">Cyber Security</option>
            <option value="agentic-ai">Agentic AI</option>

            <option value="machine-learning">Machine Learning</option>
            <option value="data-analysis">Data Analysis</option>
            <option value="other">Other</option>
          </select>

          <button
            onClick={handleCreateCourse}
            type="submit"
            className="bg-blue-900 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
