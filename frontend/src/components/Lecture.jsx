import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Lecture = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-700 bg-slate-900 p-10 shadow-xl shadow-black/20">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-slate-200 transition hover:bg-slate-700"
        >
          <IoIosArrowBack className="text-xl" />
          Back
        </button>

        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Course Lecture</p>
          <h1 className="text-5xl font-bold text-white">Lecture Overview</h1>
          
        </div>

        <div className="mt-10 rounded-3xl border border-slate-700 bg-slate-950 p-8">
          <h2 className="text-2xl font-semibold text-white">Next step</h2>
          <p className="mt-3 text-slate-400">
            Continue to the lecture content, preview the first video, and start learning immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lecture;
