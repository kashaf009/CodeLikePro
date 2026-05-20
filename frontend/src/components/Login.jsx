import "@fontsource/inter";
import "@fontsource/ibm-plex-mono";
import { useEffect, useRef, useState } from "react";
import { FaEye, FaGoogle } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { ImSpinner2 } from "react-icons/im";

const Login = () => {
  const user = useSelector((store) => store.user);
  const [showPass, setshowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [error, setError] = useState();

  const toggleShowPass = () => {
    setshowPass(!showPass);
  };

  const emailIdRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async () => {
    const emailId = emailIdRef.current.value;
    const password = passwordRef.current.value;

    try {
      setLoading(true);
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      console.log(response.data);
      dispatch(addUser(response?.data?.user));
      navigate("/");

      //
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="flex justify-center w-full bg-[linear-gradient(180deg,#051424_0%,#020817_100%)]  min-h-screen ">
      <div className="w-[35%] mx-auto">
        <img
          className="w-12 mx-auto   mb-5 mt-12 rounded-md  brightness-200"
          src="icon.png"
          alt=""
        />
        <h1 className="text-5xl mb-2 text-center font-extrabold text-[#dfe9f6]">
          Welcome Back,
        </h1>
        <p className="text-5xl mb-3 font-extrabold text-[#dfe9f6] text-center">
          Architect.
        </p>
        <p className="text-center font-['IBM_Plex_Mono'] text-xl mb-8 tracking-tight text-[#a2adbd]">
          login to continue
        </p>
        <div className="bg-[linear-gradient(180deg,#16233b_0%,#101b30_100%)] rounded-md mb-20 px-10 pt-12 border border-white/10 backdrop-blur-xl  ">
          <div className="flex gap-2 mb-5 flex-col ">
            <label
              className="uppercase font-black text-[12px] font-['IBM_Plex_Mono'] text-[#c6cedc]"
              htmlFor="email"
            >
              Email
            </label>
            <div className="focus-within:border-[#3dd8fb] border rounded-md ">
              <input
                ref={emailIdRef}
                className="bg-slate-900 px-3 w-full outline-none text-[#c6cedc] placeholder:font-['inter'] placeholder:text-gray-600 rounded-md py-2 border  border-gray-600"
                type="email"
                placeholder="codelikepro@gmail.com"
                name=""
                id="email"
              />
            </div>
          </div>
          <div className="flex gap-2 mb-8 flex-col ">
            <div className="flex items-center justify-between">
              <label
                className="uppercase font-black text-[12px]  font-['IBM_Plex_Mono'] text-[#c6cedc]"
                htmlFor="password"
              >
                Password
              </label>
              <p className="font-['IBM_Plex_Mono'] border-b border-transparent  hover:border-b-[#3dd8fb]  cursor-pointer text-center uppercase text-[10px] text-[#3dd8fb]">
                Forgot password?
              </p>
            </div>
            <div className="flex w-full items-center bg-slate-900 focus-within:border-[#3dd8fb] rounded-md border border-gray-600">
              <input
                ref={passwordRef}
                className="bg-slate-900 w-[95%]  px-3 text-[#c6cedc] placeholder:font-['inter'] placeholder:text-gray-700 rounded-md mb-1 py-2 outline-none "
                type={showPass ? "text" : "password"}
                name=""
                id="password"
                placeholder="Password"
              />
              <span className="mr-3" onClick={toggleShowPass}>
                {showPass ? (
                  <FaEyeSlash className="text-white" />
                ) : (
                  <FaEye className="text-white" />
                )}
              </span>
            </div>
            {error && <p className="text-red-600 mt-2 text-md ">{error}</p>}

            <div
              htmlFor="login"
              className={`w-full cursor-pointer   py-2 px-4 rounded-md hover:opacity-90 bg-[rgb(54,170,248)] ${error ? "mt-2" : "mt-5"}  ${loading ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
            >
              <p
                onClick={!loading ? handleLogin : null}
                id="login"
                className={`text-center font-['IBM_Plex_Mono']  uppercase text-[#c6cedc] ${loading ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
              >
                {loading ? (
                  <>
                    <ImSpinner2 className="animate-spin mx-auto justify-center " />
              
                  </>
                ) : (
                  "Login"
                )}
              </p>
            </div>
            <div className="mt-5   mb-5">
              <p className="text-gray-400 font-['IBM_Plex_Mono'] tracking-tight text-center text-xs">
                OR AUTHENTICATE WITH{" "}
              </p>
            </div>

            <div className="flex cursor-pointer justify-center mb-5 border hover:bg-slate-900 border-gray-600 py-2 rounded-md items-center ">
              <span>
                <FaGoogle className="text-white" />
              </span>
              <p className="text-white">oogle</p>
            </div>

            <p className="text-center font-['IBM_Plex_Mono'] tracking-tight text-sm text-gray-400">
              Already have an account?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
                className="text-[#31d8f5] cursor-pointer hover:text-[#01a5c2] text-sm"
              >
                Signup
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
