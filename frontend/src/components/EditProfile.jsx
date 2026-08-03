import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import "@fontsource/inter";
import "@fontsource/space-grotesk";
import "@fontsource/jetbrains-mono";
import "@fontsource/ibm-plex-mono";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";


const EditProfile = () => {
    
  const user = useSelector((store) => store.user);
    
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name);
  const [photo, setPhoto] = useState(user?.photoUrl); // old photo URL
  const [error, seterror] = useState(null);
  const [descprition, setdescprition] = useState(user?.descprition || "");

  const [state, setstate] = useState(1);

  const [newPhoto, setNewPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewPhoto(file);
      setPhoto(URL.createObjectURL(file)); // preview new image
    }
  };

  const handleupdateprofile = async () => {
    seterror(null);

    try {
      setloading(true);

      if (
        (name === user?.name &&
          descprition === user?.descprition &&
          photo === user.photoUrl) &&
        newPhoto === null
      ) {
        seterror("cannot update same values or empty values");
        return;
      }

      const formData = new FormData();
      if (name) {
        formData.append("name", name);
      }

      if (descprition) {
        formData.append("descprition", descprition);
      }

      console.log(newPhoto);

      if (newPhoto) {
        formData.append("photo", newPhoto);
      }

      const response = await axios.post(BASE_URL + "/updateProfile", formData, {
        withCredentials: true,
      });

      if (response) {
        setstate(2);
      }

      console.log(response.data);
    } catch (error) {
      seterror(error.message || "something went wrong");
    } finally {
      setloading(false);
    }
  };


  const handlebacktologin=()=>{
    navigate("/profile")
     localStorage.setItem("reloadOnce", "true");
  }

  useEffect(() => {
    if (!user) navigate("/profile");
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-slate-950 items-center px-4 py-10 md:py-16">
      {state == 1 && (
        <section className="w-full max-w-md md:max-w-lg px-6 sm:px-10 lg:px-12 py-8 md:py-10 rounded-xl border border-slate-700 bg-slate-900">
          <h1 className="text-center text-white uppercase mb-8 text-xl font-black tracking-tighter font-['IBM_Plex_Mono']">
          Edit Profile 
          </h1>
          <div>
            <img
              className="w-24 h-24 md:w-28 md:h-28 mb-4 rounded-full mx-auto border-4 border-slate-700 object-cover"
              src={photo}
              alt="profile"
            />
          </div>
          <p className="text-2xl font-bold text-white text-center mb-8">{name}</p>

          <div className="mb-5">
            <label
              className="text-[#cdd3de] uppercase text-sm font-black tracking-tighter font-['IBM_Plex_Mono']"
              htmlFor="email"
            >
              Name
            </label>
            <input
              value={name}
              className="w-full mt-2 cursor-pointer border rounded-md outline-none border-gray-600 bg-slate-800 text-[#dfe9f6] py-2.5 px-4 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
              id="text"
              onClick={() => seterror(null)}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              className="text-[#cdd3de] uppercase text-sm font-black tracking-tighter font-['IBM_Plex_Mono']"
              htmlFor="photo"
            >
              photo
            </label>
            <input
              className="w-full mt-2 text-cyan-100 cursor-pointer border rounded-md outline-none border-gray-600 bg-slate-800 py-2.5 px-4 file:mr-3 file:rounded-md file:border-0 file:bg-slate-700 file:px-3 file:py-1.5 file:text-sm file:text-gray-100 transition"
              id="photo"
              type="file"
              onClick={() => seterror(null)}
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>

          {
            <div className={`${error ? "mb-2" : "mb-5"}`}>
              <label
                className="text-[#cdd3de] uppercase text-sm font-black tracking-tighter font-['IBM_Plex_Mono']"
                htmlFor="bio"
              >
                bio
              </label>

              <textarea
                className="w-full cursor-pointer mt-2 border rounded-md outline-none border-gray-600 bg-slate-800 text-[#dfe9f6] py-2.5 px-4 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
                id="bio"
                onClick={() => seterror(null)}
                onChange={(e) => setdescprition(e.target.value)}
                value={descprition }
                placeholder="bio"
              />
            </div>
          }
          <p className="text-red-400 text-md mb-3">{error}</p>

          <div
            onClick={handleupdateprofile}
            className="bg-[#4CD7F6] cursor-pointer hover:bg-[#85e4f9] transition rounded-md mt-2 py-2.5 px-4"
          >
            <p className="text-center uppercase text-md font-black tracking-tighter font-['IBM_Plex_Mono']">
              {loading ? (
                <ImSpinner2 className="animate-spin mx-auto text-md justify-center" />
              ) : (
                "Save"
              )}
            </p>
          </div>
        </section>
      )}

      {state == 2 && (
        <section className="w-full max-w-md px-6 sm:px-10 py-10 rounded-xl border border-slate-700 bg-slate-900">
          <h1 className="text-2xl text-white mb-5 font-['IBM_Plex_Mono'] text-center">
            Profile updated successfully
          </h1>

          <div>
            <IoCheckmarkDoneCircleSharp className="fill-green-500 mb-8 mx-auto w-30 h-30" />
          </div>

          <div
            onClick={handlebacktologin}
            className="text-center py-1.5 cursor-pointer w-full md:w-[70%] mx-auto rounded-md bg-cyan-300 font-['IBM_Plex_Mono'] text-md"
          >
            <p className="text-black flex hover:gap-4 items-center transition-all justify-center gap-2">
              Back to Profile{" "}
              <span>
                <IoIosArrowForward />
              </span>
            </p>
          </div>
        </section>
      )}


      <div onClick={()=>navigate("/profile")} className="z-10 absolute top-17 left-7 md:top-10 md:left-10 flex items-center gap-2 cursor-pointer group">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 group-hover:border-cyan-500 text-white transition shrink-0">
          <IoIosArrowBack className="w-4 h-4" />
        </span>

       
      </div> 
    </div>
  );
};

export default EditProfile;
