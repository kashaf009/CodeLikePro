import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { addLecture } from "../../utils/lectureSlice";

const CreateLecture = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [lectureTitle, setlectureTitle] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const { lectureData } = useSelector((store) => store.lecture);

  const HandleAddLecture = async () => {
    if (!lectureTitle) {
      seterror("Please enter leacture title");
      return;
    }
    seterror("");
    setloading(true);
    try {
      const res = await axios.post(
        BASE_URL + `/createLecture/${courseId}`,
        { lectureTitle: lectureTitle },
        { withCredentials: true },
      );

      console.log(res?.data);
      dispatch(addLecture([...lectureData, res?.data?.lecture]));
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await axios.get(
          BASE_URL + `/getCourseLectures/${courseId}`,
          { withCredentials: true },
        );
        console.log(res?.data?.course);
        dispatch(addLecture(res?.data?.course?.lectures));
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    };

    fetchCourseData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-slate-800 p-8 shadow-xl">
        <h2 className="mb-6 text-center text-white text-3xl font-bold ">
          Create Lecture
        </h2>

        <div className="mb-6">
          <label
            htmlFor="lectureTitle"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Lecture Title
          </label>

          <input
            id="lectureTitle"
            onChange={(e) => setlectureTitle(e.target.value)}
            type="text"
            placeholder="Enter lecture title"
            className="w-full rounded-lg border border-gray-200 text-white px-4 py-3 outline-none placeholder:text-gray-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        {error && <p className="text-red-500 mb-2 mt-2">{error}</p>}

        <button
          onClick={HandleAddLecture}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold transition hover:bg-blue-700"
        >
          {loading ? (
            <ImSpinner2 className="animate-spin mx-auto text-2xl " />
          ) : (
            "Add Lecture"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateLecture;
