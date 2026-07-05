import React from "react";

const CreateLecture = () => {
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
            type="text"
            placeholder="Enter lecture title"
            className="w-full rounded-lg border border-gray-200 text-white px-4 py-3 outline-none placeholder:text-gray-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <button className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold transition hover:bg-blue-700">
          Add Lecture
        </button>
      </div>
    </div>
  );
};

export default CreateLecture;
