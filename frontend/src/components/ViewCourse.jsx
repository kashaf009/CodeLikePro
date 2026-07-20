import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlay, FaLock } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import { FaStar, FaUserGraduate } from "react-icons/fa";

const ViewCourse = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [showAllLectures, setShowAllLectures] = useState(false);
  const [SelectedCourse, setSelectedCourse] = useState({});
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const videoRef = useRef(null);

  const { courseId } = useParams();

  const lectures = SelectedCourse?.lectures || [];
  const isEnrolled = Boolean(
    user?.enrolledCourse &&
      SelectedCourse?._id &&
      user?.enrolledCourse === SelectedCourse?._id,
  );
  const effectiveShowAllLectures = showAllLectures || isEnrolled;

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

  const handleEnrollClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowPaymentModal(true);
    setPaymentError("");
    setPaymentAmount("");
  };

  const handlePaymentSubmit = async () => {
    const amountNumber = Number(paymentAmount);

    if (!paymentAmount || isNaN(amountNumber) || amountNumber <= 0) {
      setPaymentError("Please enter a valid numeric amount");
      return;
    }

    setIsProcessing(true);
    try {
      await axios.post(
        `${BASE_URL}/enroll/${courseId}`,
        { amount: amountNumber },
        { withCredentials: true },
      );

      setPaymentSuccess("Payment successful. You are now enrolled!");
      setShowAllLectures(true);
      setShowPaymentModal(false);
      navigate(`/lecture/${courseId}`);
    } catch (error) {
      setPaymentError(error?.response?.data?.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setPaymentError("");
    setPaymentAmount("");
  };

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

          <button
            onClick={handleEnrollClick}
            disabled={isEnrolled}
            className={`mt-8 py-3 rounded-lg font-semibold ${isEnrolled ? "bg-gray-600 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
          >
            {isEnrolled ? "Enrolled" : "Enroll Now"}
          </button>
          {paymentSuccess && (
            <p className="mt-3 text-green-400">{paymentSuccess}</p>
          )}
        </div>
      </div>
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 p-6 text-white border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold">Fake Payment</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-400 mb-4">
              Enter any numeric amount to simulate checkout and enroll in this course.
            </p>
            <label className="block text-sm mb-2 text-gray-300">
              Amount
            </label>
            <input
              value={paymentAmount}
              onChange={(e) => {
                setPaymentAmount(e.target.value.replace(/[^0-9.]/g, ""));
                setPaymentError("");
              }}
              className="w-full rounded-xl border border-gray-600 bg-slate-950 px-4 py-3 text-white outline-none"
              placeholder="Enter amount"
            />
            {paymentError && (
              <p className="text-red-500 mt-2">{paymentError}</p>
            )}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handlePaymentSubmit}
                disabled={isProcessing}
                className="flex-1 rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Pay & Enroll"}
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 rounded-xl border border-gray-600 bg-slate-800 py-3 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="bg-slate-900 border border-gray-700 rounded-2xl p-5">
          <h2 className="text-2xl font-bold text-white mb-5">Course Content</h2>

          <div className="space-y-3">
            {(effectiveShowAllLectures ? lectures : lectures.slice(0, 7)).map(
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

            {lectures.length > 8 && !effectiveShowAllLectures && (
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
                  className="w-full rounded-xl object-cover"
                  style={{ height: 400 }}
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
