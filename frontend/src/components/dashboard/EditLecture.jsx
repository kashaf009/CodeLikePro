import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { ImSpinner2 } from "react-icons/im";
import { addLecture } from "../../utils/lectureSlice";
import {
  IoArrowBackOutline,
  IoCheckmarkDoneCircleOutline,
  IoChevronBack,
} from "react-icons/io5";

const EditLecture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, lectureId } = useParams();
  const { lectureData } = useSelector((store) => store.lecture);
  const [state, setstate] = useState(1);
  const selectedLecture = lectureData.find(
    (lecture) => lecture._id === lectureId,
  );

  const [loading, setloading] = useState(false);
  const [lectureTitle, setlectureTitle] = useState(
    selectedLecture.lectureTitle,
  );
  const [Video, setVideo] = useState("");
  const [Error, setError] = useState("");
  const [isPreviewFree, setisPreviewFree] = useState(
    selectedLecture.isPreviewFree || false,
  );

  const handleVideoUpload = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleEdit = async () => {
    setloading(true);
    try {
      const formData = new FormData();
      formData.append("lectureTitle", lectureTitle);
      formData.append("isPreviewFree", isPreviewFree);
      if (Video) {
        formData.append("video", Video);
      }

      const res = await axios.patch(
        BASE_URL + `/editLecture/${lectureId}`,
        formData,
        { withCredentials: true },
      );

      setstate(2);
      setTimeout(() => {
        navigate(`/dashboard/create-course/edit/createLecture/${courseId}`);
      }, 4000);

      dispatch(addLecture([...lectureData, res?.data?.data]));

      console.log("updated successfully");
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setloading(false);
    }

    //
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center px-4 py-10">
      {state === 1 && (
        <div className="w-full max-w-xl bg-slate-800 border border-slate-700 rounded-2xl px-5 md:px-8 py-8 flex flex-col shadow-xl">
          {/* Header with back button */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() =>
                navigate(
                  `/dashboard/create-course/edit/createLecture/${courseId}`,
                )
              }
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-700 border border-slate-600 hover:border-blue-400 text-white transition cursor-pointer shrink-0"
              aria-label="Go back"
            >
              <IoChevronBack size={22} />
            </button>

            <h1 className="text-white text-2xl font-bold">
              Edit Lecture
            </h1>
          </div>

          <label className="text-gray-200 mb-2" htmlFor="title">
            Title*
          </label>
          <input
            className="border py-2.5 mb-5 px-3 text-gray-200 rounded-lg border-slate-600 bg-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition"
            type="text"
            value={lectureTitle}
            onChange={(e) => setlectureTitle(e.target.value)}
            name=""
            id="title"
          />

          <label className="text-md text-gray-200 mb-2" htmlFor="video">
            Upload video*
          </label>
          <input
            className="mb-4 text-gray-200 border px-3 hover:bg-slate-600 bg-slate-500 py-2 rounded-lg border-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-700 file:px-3 file:py-1.5 file:text-sm file:text-gray-100 transition cursor-pointer"
            type="file"
            onChange={handleVideoUpload}
            accept="video/*"
            name=""
            id="vidoe"
          />
          <div className="flex items-center gap-2 mb-6">
            <input
              value={isPreviewFree}
              onChange={(e) => setisPreviewFree(e.target.checked)}
              type="checkbox"
              name=""
              id="preview"
              className="w-4 h-4 accent-blue-600"
            />
            <label htmlFor="preview" className="text-gray-200">
              Free Preview
            </label>
          </div>

          {Error && <p className="text-red-400 mb-4">{Error}</p>}

          <button
            onClick={handleEdit}
            className="w-full cursor-pointer py-3 hover:bg-blue-600 rounded-lg bg-blue-500 font-medium transition disabled:opacity-60"
          >
            <span className="text-center text-white">
              {loading ? (
                <ImSpinner2 className="animate-spin mx-auto text-xl" />
              ) : (
                "Update lecture"
              )}
            </span>
          </button>
        </div>
      )}

      {state === 2 && (
        <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl px-6 md:px-8 py-8 flex flex-col shadow-xl">
          <p className="text-2xl text-center mb-3 text-gray-200 font-medium">
            Course Updated Successfully
          </p>
          <IoCheckmarkDoneCircleOutline className="w-32 md:w-40 mb-5 animate-pulse text-green-500 mx-auto h-32 md:h-40" />

          <button
            onClick={() =>
              navigate(
                `/dashboard/create-course/edit/createLecture/${courseId}`,
              )
            }
            className="bg-gray-200 rounded-md w-full md:w-[60%] cursor-pointer hover:bg-gray-300 flex gap-2 items-center justify-center mx-auto py-2 transition"
          >
            <IoArrowBackOutline className="text-md" />
            <span className="text-xl">Back</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EditLecture;
