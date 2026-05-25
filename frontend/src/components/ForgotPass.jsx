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
import validator from "validator";
import { MdOutlineVerified } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPass = () => {
  const toEmailIdRef = useRef(null);
  const otpRef = useRef(null);
  const [loading, setloading] = useState(false);
  const newPasswordRef = useRef(null);
  const conPasswordRef = useRef(null);
  const [toEmailId, settoEmailId] = useState(null);
  const [PassResetSuccessful, setPassResetSuccessful] = useState(false);
  const [showPass, setshowPass] = useState(false);

  const toggleShowPass = () => {
    setshowPass(!showPass);
  };

  const navigate = useNavigate();
  const [State, setState] = useState(3);
  const [Error, setError] = useState(null);

  const handleSendEmail = async () => {
    setError(null);
    setloading(true);
    try {
      settoEmailId(toEmailIdRef.current.value.trim().toLowerCase());
      console.log(toEmailId);

      if (!toEmailId) {
        setError("Enter Email");
        return;
      }

      if (!validator.isEmail(toEmailId)) {
        setError("enter valid email");
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
      setState(2);

      return;
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError(null);
    // const toEmailId = toEmailIdRef.current.value.trim().toLowerCase();
    const otp = otpRef.current.value.trim();
    if (!otp) {
      setError("Enter otp");
      return;
    }

    if (otp.length !== 4) {
      setError("enter valid otp ,otp must be of 4 digit");
    }
    try {
      console.log(toEmailId);
      console.log(otp);

      setloading(true);

      await axios.post(
        BASE_URL + "/verifyotp",
        {
          toEmailId,
          otp,
        },
        { withCredentials: true },
      );

      console.log("OTP verification successfull ");
      setState(3);

      return;
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      setloading(false);
    }
  };

  const handleResetPass = async () => {
    setError(null);

    const newPassword = newPasswordRef.current.value.trim();
    const conPassword = conPasswordRef.current.value.trim();

    if (!newPassword) {
      setError("Enter new password");
      return;
    }

    if (!validator.isStrongPassword(newPassword)) {
      setError("Enter Strong Password");
      return;
    }

    if (!conPassword) {
      setError("Confirm new password");
      return;
    }

    if (newPassword !== conPassword) {
      setError("Password did'nt matched, try again");
      return;
    }

    setloading(true);
    try {
      await axios.patch(
        BASE_URL + "/resetpassword",
        {
          toEmailId,
          newPassword,
        },
        { withCredentials: true },
      );

      console.log("password reset successful");
      setPassResetSuccessful(true);
      setState(4);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "something went wrong",
      );
    } finally {
      setloading(false);
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
              onChange={() => setError(null)}
              required
              className={`bg-slate-700 py-2 border   border-gray-500 rounded-md  text-white  px-2 placeholder:text-md placeholder:text-gray-200  placeholder:opacity-50 ${Error ? "mb-2" : "mb-5"}`}
              name=""
              id="email"
              placeholder="Code123@gmail.com"
            />
            {Error && <p className="mb-2 text-red-500">{Error}</p>}

            <div
              onClick={handleSendEmail}
              className={`bg-sky-700 hover:bg-sky-500 transition-all py-2 mb-5 rounded-md px-2 placeholder:text-md disabled:${loading}`}
            >
              <p
                className={`font-['ibm_plex_mono']   text-center disabled:${loading} `}
              >
                {loading ? (
                  <ImSpinner2 className="animate-spin mx-auto text-md  justify-center " />
                ) : (
                  "Send Email"
                )}
              </p>
            </div>

            <div
              onClick={() => {
                navigate("/login");
              }}
              className="py-2 flex gap-1 hover:gap-3 hover:text-sky-500 transition-all items-center justify-center rounded-md px-2 mb-3 placeholder:text-md"
            >
              <IoIosArrowBack className="h-6 w-6  " />
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
              type="text"
              ref={otpRef}
              onChange={() => setError(null)}
              required
              className="bg-slate-700 py-2 border   border-gray-500 rounded-md mb-5 text-white  px-2 placeholder:text-md placeholder:text-gray-200  placeholder:opacity-50 "
              name=""
              id="OTP"
              placeholder="* * * *"
            />

            {Error && <p className="mb-2 text-red-500">{Error}</p>}

            <div
              onClick={handleVerifyOTP}
              className={`bg-sky-700 hover:bg-sky-500 disabled:${loading} transition-all py-2 mb-5 rounded-md px-2 placeholder:text-md`}
            >
              <p
                className={`font-['ibm_plex_mono']   text-center disabled:${loading} `}
              >
                {loading ? (
                  <ImSpinner2 className="animate-spin mx-auto text-md  justify-center " />
                ) : (
                  "Verify"
                )}
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
            <div className="flex items-center border bg-slate-700 rounded-md mb-3 border-gray-500">
              <input
                type={`${showPass ? "text" : "password"}`}
                onChange={() => setError(null)}
                ref={newPasswordRef}
                required
                className="bg-slate-700 py-2  w-[95%]  outline-none  text-white  px-2 placeholder:text-md placeholder:text-gray-200  placeholder:opacity-50 "
                name=""
                id="OTP"
                placeholder="* * * *"
              />
              <span className="mr-3" onClick={toggleShowPass}>
                {showPass ? (
                  <FaEyeSlash className="text-white" />
                ) : (
                  <FaEye className="text-white" />
                )}
              </span>
            </div>

            <label htmlFor="OTP" className="font-['ibm_plex_mono'] mb-2 ">
              Confirm Password
            </label>
            <div className={`flex items-center border bg-slate-700 rounded-md  border-gray-500 ${Error? "mb-2":"mb-5"}`}>
              <input
                type={`${showPass ? "text" : "password"}`}
                onChange={() => setError(null)}
                ref={conPasswordRef}
                required
                className="py-2  w-[95%]  outline-none   text-white  px-2 placeholder:text-md placeholder:text-gray-200  placeholder:opacity-50 "
                name=""
                id="OTP"
                placeholder="* * * *"
              />
              <span className="mr-3" onClick={toggleShowPass}>
                {showPass ? (
                  <FaEyeSlash className="text-white" />
                ) : (
                  <FaEye className="text-white" />
                )}
              </span>
            </div>
            {Error && <p className="mb-2 text-red-500">{Error}</p>}

            <div
              onClick={handleResetPass}
              className={`bg-sky-700 disabled:${loading} hover:bg-sky-500 transition-all py-2 mb-4 rounded-md px-2 placeholder:text-md`}
            >
              <p
                className={`font-['ibm_plex_mono']   text-center disabled:${loading} `}
              >
                {loading ? (
                  <ImSpinner2 className="animate-spin mx-auto text-md  justify-center " />
                ) : (
                  "Change password"
                )}
              </p>
            </div>

            <div
              onClick={() => {
                navigate("/login");
              }}
              className="py-2 flex gap-1 hover:gap-3 hover:text-sky-500 transition-all items-center justify-center  mb-3 rounded-md px-2 placeholder:text-md"
            >
              <IoIosArrowBack className="h-6 w-6 " />
              <p className="font-['ibm_plex_mono'] text-center ">
                Back to Login
              </p>
            </div>
          </div>
        </div>
      )}

      {/* state 4  */}

      {PassResetSuccessful && State == 4 && (
        <div className="bg-slate-900 w-[40%] border border-gray-500 rounded-xl text-white h-[50%]">
          <MdOutlineVerified className="w-30 mt-8 text-green-500 mb-2 h-30 mx-auto" />
          <h1 className="text-center mb-8 text-xl font-['ibm_plex_mono'] ">
            Password Reset Successful
          </h1>

          <div className=" px-15 flex  flex-col">
            <div
              onClick={() => {
                navigate("/login");
              }}
              className="py-2 flex bg-sky-500  mb-8 gap-1 hover:gap-3 text-black transition-all items-center justify-center rounded-md px-2  placeholder:text-md"
            >
              <IoIosArrowBack className="h-6 w-6  " />
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
