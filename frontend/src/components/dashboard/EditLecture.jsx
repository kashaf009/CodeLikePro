import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditLecture = () => {
  const { courseId, lectureId } = useParams();
  const { lectureData } = useSelector((store) => store.lecture);
  const selectedLecture = lectureData.find(
    (lecture) => lecture._id === lectureId,
  );

  const [loading, setloading] = useState(false);
  const [title, settitle] = useState(selectedLecture.lectureTitle);
  const [Video, setVideo] = useState("");

  const handleVideoUpload = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleEdit = () => {

    
    //
  };

  return (
    <div className="bg-slate-950 h-screen items-center flex justify-center">
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
          value={title}
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
          <input type="checkbox" name="" id="" />
          <p className="text-gray-200">Free Preview</p>
        </div>
        <div
          onClick={handleEdit}
          className="w-full mb-10 py-1 hover:bg-blue-600 rounded-md bg-blue-500"
        >
          <p className="text-center text-md text-white font-medium ">
            Update lecture
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
