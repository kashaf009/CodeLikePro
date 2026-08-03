import "@fontsource/inter";
import "@fontsource/space-grotesk";
import "@fontsource/jetbrains-mono";
import "@fontsource/ibm-plex-mono";
import Nav from "./Nav";
import Footer from "./Footer";
import code from "../assets/code.png";
import { BsPeopleFill } from "react-icons/bs";
import { LuBotMessageSquare } from "react-icons/lu";
import { IoCubeOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourses } from "../utils/courseSlice";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const courses = useSelector((store) => store.course);

  const fetchCourse = async () => {
    const res = await axios.get(BASE_URL + "/Courses", {
      withCredentials: true,
    });

    console.log(res?.data?.data);
    dispatch(addCourses(res?.data?.data));
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen">
      <Nav />

      {/* Hero Section */}
      <section className="w-full bg-slate-950 min-h-screen mt-18 grid grid-cols-1 lg:grid-cols-2 pb-16">
        <div className="px-6 sm:px-10 lg:pl-24 xl:pl-40 pt-24 lg:pt-44">
          <div className="bg-[rgb(20,3,45)] mb-8 rounded-4xl border border-[#26baff] px-4 py-1 w-fit">
            <p className="uppercase text-[0.7rem] text-center font-['inter'] font-extrabold tracking-tight text-[#88cffb]">
              elite course track
            </p>
          </div>

          <p className="font-['inter'] mb-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-[#dfe9f6]">
            Master the Code.
          </p>
          <p className="font-['inter'] mb-6 md:mb-8 text-4xl sm:text-5xl font-extrabold tracking-tight text-[#4CD7F6]">
            Own the Future.
          </p>

          <p className="text-gray-200 w-full max-w-xl">
            Join the world's most intensive software engineering bootcamps.
            Built for ambitious developers ready to transition into
            high-performance engineering roles at top-tier tech companies.
          </p>

          <div className="flex flex-wrap gap-4 mt-10 md:mt-14">
            <div
              onClick={() => navigate("/bootcamps")}
              className="bg-[#01cbf8] py-2.5 hover:bg-[#4ddeff] cursor-pointer px-7 rounded-md"
            >
              <p className="font-['space_grotesk'] flex gap-3 text-md text-black font-bold">
                Explore
              </p>
            </div>

          </div>
        </div>
        <div className="text-white flex items-center justify-center">
          <div className="mt-8 lg:mt-16">
            <img
              className="w-[80%] mx-auto lg:w-[70%] lg:mx-0 brightness-80 saturate-200 rounded-md border-8 border-slate-700"
              src={code}
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Engineered for Excellence */}
      <section className="bg-slate-900 py-20 md:py-24">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-[#dfe9f6] mb-6 font-['inter']">
          Engineered for Excellence
        </h1>

        <p className="text-center text-gray-300 w-[85%] md:w-[60%] lg:w-[50%] mb-12 md:mb-16 mx-auto font-['inter'] text-base md:text-lg">
          More than just videos. We provide a professional development
          environment designed to accelerate your technical growth.
        </p>

        <div className="grid px-6 sm:px-10 lg:px-20 xl:px-40 grid-cols-1 lg:grid-cols-[65%_35%] gap-6 mb-6">
          <div className="bg-slate-800 w-full flex flex-col gap-4 rounded-xl hover:border-cyan-500 border border-gray-700 min-h-64 md:h-80 text-white px-6 md:px-8 py-5">
            <div className="w-12 h-12 mt-2 md:mt-5 flex rounded-md border border-gray-600 justify-center items-center bg-slate-700">
              <LuBotMessageSquare className="text-3xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">AI-Powered Feedback</h2>
              <p className="text-gray-300 w-full md:w-[70%]">
                Get instant, granular code reviews as you type. Our proprietary
                LLM engine analyzes your logic, security patterns, and
                efficiency based on industry best practices.
              </p>
            </div>
          </div>
          <div className="text-white min-h-64 md:h-80 flex flex-col gap-4 rounded-xl border hover:border-[#ebc4ff] border-gray-700 bg-slate-800 px-6 md:px-8 py-5">
            <div className="w-12 h-12 mt-2 md:mt-5 flex rounded-md border border-gray-600 justify-center items-center bg-slate-700">
              <IoCubeOutline className="text-3xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Real-World Scale</h2>
              <p className="text-gray-300">
                No "Todo List" apps here. Build microservices, blockchain
                explorers, and real-time trading engines using high-concurrency
                systems.
              </p>
            </div>
          </div>
        </div>

        <div className="grid px-6 sm:px-10 lg:px-20 xl:px-40 grid-cols-1 lg:grid-cols-[35%_65%] gap-6">
          <div className="bg-slate-800 w-full flex flex-col gap-4 rounded-xl hover:border-[#ebc4ff] border border-gray-700 min-h-64 md:h-70 text-white px-6 md:px-8 py-5">
            <div className="w-12 h-12 mt-2 md:mt-3 flex rounded-md border border-gray-600 justify-center items-center bg-slate-700">
              <BsPeopleFill className="text-3xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Senior Mentorship</h2>
              <p className="text-gray-300">
                Direct access to Senior Engineers from companies like Vercel,
                Stripe, and Google for pair-programming sessions.
              </p>
            </div>
          </div>

          <div className="text-white min-h-64 md:h-70 rounded-xl border flex-col md:flex-row flex gap-6 hover:border-cyan-500 border-gray-700 bg-slate-800 px-6 md:px-8 py-5 md:py-7">
            <div className="w-full md:w-[45%]">
              <img
                className="w-full h-full object-cover border border-gray-600 rounded-md"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAzhUv1vA5lIVbLVB0_IGeVpWQkYOlFygQPCpixvBWRFpD3jxl4YiV-z4LaldcbH1lNp3Ksb9ryCM7hUpzII6mAs0R8jAUKoA-OtND0fyhgx-3aL9Pkc2lK51MYa79NT8p1gPAsTpC3c6kvCP13E70AuS2_VNyTouoYkQIGWRKIih79farcMfNY7hcxJFQxdTewme3uahEPC12njQNCFRlWR9JSwGm2s0RWq8BuhBigdiN2fgQ-p0nfvMQCRz25GvmtjMQ1LHJ6FIC"
                alt="Industry Credentials"
              />
            </div>
            <div className="md:my-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Industry Credentials</h2>
              <p className="text-gray-300">
                Earn blockchain-verified certifications recognized by top tech
                recruiters globally. Stand out with a portfolio that proves your
                technical depth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top-Rated Bootcamps */}
      {courses && (
        <section className="bg-slate-950 px-6 sm:px-10 lg:px-20 xl:px-40 py-16 md:py-20 w-full relative">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <h1 className="text-[#dfe9f6] text-3xl md:text-4xl font-bold">
              Top-Rated Bootcamps
            </h1>
            <div
              onClick={() => navigate("/bootcamps")}
              className="flex items-center gap-1 font-['space_grotesk'] cursor-pointer border border-transparent hover:border-b-cyan-400 transition-all hover:text-cyan-400 text-md text-cyan-500"
            >
              View All program{" "}
              <span>
                <MdArrowForwardIos />
              </span>
            </div>
          </div>
          <p className="text-md font-['space_grotesk'] text-gray-400">
            Intensive tracks designed to take you from a junior to a
            high-earning specialist in 12 weeks.
          </p>
          <div className="grid mt-8 md:mt-12 mb-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0,6).map((course) => {
              return (
                <section onClick={()=>navigate(`/viewcourse/${course._id}`)}
                  key={course?.id}
                  className="bg-slate-800 border-b flex flex-col justify-between hover:border-b-[#4f84c9] border-transparent rounded-md min-h-110 transform transition-all duration-300 hover:scale-101"
                >
                  <img
                    className="rounded-t-md w-full h-60 object-cover"
                    src={course?.thumbnail}
                    alt=""
                  />

                  <div className="flex items-center mb-2 gap-5 pt-5 justify-between px-5 md:px-6">
                    <p className="text-[#eef5fe] line-clamp-2 font-['space_grotesk'] font-bold text-xl md:text-2xl">
                      {course?.title}
                    </p>
                    <p className="text-cyan-500 text-xl shrink-0">$ {course?.price}</p>
                  </div>
                  <div className="px-5 md:px-6 mb-4">
                    <p className="text-sm text-[#c2c8d9] line-clamp-2">
                      {course?.description}
                    </p>
                  </div>
                  <div className="flex px-5 md:px-6 items-center gap-4">
                    <p className="text-gray-400 border text-xs bg-slate-900 rounded-3xl inline border-gray-600 py-1 px-3">
                      {course?.category}
                    </p>
                    <p className="text-gray-400 border bg-slate-900 text-xs rounded-3xl inline border-gray-600 py-1 px-3">
                      {course?.level}
                    </p>
                  </div>

                  <div className="px-5 md:px-6 flex items-center gap-2 mt-4 mb-4">
                    <img className="w-5 h-5 rounded-full" src={course?.creator?.photoUrl} alt="" />
                    <p className="text-sm text-gray-400">{course?.creator?.name}</p>
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default Home;
