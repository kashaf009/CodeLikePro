import { BASE_URL } from "../utils/constants";
import { addCourses } from "../utils/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const useFetchCourse = () => {
  const dispatch = useDispatch();
  const course = useSelector((store) => store.course);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/Courses`, {
        withCredentials: true,
      });

      dispatch(addCourses(res?.data?.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (course.length === 0) {
      fetchCourse();
    }
  }, []); // <-- remove course dependency

  return course;
};

export default useFetchCourse;