import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlay, FaLock } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import { FaStar, FaUserGraduate } from "react-icons/fa";

const ViewCourse = () => {
  const courses = useSelector((store) => store.course);
  const [showAllLectures, setShowAllLectures] = useState(false);
  console.log(courses);

  const [SelectedCourse, setSelectedCourse] = useState({});
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);

  const videoRef = useRef(null);

  const { courseId } = useParams();

  const lectures = SelectedCourse?.lectures || [];

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/Course/${courseId}`, {
          withCredentials: true,
        });

        const course = res.data.data;

        setSelectedCourse(course);

        const previewLecture = course.lectures.find((lec) => lec.isPreviewFree);

        setSelectedLecture(previewLecture);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handlePlay = () => {
    setPlayVideo(true);

    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  const handleLectureClick = (lecture) => {
    if (!lecture.isPreviewFree) return;

    setSelectedLecture(lecture);
    setPlayVideo(true);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4">
      {/* Course Details */}
      <div className="max-w-6xl border border-gray-700 mx-auto bg-slate-900 text-white rounded-2xl mt-20 shadow-lg overflow-hidden md:flex">
        <div className="md:w-1/2">
          <img
            className="w-[95%] m-5 h-100 rounded-xl object-cover"
            src={SelectedCourse.thumbnail}
            alt={SelectedCourse.title}
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl mt-8 font-bold">{SelectedCourse.title}</h1>

            <p className="text-3xl font-bold text-cyan-400 mt-4">
              ₹{SelectedCourse.price}
            </p>

            <h2 className="text-xl font-semibold mt-6">Course Description</h2>

            <p className="text-gray-400 mt-3">{SelectedCourse.description}</p>
          </div>

          <button className="mt-8 bg-blue-700 hover:bg-blue-800 py-3 rounded-lg font-semibold">
            Enroll Now
          </button>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="bg-slate-900 border border-gray-700 rounded-2xl p-5">
          <h2 className="text-2xl font-bold text-white mb-5">Course Content</h2>

          <div className="space-y-3">
            {(showAllLectures ? lectures : lectures.slice(0, 7)).map(
              (lecture, index) => (
                <div
                  key={lecture._id}
                  onClick={() => handleLectureClick(lecture)}
                  className={`flex justify-between items-center p-4 rounded-xl transition
          ${
            lecture.isPreviewFree
              ? "cursor-pointer hover:bg-slate-700"
              : "cursor-not-allowed opacity-60"
          }
          ${
            selectedLecture?._id === lecture._id
              ? "bg-cyan-600"
              : "bg-slate-800"
          }`}
                >
                  <div>
                    <h3 className="text-white font-medium">
                      {index + 1}. {lecture.lectureTitle}
                    </h3>

                    {lecture.isPreviewFree ? (
                      <p className="text-green-400 text-sm mt-1">
                        Free Preview
                      </p>
                    ) : (
                      <p className="text-gray-400 text-sm mt-1">
                        Enroll to Watch
                      </p>
                    )}
                  </div>

                  {lecture.isPreviewFree ? (
                    <FaPlay className="text-cyan-400" />
                  ) : (
                    <FaLock className="text-gray-400" />
                  )}
                </div>
              ),
            )}

            {lectures.length > 8 && !showAllLectures && (
              <button
                className="w-full mt-3   cursor-not-allowed opacity-60 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                disabled={true}
              >
                Enroll to View All ({lectures.length} Lectures)
              </button>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-slate-900 flex flex-col   border border-gray-700 rounded-2xl p-5">
          {selectedLecture && (
            <>
              <div className="mb-5 ">
                <h2 className="text-2xl font-bold text-white">
                  {selectedLecture.lectureTitle}
                </h2>

                <p className="text-gray-400 mt-2">Watch this free preview.</p>
              </div>
              <div className="relative">
                <video
                  key={selectedLecture._id}
                  ref={videoRef}
                  controlsList="nodownload"
                  src={selectedLecture.videoUrl}
                  controls={playVideo}
                  className="w-full h-[400px] rounded-xl object-cover"
                />

                {!playVideo && (
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="flex items-center gap-3 bg-black/70 hover:bg-black/80 px-6 py-3 rounded-full text-white font-semibold">
                      <FaPlay />
                      <span>Preview</span>
                    </div>
                  </button>
                )}
              </div>

              {/* Instructor & Stats */}
              <div className=" border-t mt-8 border-gray-700 pt-6">
                <h2 className="text-xl font-bold text-white mb-5">
                  Instructor
                </h2>

                <div className="flex items-center gap-4">
                  <img
                    src={SelectedCourse?.creator?.photoUrl}
                    alt={SelectedCourse?.creator?.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {SelectedCourse?.creator?.name}
                    </h3>
                    <p className="text-gray-400 text-sm">Course Instructor</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-400 text-lg" />
                    <span className="text-gray-300">
                      <strong>4.8</strong> Course Rating
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaUserGraduate className="text-cyan-400 text-lg" />
                    <span className="text-gray-300">
                      <strong>1,250+</strong> Students Enrolled
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
