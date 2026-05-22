import "@fontsource/inter";
import "@fontsource/space-grotesk";
import "@fontsource/jetbrains-mono";
import "@fontsource/ibm-plex-mono";
import { FaCode } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {  useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Nav = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showOpt, setshowOpt] = useState(false);
  

  const toggleShowOpt = () => {
    setshowOpt(!showOpt);
  };

  const handleLogout = async () => {
    try {
      await axios.get(BASE_URL + "/logout", {
        withCredentials: true,
      });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  
  

  return ( 
    <div className="fixed md:px-25 px-10 flex items-center justify-between top-0 bg-[linear-gradient(180deg,#051424_0%,#020817_100%)]  h-18 border-b-slate-800 border w-full ">
      <div className="flex gap-10 items-center">
        <div className="font-['space_grotesk'] flex items-center gap-2 text-2xl  md:text-3xl text-[#cddefe] tracking-tight font-black">
          <span>
            <FaCode />
          </span>
          CodeLikePro
        </div>
        <div className="flex gap-6">
          <p className="font-['ibm_plex_mono'] hover:text-[#eaf1fc] cursor-pointer transition-all delay-100 hidden md:block font-black text-[13px] text-[#c2c8d9] tracking-tight ">
            Curriculum
          </p>
          <p className="font-['ibm_plex_mono'] font-black cursor-pointer transition-all hover:text-[#eaf1fc] hidden md:block text-[13px] text-[#c2c8d9] delay-100 tracking-tight ">
            Bootcamps
          </p>
        </div>
      </div>
      <div className="text-[#c2c8d9] flex gap-5">
        {user && (
          <div onClick={handleLogout} className="bg-[rgb(54,170,248)] rounded-md py-1 px-2 md:px-3 font-['ibm_plex_mono'] font-black cursor-pointer transition-all text-[#191919] md:text-md text-[14px] delay-100 tracking-tight">
            Logout
          </div>
        )}

        {!user && <div>Login</div>}

        {user?.photoUrl && (
          <img
            onClick={toggleShowOpt}
            className="w-8 hidden md:block cursor-pointer rounded-full"
            src={user?.photoUrl}
            alt=""
          />
        )}
      </div>
      <div
        className={`absolute rounded-md bg-slate-900 border flex  flex-col border-gray-700 py-1 px-3 text-white  top-16 right-2 ${showOpt ? "block " : "hidden"}`}
      >
        <p className="font-['inter'] text-sm cursor-pointer transition-all hover:text-[rgb(54,170,248)] ">
          Profile
        </p>
        <p className="font-['inter'] text-sm cursor-pointer transition-all hover:text-[rgb(54,170,248)]">
          Change password
        </p>
        {user?.role === "educator" && (
          <p className="font-['inter'] text-sm cursor-pointer transition-all hover:text-[rgb(54,170,248)]">
            Dashboard
          </p>
        )}
      </div>
    </div>
  );
};

export default Nav;
