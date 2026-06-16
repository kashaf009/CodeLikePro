import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/constants.js";

const EditCourse = () => {
  const { courseId } = useParams();
  const [CourseInfo, setCourseInfo] = useState("");

  const [title, setTitle] = useState(CourseInfo?.title || "");
  const [category, setCategory] = useState(null);
  const [level, setLevel] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [ispublished, setIsPublished] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [NewThumbnail, setNewThumbnail] = useState(null);

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

      alert(res.data.message);
    } catch (error) {
      console.log("FULL ERROR:", error);

      console.log("SERVER RESPONSE:", error.response?.data);

      alert(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getCourseDetail();
  }, []);

  return (
    CourseInfo && (
      <div className="max-w-5xl mx-auto mb-20 mt-20 bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-700">
          <h1 className="text-3xl font-bold text-white">Edit Course</h1>
          <p className="text-slate-400 mt-1">
            Update your course details and thumbnail
          </p>
        </div>

        <div className="p-8 grid lg:grid-cols-2 gap-10">
          {/* Left Side - Thumbnail */}
          <div>
            <label className="block text-white font-medium mb-3">
              Course Thumbnail
            </label>

            <label className="relative block cursor-pointer group">
              <img
                src={thumbnail}
                alt="thumbnail"
                className="w-full h-72 object-cover rounded-xl border border-slate-700"
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
          </div>

          {/* Right Side - Form */}
          <div className="space-y-5">
            <div>
              <label className="text-white block mb-2">Course Title</label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-white block mb-2">Category</label>

              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="text-white block mb-2">Level</label>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
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
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="text-white block mb-2">Description</label>

              <textarea
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={ispublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-5 h-5"
              />

              <span className="text-white">Publish Course</span>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold text-white transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditCourse;
