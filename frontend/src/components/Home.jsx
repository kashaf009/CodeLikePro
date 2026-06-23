import "@fontsource/inter";
import "@fontsource/space-grotesk";
import "@fontsource/jetbrains-mono";
import "@fontsource/ibm-plex-mono";
import Nav from "./Nav";
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

const Home = () => {
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
      <Nav className="z-30" />

      <section className="w-full bg-slate-950 min-h-screen  mt-18 grid grid-cols-2  ">
        <div className="text-white pl-40 pt-50">
          <div className="bg-[rgb(20,3,45)] mb-8 rounded-4xl border border-[#26baff] px-2 py-1 w-[28%]">
            <p className="uppercase text-[0.7rem] text-center font-['inter'] font-extrabold tracking-tight text-[#88cffb]   ">
              elite course track
            </p>
          </div>

          <p className="font-['inter'] mb-3 text-5xl font-extrabold tracking-tight text-[#dfe9f6]">
            Master the Code.
          </p>
          <p className="font-['inter'] mb-8 text-5xl font-extrabold tracking-tight text-[#4CD7F6]">
            Own the Future.
          </p>

          <p className="text-gray-200 w-[80%]">
            Join the world's most intensive software engineering bootcamps.
            Built for ambitious developers ready to transition into
            high-performance engineering roles at top-tier tech companies.
          </p>

          <div className="flex gap-5 mt-15">
            <div className="bg-[#01cbf8] py-2 hover:bg-[#4ddeff] cursor-pointer px-7 rounded-md ">
              <p className="font-['space_grotesk'] flex gap-3  text-md  text-black font-bold ">
                Explore
              </p>
            </div>
            <div className="bg-slate-950 border rounded-md border-white py-2 px-5 hover:bg-slate-800 cursor-pointer">
              <p className="text-md font-extrabold font-['space_grotesk'] ">
                View Curriculum
              </p>
            </div>
          </div>
        </div>
        <div className="text-white">
          <div className="mb-40">
            <img
              className="w-[70%] mt-55 brightness-80 saturate-200 rounded-md border-8  border-slate-700"
              src={code}
              alt=""
            />
          </div>
        </div>
      </section>

      {/*  */}

      <section className="bg-slate-900 min-h-screen     ">
        <h1 className="text-center text-4xl font-extrabold text-[#dfe9f6] pt-30 mb-7 font-['inter']">
          Engineered for Excellence
        </h1>

        <p className="text-center text-gray-300 w-[50%] mb-15 mx-auto font-['inter'] text-lg">
          More than just videos. We provide a professional development
          environment designed to accelerate your technical growth.
        </p>

        <div className="grid px-40 grid-cols-[65%_35%] gap-5 mb-5">
          <div className="bg-slate-800 w-full flex flex-col gap-5 rounded-xl  hover:border-cyan-500 border border-gray-700 h-80 text-white px-8 py-5">
            <div className="w-12 h-12 mt-5 flex rounded-md border border-gray-600 justify-center items-center bg-slate-700">
              <LuBotMessageSquare className="text-3xl " />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">AI-Powered Feedback</h2>
              <p className="text-gray-300 w-[70%]">
                Get instant, granular code reviews as you type. Our proprietary
                LLM engine analyzes your logic, security patterns, and
                efficiency based on industry best practices.
              </p>
            </div>
          </div>
          <div className="text-white h-80 flex flex-col gap-5 rounded-xl border hover:border-[#ebc4ff] border-gray-700 bg-slate-800 px-8 py-5">
            <div className="w-12 h-12 mt-5 flex rounded-md border border-gray-600 justify-center items-center bg-slate-700">
              <IoCubeOutline className="text-3xl " />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Real-World Scale</h2>
              <p className="text-gray-300 ">
                No "Todo List" apps here. Build microservices, blockchain
                explorers, and real-time trading engines using high-concurrency
                systems.
              </p>
            </div>
          </div>
        </div>

        <div className="grid px-40 pb-30  grid-cols-[35%_65%] gap-5">
          <div className="bg-slate-800 w-full flex flex-col gap-5 rounded-xl  hover:border-[#ebc4ff]  border border-gray-700 h-70 text-white px-8 py-5">
            <div className="w-12 h-12 mt-3 flex rounded-md border border-gray-600 justify-center items-center bg-slate-700">
              <BsPeopleFill className="text-3xl " />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Senior Mentorship</h2>
              <p className="text-gray-300 ">
                Direct access to Senior Engineers from companies like Vercel,
                Stripe, and Google for pair-programming sessions.
              </p>
            </div>
          </div>

          <div className="text-white h-70 rounded-xl border flex gap-7 hover:border-cyan-500 border-gray-700 bg-slate-800 px-8 py-7">
            <div>
              <img
                className="w-full border border-gray-600 rounded-md"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAzhUv1vA5lIVbLVB0_IGeVpWQkYOlFygQPCpixvBWRFpD3jxl4YiV-z4LaldcbH1lNp3Ksb9ryCM7hUpzII6mAs0R8jAUKoA-OtND0fyhgx-3aL9Pkc2lK51MYa79NT8p1gPAsTpC3c6kvCP13E70AuS2_VNyTouoYkQIGWRKIih79farcMfNY7hcxJFQxdTewme3uahEPC12njQNCFRlWR9JSwGm2s0RWq8BuhBigdiN2fgQ-p0nfvMQCRz25GvmtjMQ1LHJ6FIC"
                alt="Industry Credentials"
              />
            </div>
            <div className="my-10">
              <h2 className="text-3xl font-bold mb-4">Industry Credentials</h2>
              <p className="text-gray-300 ">
                Earn blockchain-verified certifications recognized by top tech
                recruiters globally. Stand out with a portfolio that proves your
                technical depth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* explore course section */}
      { courses && 
      <section className="bg-slate-950  pl-40 min-h-screen w-full">
        <h1 className="text-[#dfe9f6] text-4xl mb-3 pt-25 font-bold">
          Top-Rated Bootcamps
        </h1>
        <div className="absolute flex items-center gap-1 right-30 font-['space_grotesk'] cursor-pointer border border-transparent hover:border-b-cyan-400 transition-all hover:text-cyan-400 text-md text-cyan-500 ">
          View All program{" "}
          <span>
            <MdArrowForwardIos />
          </span>
        </div>
        <p className="text-md font-['space_grotesk'] text-gray-400">
          Intensive tracks designed to take you from a junior to a high-earning
          specialist in 12 weeks.
        </p>
      </section>}
    </div>
  );
};

export default Home;
