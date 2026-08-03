import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/constants.js";
import { MdArrowBackIos, MdOutlineDeleteForever } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [CourseInfo, setCourseInfo] = useState("");

  const [title, setTitle] = useState(CourseInfo?.title || "");
  const [category, setCategory] = useState(null);
  const [loading, setloading] = useState(false);
  const [level, setLevel] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [ispublished, setIsPublished] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [NewThumbnail, setNewThumbnail] = useState(null);
  const [DeleteSuccessfull, setDeleteSuccessfull] = useState(false);
  const [updateSuccessful, setUpdateSuccessful] = useState(false)

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewThumbnail(file);
      setThumbnail(URL.createObjectURL(file)); // preview new image
    }
  };

  const getCourseDetail = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/Course/${courseId}`, {
        withCredentials: true,
      });
      console.log(res?.data.message);
      setCourseInfo(res?.data?.data);
      const course = res?.data?.data;

      setTitle(course.title || "");

      setCategory(course.category || "");

      setLevel(course.level || "");

      setPrice(course.price || "");

      setDescription(course.description || "");

      setIsPublished(course.ispublished || false);

      // For showing current thumbnail

      setThumbnail(course.thumbnail || "");

      //
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("level", level);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("ispublished", ispublished);

      if (thumbnail) {
        formData.append("thumbnail", NewThumbnail);
      }

      const res = await axios.patch(
        `${BASE_URL}/editCourse/${courseId}`,
        formData,
        {
          withCredentials: true,
        },
      );

      setUpdateSuccessful(true)
    } catch (error) {
      console.log("FULL ERROR:", error);

      console.log("SERVER RESPONSE:", error.response?.data);

      alert(error?.response?.data?.message);
    } finally {
      setloading(false);
    }
  };

  const HandleDeleteCourse = async () => {
    setloading(true);
    try {
      const res = await axios.delete(BASE_URL + `/deleteCourse/${courseId}`, {
        withCredentials: true,
      });
      setDeleteSuccessfull(true);

      console.log(res?.data);
    } catch (error) {
      alert(error?.response?.data?.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getCourseDetail();
  }, []);

  return (
    CourseInfo && (
      <div
        className={
          DeleteSuccessfull === false && updateSuccessful === false
            ? `min-h-screen bg-slate-950 p-4 md:p-6`
            : `min-h-screen bg-slate-950`
        }
      >
        {DeleteSuccessfull == false && updateSuccessful === false && (
          <div className="max-w-5xl mx-auto mt-4 md:mt-10 mb-10 bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="px-5 md:px-8 py-6 border-b border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate("/dashboard/courses")}
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-700 border border-slate-600 hover:border-blue-400 text-white hover:text-gray-300 transition cursor-pointer shrink-0"
                    aria-label="Go back"
                  >
                    <MdArrowBackIos size={18} />
                  </button>

                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      Edit Course
                    </h1>
                    <p className="text-slate-400 mt-1">
                      Update your course details and thumbnail
                    </p>
                  </div>
                </div>

                <button
                  onClick={HandleDeleteCourse}
                  className="flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 text-white font-medium px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                >
                  <MdOutlineDeleteForever
                    className={loading ? `hidden` : `w-5 h-5`}
                  />
                  {loading ? (
                    <ImSpinner2 className="animate-spin text-2xl py-1" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>

            <div className="p-5 md:p-8 grid lg:grid-cols-2 gap-8 md:gap-10">
              {/* Left Side - Thumbnail */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Course Thumbnail
                </label>

                <label className="relative block cursor-pointer group">
                  <img
                    src={thumbnail}
                    alt="thumbnail"
                    className="w-full h-56 md:h-72 object-cover rounded-xl border border-slate-700"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <span className="bg-white text-black px-5 py-2 rounded-lg font-semibold">
                      Change Thumbnail
                    </span>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </label>

                <p className="text-slate-400 text-sm mt-2">
                  Click the image to upload a new thumbnail.
                </p>

                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/create-course/edit/createLecture/${courseId}`,
                    )
                  }
                  className="w-full py-3 mt-8 rounded-lg hover:bg-blue-500 justify-center cursor-pointer flex items-center gap-1.5 bg-blue-400 font-medium transition"
                >
                  <IoIosAdd className="w-5 h-5" />
                  <span>Add Lecture</span>
                </button>
              </div>

              {/* Right Side - Form */}
              <div className="space-y-5">
                <div>
                  <label className="text-white block mb-2">Course Title</label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                </div>

                <div>
                  <label className="text-white block mb-2">Category</label>

                  <input
                    type="text"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value.trim().toLowerCase())
                    }
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                </div>

                <div>
                  <label className="text-white block mb-2">Level</label>

                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="text-white block mb-2">Price (₹)</label>

                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                </div>

                <div>
                  <label className="text-white block mb-2">Description</label>

                  <textarea
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={ispublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-5 h-5 accent-blue-600"
                  />

                  <span className="text-white">Publish Course</span>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold text-white transition-all"
                >
                  {loading ? (
                    <ImSpinner2 className="text-xl animate-spin mx-auto" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {DeleteSuccessfull && (
          <div className="flex items-center justify-center min-h-[70vh] p-4">
            <div className="w-full max-w-md bg-slate-800 shadow-xl rounded-2xl p-8 text-center border border-slate-700">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-4xl text-white">✓</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Course Deleted Successfully
              </h2>

              <p className="text-slate-400 mb-6">
                Your course has been permanently deleted.
              </p>

              <button
                onClick={() => navigate("/dashboard/courses")}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded-lg text-white font-semibold"
              >
                Back to Courses
              </button>
            </div>
          </div>
        )}

        {updateSuccessful && (
          <div className="flex items-center justify-center min-h-[70vh] p-4">
            <div className="w-full max-w-md bg-slate-800 shadow-xl rounded-2xl p-8 text-center border border-slate-700">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-4xl text-white">✓</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Course Updated Successfully
              </h2>

              <p className="text-slate-400 mb-6">
                Your course details have been updated successfully.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setUpdateSuccessful(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 transition-all py-3 rounded-lg text-white font-semibold"
                >
                  Continue Editing
                </button>

                <button
                  onClick={() => navigate("/dashboard/courses")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded-lg text-white font-semibold"
                >
                  View Courses
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default EditCourse;
