import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlay, FaCheckCircle } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { BASE_URL } from "../utils/constants";

const Lecture = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL}/getCourseLectures/${courseId}`,
          { withCredentials: true }
        );
        const courseData = res.data.course;
        setCourse(courseData);
        if (courseData.lectures && courseData.lectures.length > 0) {
          setSelectedLecture(courseData.lectures[0]);
        }
      } catch (error) {
        console.error("Failed to fetch course lectures:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
    if (videoRef.current && lecture.videoUrl) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Course not found</div>
      </div>
    );
  }

  const lectures = course.lectures || [];
  const progressPercentage = Math.round((1 / lectures.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-slate-200 transition hover:bg-slate-700"
          >
            <IoIosArrowBack className="text-xl" />
            Back
          </button>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <h1 className="text-4xl font-bold text-white">{course.title}</h1>
              <p className="mt-2 text-slate-400">
                {course.category} • Module {Math.ceil(lectures.length / 5)} of {lectures.length}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-3">
              <p className="text-sm text-slate-400">Progress</p>
              <p className="mt-2 text-2xl font-bold text-cyan-400">
                {progressPercentage}% Complete
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1.2fr]">
          {/* Left Column - Video and Info */}
          <div className="space-y-6">
            {/* Video Player */}
            <div className="rounded-3xl border border-slate-700 bg-slate-950 overflow-hidden shadow-2xl shadow-black/20">
              {selectedLecture?.videoUrl ? (
                <div className="relative bg-black">
                  <video
                    ref={videoRef}
                    controls
                    className="w-full aspect-video"
                    src={selectedLecture.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="w-full aspect-video bg-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <FaPlay className="mx-auto text-4xl text-slate-600 mb-3" />
                    <p className="text-slate-400">No video available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Lecture Info Tabs */}
            <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6">
              <div className="flex items-center gap-4 border-b border-slate-700 pb-6">
                <button className="text-cyan-400 border-b-2 border-cyan-400 pb-2 font-semibold">
                  Overview
                </button>
                <button className="text-slate-400 pb-2 hover:text-white transition">
                  Resources
                </button>
                <button className="text-slate-400 pb-2 hover:text-white transition">
                  Q&A
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {selectedLecture?.lectureTitle || "Lecture"}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {course.description ||
                    "This lecture provides comprehensive content to help you learn and master the concepts. Focus on understanding each topic thoroughly before moving to the next lecture."}
                </p>

                {/* Resources Section */}
                <div className="grid gap-4 sm:grid-cols-2 mt-8">
                  <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <span className="text-cyan-400">📄</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Course Material</p>
                      <p className="text-white font-semibold">PDF Available</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <span className="text-cyan-400">💻</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Code</p>
                      <p className="text-white font-semibold">GitHub Repo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Lectures List */}
          <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 h-fit sticky top-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-6">
              <h3 className="text-xl font-bold text-white">Course Content</h3>
              <span className="text-sm text-cyan-400 font-semibold">
                {lectures.length} Lectures
              </span>
            </div>

            {/* Lectures List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {lectures.map((lecture, index) => (
                <button
                  key={lecture._id}
                  onClick={() => handleLectureClick(lecture)}
                  className={`w-full text-left rounded-2xl p-4 border transition-all ${
                    selectedLecture?._id === lecture._id
                      ? "bg-cyan-500/10 border-cyan-400"
                      : "border-slate-700 hover:border-slate-600 bg-slate-900 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 flex-shrink-0 ${
                        selectedLecture?._id === lecture._id
                          ? "text-cyan-400"
                          : "text-slate-600"
                      }`}
                    >
                      {selectedLecture?._id === lecture._id ? (
                        <FaPlay className="text-lg" />
                      ) : (
                        <span className="text-sm font-semibold text-slate-500">
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-semibold truncate ${
                          selectedLecture?._id === lecture._id
                            ? "text-cyan-400"
                            : "text-white"
                        }`}
                      >
                        {lecture.lectureTitle}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Lecture {index + 1}
                      </p>
                    </div>
                    {lecture.isPreviewFree && (
                      <FaCheckCircle className="text-emerald-500 flex-shrink-0 text-sm" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecture;
