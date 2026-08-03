import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { addLecture } from "../../utils/lectureSlice";
import { IoIosAdd, IoIosArrowRoundBack } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";
import { TbEdit } from "react-icons/tb";

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
    lectureData && (
      <div className="min-h-screen flex justify-center bg-slate-900 px-4 py-8 md:py-12">
        <div className="w-full max-w-2xl rounded-2xl bg-slate-800 border border-slate-700 shadow-xl px-5 md:px-8 pt-8 pb-10 h-fit">
          {/* Header with back button */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() =>
                navigate(`/dashboard/create-course/edit/${courseId}`)
              }
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-700 border border-slate-600 hover:border-indigo-400 text-white transition cursor-pointer shrink-0"
              aria-label="Go back"
            >
              <IoIosArrowRoundBack size={26} />
            </button>

            <h2 className="text-white text-2xl md:text-3xl font-bold">
              Create Lecture
            </h2>
          </div>

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
              className="w-full rounded-lg border border-slate-600 bg-slate-700 text-white px-4 py-3 outline-none placeholder:text-gray-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          {error && <p className="text-red-400 mb-3">{error}</p>}

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 mb-10">
            <button
              onClick={() =>
                navigate(`/dashboard/create-course/edit/${courseId}`)
              }
              className="w-full sm:w-[30%] rounded-lg bg-slate-700 hover:bg-slate-600 py-3 text-white font-semibold transition cursor-pointer"
            >
              <p className="flex items-center justify-center gap-1">
                <IoIosArrowRoundBack className="text-2xl" /> <span>Back</span>
              </p>
            </button>

            <button
              onClick={HandleAddLecture}
              disabled={loading}
              className="w-full sm:w-[70%] rounded-lg bg-blue-600 hover:bg-blue-700 py-3 text-white font-semibold transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <p className="flex items-center gap-1 justify-center">
                <IoIosAdd className={loading ? `hidden` : `text-2xl`} />
                {loading ? (
                  <ImSpinner2 className="animate-spin mx-auto text-2xl" />
                ) : (
                  "Add Lecture"
                )}
              </p>
            </button>
          </div>

          {/* Lecture list */}
          <div className="mb-4">
            <h3 className="text-gray-200 font-semibold text-lg mb-4">
              Lectures in this course
              <span className="text-gray-400 font-normal text-sm ml-2">
                ({lectureData.length})
              </span>
            </h3>

            {lectureData.length === 0 ? (
              <div className="w-full rounded-xl border border-dashed border-slate-600 bg-slate-900/50 p-8 text-center text-gray-400 text-sm">
                No lectures yet. Add your first lecture above.
              </div>
            ) : (
              <div className="space-y-3">
                {lectureData.map((lec, index) => {
                  return (
                    <div
                      className="w-full px-4 justify-between items-center gap-2 flex py-3 rounded-xl bg-slate-700/50 border border-slate-600 hover:border-indigo-400 hover:bg-slate-700/80 transition"
                      key={lec._id}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-slate-600 text-gray-300 text-xs font-semibold">
                          {index + 1}
                        </span>
                        <CiVideoOn className="w-5 h-5 shrink-0 text-indigo-300" />
                        <p className="text-sm font-medium text-gray-100 truncate">
                          {lec.lectureTitle}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/create-course/edit/${courseId}/${lec._id}`,
                          )
                        }
                        className="flex items-center gap-1.5 shrink-0 bg-slate-600 hover:bg-indigo-600 text-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
                      >
                        <TbEdit className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default CreateLecture;
