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
    <div className="flex justify-center  min-h-screen bg-slate-950 items-center">


        <section className="px-15 pt-8 rounded-xl border border-gray-400 bg-slate-900 w-[40%] ">
          <h1 className="text-center   uppercase mb-10  text-white text-xl  font-black tracking-tighter font-['IBM_Plex_Mono']">Profile</h1>
            <div><img className="w-25 mb-3  rounded-full mx-auto"  src={user?.photoUrl} alt="" /></div>
            <p className="text-2xl font-bold  text-white text-center">{user?.name}</p>
            
            <div className="mt-8 mb-5 items-center ">
            <label
              className="text-[#cdd3de]  text-sm  font-black tracking-tighter font-['IBM_Plex_Mono']"
              htmlFor="email"
            >
              EMAIL
            </label>
            <input
              value={user?.emailId}
              className="w-full mt-2 border rounded-md outline-none border-gray-600 text-[#dfe9f6] py-2 px-4"
              id="email"
              type="text"
              disabled
            />
          </div>

          <div className=" mb-5 items-center ">
            <label
              className="text-[#cdd3de]  text-sm  font-black tracking-tighter font-['IBM_Plex_Mono']"
              htmlFor="role"
            >
              ROLE
            </label>
            <input
              value={user?.role}
              className="w-full mt-2 border rounded-md outline-none border-gray-600 text-[#dfe9f6] py-2 px-4"
              id="role"
              type="text"
              disabled
            />
          </div>
        { 
          <div className=" mb-5 items-center ">
            <label
              className="text-[#cdd3de] uppercase  text-sm  font-black tracking-tighter font-['IBM_Plex_Mono']"
              htmlFor="description"
            >
              bio
            </label>

            <textarea
              value={user?.descprition}
              className="w-full mt-2 border rounded-md outline-none border-gray-600 text-[#dfe9f6] py-2 px-4"
              id="role"
              placeholder={user?.descprition ? user.descprition : "Empty"}
              
              disabled
            />
          </div>}

          {user?.enrolledCourse && user.enrolledCourse.length > 0 && (
            <div className=" mb-5 items-center ">
              <label
                className="text-[#cdd3de] uppercase  text-sm  font-black tracking-tighter font-['IBM_Plex_Mono']"
                htmlFor="role"
              >
                Courses Enrolled
              </label>
              <textarea
                value={user.enrolledCourse.join("\n")}
                className="w-full mt-2 min-h-[120px] resize-none rounded-md border border-gray-600 bg-slate-900 text-[#dfe9f6] py-2 px-4"
                id="role"
                disabled
              />
            </div>
          )}
          {(!user?.enrolledCourse || user.enrolledCourse.length === 0) && (
            <div className=" mb-5 items-center ">
              <label
                className="text-[#cdd3de] uppercase  text-sm  font-black tracking-tighter font-['IBM_Plex_Mono']"
                htmlFor="role"
              >
                Courses Enrolled
              </label>
              <input
                value="None"
                className="w-full mt-2 border rounded-md outline-none border-gray-600 text-[#dfe9f6] py-2 px-4"
                id="role"
                type="text"
                disabled
              />
            </div>
          )}

          <div onClick={()=>navigate("/editprofile")} className="bg-[#4CD7F6] hover:bg-[#85e4f9] rounded-md mb-10 py-2 px-4">
            <p className=" text-center uppercase  text-md  font-black tracking-tighter font-['IBM_Plex_Mono']">Edit profile</p>
          </div>

        </section>

       
            <div onClick={()=>navigate("/")} className="flex gap-1 cursor-pointer hover:left-9 absolute hover:gap-2 transition-all items-center top-15 left-10 ">
               <IoIosArrowBack className="w-5 h-5  text-white"/>

              <h1 className="flex gap-1 hover:text-cyan-200  border-b items-center text-2xl font-['IBM_Plex_Mono']  text-white">Back</h1>
              </div> 
    </div>
    
  )
}

export default Profile