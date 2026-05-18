import "@fontsource/inter";
import "@fontsource/space-grotesk";
import "@fontsource/jetbrains-mono";
import "@fontsource/ibm-plex-mono";
import { FaCode } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {  useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [showPass, setshowPass] = useState(false);
  const [role, setRole] = useState("student");

  const toggleShowPass = () => {
    setshowPass(!showPass);
  };
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignup = async () => {
    try {
      const name = nameRef.current.value;
      const emailId = emailRef.current.value;
      const password = passwordRef.current.value;

      const response = await axios.post(
        BASE_URL + "/signup",
        {
          name,
          emailId,
          password,
          role,
        },
        { withCredentials: true },
      );

      dispatch(addUser(response?.data?.user));

      navigate("/");
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  

  return (
    <div className="md:grid md:grid-cols-2 ">
      {/* left side  */}
      <div className=" hidden md:block md:pl-25 md:pt-30 md:w-full min-h-screen  md:bg-[radial-gradient(circle_at_top_left,rgba(76,215,246,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(109,40,255,0.15),transparent_40%),linear-gradient(180deg,#102A43_0%,#07192E_100%)]">
        <h1 className="font-['inter'] flex items-center gap-2 text-4xl text-[#A8B3C7] tracking-tight font-black mb-10">
          CodeLikePro
          <span className="">
            <FaCode />
          </span>
        </h1>
        <p className="font-['inter'] mb-3 text-5xl font-black tracking-tight text-[#dfe9f6]">
          Engineer your
        </p>
        <p className="font-['inter'] text-5xl font-black tracking-tight text-[#5BE7FF]">
          career trajectory.
        </p>

        <p className="font-['inter'] text-[17px] text-[#a2adbd] w-[70%] mt-10">
          Join an elite cohort of developers mastering{" "}
          <span className="text-[]">backend</span>,{" "}
          <span className="text-[]">Agentic ai</span> ,{" "}
          <span className="text-[]">system design</span>,{" "}
          <span className="text-[]">performance engineering</span>, and the{" "}
          <span className="text-[]">architectural patterns</span> used by the
          world's top tech teams.
        </p>

        <div className="w-[55%] mt-15 flex justify-between">
          <div className="font-['inter'] text-3xl text-[#dfe9f6] font-black ">
            {" "}
            5k+
            <br />
            <p className="text-[12px] mt-1 tracking-tight font-extrabold text-[#9ba6bb]">
              ACTIVE STUDENTS
            </p>
          </div>
          <div className="font-['inter'] text-3xl text-[#dfe9f6] font-black ">
            {" "}
            20+
            <br />
            <p className="text-[12px] mt-1 tracking-tight font-extrabold text-[#9ba6bb]">
              PRO BOOTCAMP
            </p>
          </div>
        </div>
        {/* testimonial */}
        <div className="bg-[#132339] rounded-md mb-20 border border-gray-700 mt-10 h-40 w-[60%]">
          <div className="pl-5 pt-4 pr-5">
            <p className="text-[#eaf0fa] font-bold">Marcus Chen</p>
            <p className="text-xs mb-3 text-[#BFC7D5]">
              L6 Engineer @ CloudStack
            </p>
            <p className="text-[#BFC7D5]">
              "The curriculum didn't just teach me syntax; it taught me how to
              think like a staff engineer. The Code Sandbox is a game changer."
            </p>
          </div>
        </div>
      </div>

      {/* signup side */}
      <div className="md:px-25  px-10   pt-15 min-h-screen bg-[linear-gradient(180deg,#051424_0%,#020817_100%)]">
        <section className="w-[95%] md:w-[90%]">
          <h1 className="font-['inter'] text-[25px] md:text-[50px] tracking-tighter  text-[#dfe9f6]  font-black ">
            Start Your Journey.
          </h1>
          <p className="font-['inter'] text-[12px]  md:text-xl text-[#A8B3C7] tracking-tight font-extrabold ">
            Configure your development profile to begin.
          </p>

          <div className="mt-10  ">
            <label
              className="text-[#cdd3de]  text-xs  font-black tracking-tighter font-['inter']"
              htmlFor="name"
            >
              FULL NAME
            </label>
            <input
              ref={nameRef}
              className="w-full mt-2 border rounded-md outline-[#31d8f5] border-gray-600 text-[#dfe9f6] py-2 px-4"
              id="name"
              type="text"
            />
          </div>
          <div className="mt-7  ">
            <label
              className="text-[#cdd3de]  text-xs  font-black tracking-tighter font-['inter']"
              htmlFor="email"
            >
              EMAIL
            </label>
            <input
              ref={emailRef}
              className="w-full mt-2 border rounded-md outline-[#31d8f5] border-gray-600 text-[#dfe9f6] py-2 px-4"
              id="email"
              type="email"
            />
          </div>
          <div className="mt-7  ">
            <label
              className="text-[#cdd3de]  text-xs  font-black tracking-tighter font-['inter']"
              htmlFor="password"
            >
              PASSWORD
            </label>
            <div
              htmlFor="password"
              className="w-full focus-within:border-2 focus-within:border-[#41e0fb] flex mt-2 border items-center rounded-md out  border-gray-600 text-[#dfe9f6] py-2 px-2"
            >
              <input
                ref={passwordRef}
                className="w-[95%] outline-none"
                id="password"
                type={showPass ? "text" : "password"}
              />
              <span onClick={toggleShowPass}>
                {showPass ? (
                  <FaEyeSlash className="text-white" />
                ) : (
                  <FaEye className="text-white" />
                )}
              </span>
            </div>
          </div>
          <div className="mt-7  ">
            <label
              className="text-[#cdd3de]  text-xs  font-black tracking-tighter font-['inter']"
              htmlFor="password"
            >
              ROLE
            </label>
            <div className=" mb-8 flex items-center justify-center gap-5 mt-3">
              <span
                onClick={() => setRole("student")}
                className={`text-[#cdd3de] border py-1 px-3 md:py-2 md:px-6 rounded-md cursor-pointer

      ${role === "student" ? "border-[#31d8f5]" : "border-gray-600"}`}
              >
                STUDENT
              </span>
              <span
                onClick={() => setRole("educator")}
                className={`text-[#cdd3de] border py-1 px-3 md:py-2 md:px-6 rounded-md cursor-pointer

      ${role === "educator" ? "border-[#31d8f5]" : "border-gray-600"}`}
              >
                EDUCATOR
              </span>
            </div>

            <div
              htmlFor="signup"
              className="w-full cursor-pointer  py-2 px-4 rounded-md hover:opacity-90 bg-[rgb(54,170,248)]"
            >
              <p
                onClick={handleSignup}
                id="signup"
                className="text-center  text-gray-200  font-semibold text-md"
              >
                Signup{" "}
              </p>
            </div>

            <div className="mt-5   mb-5">
              <p className="text-gray-400 text-center text-xs">
                OR AUTHENTICATE WITH{" "}
              </p>
            </div>

            <div className="flex cursor-pointer justify-center mb-5 border hover:bg-slate-900 border-gray-600 py-2 rounded-md items-center ">
              <span>
                <FaGoogle className="text-white" />
              </span>
              <p className="text-white">oogle</p>
            </div>

            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
                className="text-[#31d8f5] cursor-pointer hover:text-[#01a5c2] text-sm"
              >
                Log in
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
