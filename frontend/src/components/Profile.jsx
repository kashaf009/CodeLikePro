import { useSelector } from 'react-redux';
import "@fontsource/inter";
import "@fontsource/space-grotesk";
import "@fontsource/jetbrains-mono";
import "@fontsource/ibm-plex-mono";

const Profile = () => {
    const user = useSelector((store)=>store.user)
    console.log(user);
    
  return (
    <div className="flex justify-center  min-h-screen bg-slate-950 items-center">


        <section className="px-15 pt-8 rounded-xl border border-gray-400 bg-slate-900 w-[40%] ">
          <h1 className="text-center   uppercase mb-10 text-md text-white text-2xl  font-black tracking-tighter font-['IBM_Plex_Mono']">Profile</h1>
            <div><img className="w-25 mb-3  rounded-full mx-auto"  src={user?.photoUrl} alt="" /></div>
            <p className="text-2xl font-bold  text-white text-center">{user?.name}</p>
            
            <div className="mt-8 mb-5 items-center ">
            <label
              className="text-[#cdd3de]  text-md  font-black tracking-tighter font-['IBM_Plex_Mono']"
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
              className="text-[#cdd3de]  text-md  font-black tracking-tighter font-['IBM_Plex_Mono']"
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
              className="text-[#cdd3de] uppercase  text-md  font-black tracking-tighter font-['IBM_Plex_Mono']"
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

          { user?.enrolledCourse && <div className=" mb-5 items-center ">
            <label
              className="text-[#cdd3de] uppercase  text-md  font-black tracking-tighter font-['IBM_Plex_Mono']"
              htmlFor="role"
            >
              course enrolled
            </label>
            <input
              value={user?.enrolledCourse}
              className="w-full mt-2 border rounded-md outline-none border-gray-600 text-[#dfe9f6] py-2 px-4"
              id="role"
              type="text"
              disabled
            />
          </div>}

          <div className="bg-[#4CD7F6] hover:bg-[#85e4f9] rounded-md mb-10 py-2 px-4">
            <p className=" text-center uppercase  text-md  font-black tracking-tighter font-['IBM_Plex_Mono']">Edit profile</p>
          </div>

        </section>

    </div>
  )
}

export default Profile