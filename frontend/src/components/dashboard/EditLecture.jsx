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
    <div className="bg-slate-950 h-screen items-center flex justify-center">
      {state === 1 && (
        <div className="bg-slate-800  rounded-xl px-8 flex flex-col w-[50%]  ">
          <h1 className="text-center text-gray-200 pt-10 mb-4 font-bold text-2xl">
            Edit lecture
          </h1>
          <label className="text-gray-200 mb-2" htmlFor="title">
            Title*
          </label>
          <input
            className="border py-1 mb-5 px-3 text-gray-200 rounded-md border-gray-200"
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
            className="mb-4 text-gray-200 border px-3 hover:bg-slate-600 bg-slate-500 py-1 rounded-md border-gray-200"
            type="file"
            onChange={handleVideoUpload}
            accept="video/*"
            name=""
            id="vidoe"
          />
          <div className="flex gap-2 mb-5">
            <input
              value={isPreviewFree}
              onChange={(e) => setisPreviewFree(e.target.checked)}
              type="checkbox"
              name=""
              id="preview"
            />
            <label htmlFor="preview" className="text-gray-200">
              Free Preview
            </label>
          </div>

          {Error && <p>{Error}</p>}
          <div
            onClick={handleEdit}
            className="w-full mb-10 py-1 hover:bg-blue-600 rounded-md bg-blue-500"
          >
            <p className="text-center text-md text-white font-medium ">
              {loading ? (
                <ImSpinner2 className=" animate-spin  mx-auto   text-xl" />
              ) : (
                "Update lecture"
              )}
            </p>
          </div>
        </div>
      )}

      {state === 2 && (
        <div className="bg-slate-800   rounded-xl px-8 flex flex-col w-[40%]  ">
          <div className="px-5 pt-8 mb-10">
            <p className="text-2xl text-center mb-3 text-gray-200 font-medium">
              Course Updated Successfully
            </p>
            <IoCheckmarkDoneCircleOutline className="w-40 mb-5 animate-pulse text-green-500 mx-auto h-40" />

            <div
              onClick={() =>
                navigate(
                  `/dashboard/create-course/edit/createLecture/${courseId}`,
                )
              }
              className="bg-gray-200 rounded-md w-[60%] cursor-pointer hover:bg-gray-300 flex gap-2 items-center justify-center mx-auto"
            >
              <IoArrowBackOutline className="text-md" />
              <p className="text-xl">Back</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditLecture;
