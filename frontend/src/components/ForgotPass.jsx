import "@fontsource/inter";
import "@fontsource/space-grotesk";
import "@fontsource/jetbrains-mono";
import "@fontsource/ibm-plex-mono";
import { MdOutlineSmsFailed } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { TbPasswordMobilePhone } from "react-icons/tb";
import { useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { ImSpinner2 } from "react-icons/im";

const ForgotPass = () => {
  const toEmailIdRef = useRef(null);
  const otpRef = useRef(null);
  const [loading, setloading] = useState(false)
  const newPasswordRef = useRef(null);
  const conPasswordRef = useRef(null);

  const navigate = useNavigate();
  const [State, setState] = useState(1);
  const [Error, setError] = useState(null);

  const handleSendEmail =async () => {
    setloading(true)
    try {
      

      const toEmailId = toEmailIdRef.current.value.trim().toLowerCase();
      if (!toEmailId) {
        setError("Enter Email")
        return;
      }

      await axios.post(
        BASE_URL + "/sendotp",
        {
          toEmailId,
        },
        { withCredentials: true },
      );


      console.log("Email send successfully ");
      setState(2)

      return;
      



    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
    finally{
      setloading(false)
    }
  };

  return (
    <div className="min-h-screen w-full  flex  bg-[linear-gradient(180deg,#051424_0%,#020817_100%)] justify-center items-center">
      {State == 1 && (
        <div className="bg-slate-900 w-[40%] border border-gray-500 rounded-xl text-white h-[50%]">
          <MdOutlineSmsFailed className="w-20 mt-8  h-20 mx-auto" />
          <h1 className="text-center mb-8 text-xl font-['ibm_plex_mono'] ">
            Forgot your password?
          </h1>

          <div className=" px-15 flex  flex-col">
            <label htmlFor="email" className="font-['ibm_plex_mono'] mb-2 ">
              Verify Emial
            </label>
            <input
              type="email"
              ref={toEmailIdRef}
              required
              className="bg-slate-700 py-2 border   border-gray-500 rounded-md mb-5 text-white  px-2 placeholder:text-md placeholder:text-gray-200  placeholder:opacity-50 "
              name=""
              id="email"
              placeholder="Code123@gmail.com"
            />
            {Error && (
              <p className="mb-2 text-red-500">{Error}</p>
            )}

            <div
              onClick={handleSendEmail}
              
              className={`bg-sky-700 hover:bg-sky-500 transition-all py-2 mb-5 rounded-md px-2 placeholder:text-md disabled:${loading}`}
            >
              <p  className={`font-['ibm_plex_mono']   text-center disabled:${loading} `}>{loading? <ImSpinner2 className="animate-spin mx-auto text-md  justify-center " /> : "Send Email"}</p>
            </div>

            <div
              onClick={() => {
                navigate("/login");
              }}
              className="py-2 flex gap-1 hover:gap-3 hover:text-sky-500 transition-all items-center justify-center rounded-md px-2 placeholder:text-md"
            >
              <IoIosArrowBack className="h-6 w-6 " />
              <p className="font-['ibm_plex_mono'] text-center ">
                Back to Login
              </p>
            </div>
          </div>
        </div>
      )}

      {/* state 2 */}

      {State == 2 && (
        <div className="bg-slate-900 w-[40%] border border-gray-500 rounded-xl text-white h-[50%]">
          <MdOutlineMail className="w-20 mt-8  h-20 mx-auto" />
          <h1 className="text-center mb-8 text-xl font-['ibm_plex_mono'] ">
            Check your Email!
          </h1>

          <div className=" px-15 flex  flex-col">
            <label htmlFor="OTP" className="font-['ibm_plex_mono'] mb-2 ">
              Enter OTP
            </label>
            <input
              type="number"
              ref={otpRef}
              required
              className="bg-slate-700 py-2 border   border-gray-500 rounded-md mb-5 text-white  px-2 placeholder:text-md placeholder:text-gray-200  placeholder:opacity-50 "
              name=""
              id="OTP"
              placeholder="* * * *"
            />

            {Error && (
              <p className="mb-2 text-red-500">{"Something went wrong"}</p>
            )}

            <div
              onClick={() => setState(3)}
              className="bg-sky-700 hover:bg-sky-500 transition-all py-2 mb-5 rounded-md px-2 placeholder:text-md"
            >
              <p className="font-['ibm_plex_mono'] text-center ">Verify</p>
            </div>

            <div
              onClick={() => {
                navigate("/login");
              }}
              className="py-2 flex gap-1 hover:gap-3 hover:text-sky-500 transition-all items-center justify-center rounded-md px-2 placeholder:text-md"
            >
              <IoIosArrowBack className="h-6 w-6 " />
              <p className="font-['ibm_plex_mono'] text-center ">
                Back to Login
              </p>
            </div>
          </div>
        </div>
      )}

      {/* state 3 */}

      {State == 3 && (
        <div className="bg-slate-900 w-[40%] border border-gray-500 rounded-xl text-white h-[60%]">
          <TbPasswordMobilePhone className="w-20 mt-10  h-20 mx-auto" />
          <h1 className="text-center mb-8 text-xl font-['ibm_plex_mono'] ">
            Enter New Password
          </h1>

          <div className=" px-15 flex  flex-col">
            <label htmlFor="OTP" className="font-['ibm_plex_mono'] mb-2 ">
              New Password
            </label>
            <input
              type="password"
              ref={newPasswordRef}
              required
              className="bg-slate-700 py-2 border   border-gray-500 rounded-md mb-5 text-white  px-2 placeholder:text-md placeholder:text-gray-200  placeholder:opacity-50 "
              name=""
              id="OTP"
              placeholder="* * * *"
            />

            <label htmlFor="OTP" className="font-['ibm_plex_mono'] mb-2 ">
              Confirm Password
            </label>
            <input
              type="password"
              ref={conPasswordRef}
              required
              className="bg-slate-700 py-2 border   border-gray-500 rounded-md mb-5 text-white  px-2 placeholder:text-md placeholder:text-gray-200  placeholder:opacity-50 "
              name=""
              id="OTP"
              placeholder="* * * *"
            />
            {Error && (
              <p className="mb-2 text-red-500">{"Something went wrong"}</p>
            )}

            <div className="bg-sky-700 hover:bg-sky-500 transition-all py-2 mb-4 rounded-md px-2 placeholder:text-md">
              <p className="font-['ibm_plex_mono'] text-center ">
                Change Password
              </p>
            </div>

            <div
              onClick={() => {
                navigate("/login");
              }}
              className="py-2 flex gap-1 hover:gap-3 hover:text-sky-500 transition-all items-center justify-center rounded-md px-2 placeholder:text-md"
            >
              <IoIosArrowBack className="h-6 w-6 " />
              <p className="font-['ibm_plex_mono'] text-center ">
                Back to Login
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPass;
