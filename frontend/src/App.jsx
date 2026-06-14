import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import EditProfile from "./components/EditProfile.jsx";
import ForgotPass from "./components/ForgotPass.jsx";

import CreatorDashboard from "./components/dashboard/CreatorDashboard.jsx";
import CreatorCourses from "./components/dashboard/CreatorCourses.jsx";
import CreateCourse from "./components/dashboard/CreateCourse.jsx";

import useFetchUser from "./hooks/UsefetchUser.jsx";
import useFetchCourse from "./hooks/usefetchCourse.jsx";

const App = () => {
  const user = useSelector((store) => store.user);

  useFetchUser();
  useFetchCourse();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/resetpassword" element={<ForgotPass />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />} />

      {/* Educator Routes */}
      <Route
        path="/dashboard"
        element={
          user?.role === "educator" ? (
            <CreatorDashboard />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/dashboard/courses"
        element={
          user?.role === "educator" ? (
            <CreatorCourses />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/dashboard/create-course"
        element={
          user?.role === "educator" ? (
            <CreateCourse />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;