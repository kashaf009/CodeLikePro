import { useSelector } from "react-redux";
import { AiOutlineProduct } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreatorDashboard = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  return (
    user && (
      <div className="p-4 px-20 pt-15 bg-slate-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-1">Welcome back, {user.name}!</h1>
        <p className="text-gray-300 mb-8">
          Here's what's happening with your content and audience.
        </p>
        <div className="w-ful border border-gray-700 bg-slate-800 flex rounded-xl p-5 mb-5">
          <div className="w-[30%] relative mt-10 mb-10 flex justify-center items-center h-full">
            <img
              src={user?.photoUrl}
              alt="profile"
              className=" h-50 w-50 rounded-full border border-gray-600"
            />
          </div>
          <div className="ml-10 mt-10">
            <h2 className="text-5xl  mb-5   font-bold"> {user.name}</h2>
            <p className="text-gray-300 mb-2 text-2xl font-bold">
              {" "}
              Courses : 0
            </p>
            <p className="text-gray-300 text-2xl mb-2 font-bold">
              Students : 0
            </p>
            <p className="text-gray-300 text-2xl mb-2 font-bold">
              Earnings : $ NA
            </p>
             <div onClick={()=>navigate("/dashboard/courses")} className="absolute bg-slate-900 cursor-pointer hover:bg-slate-800 gap-3 rounded-md border border-gray-600    hover:border-gray-400 flex items-center py-2 px-3 top-44 right-25">
                <div><AiOutlineProduct className="text-xl" /></div>
                <p className="text-center text-xl  text-white font-bold">Your Content</p>
            </div>
            
          </div>

           


        </div>
      </div>
    )
  );
};

export default CreatorDashboard;
