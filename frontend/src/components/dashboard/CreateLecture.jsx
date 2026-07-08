import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { addLecture } from "../../utils/lectureSlice";
import { IoIosAdd, IoIosArrowRoundBack } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";

const CreateLecture = () => {
  const navigate = useNavigate();
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
      setlectureTitle("");
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
    <div className="min-h-screen flex  justify-center bg-slate-900 px-4">
      <div className="w-full max-w-2xl mb-20 min-h-screen mt-20 rounded-2xl bg-slate-800 px-8 pt-10 shadow-xl">
        <h2 className="mb-6 text-center text-white text-3xl font-bold ">
          Create Lecture
        </h2>

        <div className={error ? `mb-3` : `mb-6`}>
          <label
            htmlFor="lectureTitle"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Lecture Title
          </label>

          <input
            id="lectureTitle"
            value={lectureTitle}
            onChange={(e) => setlectureTitle(e.target.value)}
            onClick={() => seterror(null)}
            type="text"
            placeholder="Enter lecture title"
            className="w-full rounded-lg border border-gray-200 text-white px-4 py-3 outline-none placeholder:text-gray-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="flex gap-4 mb-10 justify-between">
          <button
            onClick={() =>
              navigate(`/dashboard/create-course/edit/${courseId}`)
            }
            className="w-[30%] rounded-lg bg-gray-200 py-3 text-black font-semibold transition hover:bg-gray-400"
          >
            <p className="flex items-center justify-center gap-1">
              <IoIosArrowRoundBack className="text-2xl" /> <p>Back</p>
            </p>
          </button>

          <button
            onClick={HandleAddLecture}
            disabled={loading}
            className="w-[70%] rounded-lg bg-blue-600 py-3 text-white font-semibold transition hover:bg-blue-700"
          >
            <p className="flex items-center gap-1 justify-center">
              {" "}
              <IoIosAdd className={loading ? `hidden` : `text-2xl`} />{" "}
              {loading ? (
                <ImSpinner2 className="animate-spin mx-auto text-2xl " />
              ) : (
                "Add Lecture"
              )}
            </p>
          </button>
        </div>
        <div className="mb-10">
          {lectureData.map((lec, index) => {
            return (
              <div
                className="w-full px-3 items-center gap-2 flex mb-3 py-2 rounded-md bg-gray-200 "
                key={lec._id}
              >
                <p className="text-md mr-2 text-gray-500">{index + 1}</p>
                <CiVideoOn className="w-4 h-4" />
                <p className="text-sm font-medium">{lec.lectureTitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
