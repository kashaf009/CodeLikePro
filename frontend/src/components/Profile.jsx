import { useSelector } from 'react-redux';
import "@fontsource/inter";
import "@fontsource/space-grotesk";
import "@fontsource/jetbrains-mono";
import "@fontsource/ibm-plex-mono";
import {  useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";





const Profile = () => {

    const user = useSelector((store)=>store.user)
    const navigate = useNavigate()
    // console.log(user);

    useEffect(() => {

  if (localStorage.getItem("reloadOnce")) {

    localStorage.removeItem("reloadOnce");

    window.location.reload();

  }

}, []);

    

    
    
    
  return ( 
    <div className="flex justify-center min-h-screen bg-slate-950 items-center px-4 py-10 md:py-16">

        <div onClick={()=>navigate("/")} className="z-10 absolute top-17 left-7 md:top-10 md:left-10 flex items-center gap-2 cursor-pointer group">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 group-hover:border-cyan-500 text-white transition shrink-0">
            <IoIosArrowBack className="w-4 h-4" />
          </span>

        
        </div>

        <section className="w-full max-w-md md:max-w-lg px-6 sm:px-10 lg:px-12 py-8 md:py-10 rounded-xl border border-slate-700 bg-slate-900">
          <h1 className="text-center uppercase mb-8 text-white text-xl font-black tracking-tighter font-['IBM_Plex_Mono']">Profile</h1>
            <div>
              <img
                className="w-24 h-24 md:w-28 md:h-28 mb-4 rounded-full mx-auto border-4 border-slate-700 object-cover"
                src={user?.photoUrl}
                alt=""
              />
            </div>
            <p className="text-2xl font-bold text-white text-center mb-8">{user?.name}</p>
            
            <div className="mb-5">
            <label
              className="text-[#cdd3de] text-sm font-black tracking-tighter font-['IBM_Plex_Mono']"
              htmlFor="email"
            >
              EMAIL
            </label>
            <input
              value={user?.emailId}
              className="w-full mt-2 border rounded-md outline-none border-gray-600 bg-slate-800 text-[#dfe9f6] py-2.5 px-4"
              id="email"
              type="text"
              disabled
            />
          </div>

          <div className="mb-5">
            <label
              className="text-[#cdd3de] text-sm font-black tracking-tighter font-['IBM_Plex_Mono']"
              htmlFor="role"
            >
              ROLE
            </label>
            <input
              value={user?.role}
              className="w-full mt-2 border rounded-md outline-none border-gray-600 bg-slate-800 text-[#dfe9f6] py-2.5 px-4"
              id="role"
              type="text"
              disabled
            />
          </div>
        { 
          <div className="mb-5">
            <label
              className="text-[#cdd3de] uppercase text-sm font-black tracking-tighter font-['IBM_Plex_Mono']"
              htmlFor="description"
            >
              bio
            </label>

            <textarea
              value={user?.descprition}
              className="w-full mt-2 border rounded-md outline-none border-gray-600 bg-slate-800 text-[#dfe9f6] py-2.5 px-4"
              id="role"
              placeholder={user?.descprition ? user.descprition : "Empty"}
              
              disabled
            />
          </div>}

          { user?.enrolledCourse && <div className="mb-5">
            <label
              className="text-[#cdd3de] uppercase text-sm font-black tracking-tighter font-['IBM_Plex_Mono']"
              htmlFor="role"
            >
              course enrolled
            </label>
            <input
              value={user?.enrolledCourse.length}
              className="w-full mt-2 border rounded-md outline-none border-gray-600 bg-slate-800 text-[#dfe9f6] py-2.5 px-4"
              id="role"
              type="text"
              disabled
            />
          </div>}

          <div onClick={()=>navigate("/editprofile")} className="bg-[#4CD7F6] cursor-pointer hover:bg-[#85e4f9] transition rounded-md mt-6 py-2.5 px-4">
            <p className="text-center uppercase cursor-pointer text-md font-black tracking-tighter font-['IBM_Plex_Mono']">Edit profile</p>
          </div>

        </section>

    </div>
    
  )
}

export default Profile
