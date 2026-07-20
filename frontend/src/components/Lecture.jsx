import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlay, FaListUl } from "react-icons/fa";

const Lecture = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-slate-200 transition hover:bg-slate-700"
            >
              <IoIosArrowBack className="text-xl" />
              Back
            </button>
            <h1 className="text-4xl font-bold text-white">Lecture Dashboard</h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Manage your lecture content for course ID <span className="font-semibold text-cyan-300">{courseId}</span> and track progress in a clean learning workspace.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-700 bg-slate-950 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Status</p>
              <p className="mt-3 text-2xl font-semibold text-white">Active</p>
            </div>
            <div className="rounded-3xl border border-slate-700 bg-slate-950 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Next Step</p>
              <p className="mt-3 text-2xl font-semibold text-white">Publish Lecture</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-6 rounded-3xl border border-slate-700 bg-slate-950 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Current Lecture</p>
                <h2 className="mt-2 text-3xl font-bold text-white">Introduction to the Course</h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
                <FaPlay />
                Start Lecture
              </button>
            </div>

            <p className="text-slate-400">
              This lecture is the first step for learners enrolled in this course. It provides a concise introduction, sets expectations, and prepares students for the curriculum ahead.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Duration</p>
                <p className="mt-2 text-xl font-semibold text-white">18 min</p>
              </div>
              <div className="rounded-2xl bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Level</p>
                <p className="mt-2 text-xl font-semibold text-white">Beginner</p>
              </div>
              <div className="rounded-2xl bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Lecture Type</p>
                <p className="mt-2 text-xl font-semibold text-white">Video</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6">
            <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
              <FaListUl className="text-lg text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">Lecture Queue</h3>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { title: "Free Preview", duration: "5 min", status: "Available" },
                { title: "Advanced Setup", duration: "12 min", status: "Locked" },
                { title: "Project Overview", duration: "10 min", status: "Locked" },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-3xl border border-slate-700 bg-slate-900 p-4">
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.duration}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm ${item.status === "Available" ? "bg-emerald-500 text-slate-950" : "bg-slate-700 text-slate-300"}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecture;
