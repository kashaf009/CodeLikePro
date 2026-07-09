import { useState } from "react";

const EditLecture = () => {
  const [loading, setloading] = useState(false);
  const [title, settitle] = useState("");
  const [Video, setVideo] = useState("");

  const handleVideoUpload = () => {};

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
          Title
        </label>
        <input
          className="border py-1 mb-5 px-3 text-gray-400 rounded-md border-gray-200"
          type="text"
          value={title}
          name=""
          id="title"
        />

        <label className="text-md text-gray-200 mb-2" htmlFor="video">
          Upload video
        </label>
        <input
          className="mb-8 text-gray-200 border px-3 hover:bg-slate-600 bg-slate-500 py-1 rounded-md border-gray-200"
          type="file"
          onChange={handleVideoUpload}
          accept="video/*"
          name=""
          id="vidoe"
        />

        <div
          onClick={handleEdit}
          className="w-full mb-10 py-1 hover:bg-blue-600 rounded-md bg-blue-500"
        >
          <p className="text-center text-md text-white font-medium ">Save</p>
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
