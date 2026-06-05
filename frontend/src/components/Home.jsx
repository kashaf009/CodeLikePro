import "@fontsource/inter";
import "@fontsource/space-grotesk";
import "@fontsource/jetbrains-mono";
import "@fontsource/ibm-plex-mono";
import Nav from "./Nav";
import code from "../assets/code.png"


const Home = () => {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Nav className="" />

      <section className="w-full bg-slate-950 min-h-screen  mt-18 grid grid-cols-2  ">
        <div className="text-white pl-40 pt-50">
          <div className="bg-[rgb(20,3,45)] mb-8 rounded-4xl border border-[#26baff] px-2 py-1 w-[28%]">
            <p className="uppercase text-[0.7rem] text-center font-['inter'] font-extrabold tracking-tight text-[#88cffb]   ">
              elite course track
            </p>
          </div>

          <p className="font-['inter'] mb-3 text-5xl font-extrabold tracking-tight text-[#dfe9f6]">
            Master the Code.
          </p>
          <p className="font-['inter'] mb-8 text-5xl font-extrabold tracking-tight text-[#4CD7F6]">
            Own the Future.
          </p>

          <p className="text-gray-200 w-[80%]">
            Join the world's most intensive software engineering bootcamps.
            Built for ambitious developers ready to transition into
            high-performance engineering roles at top-tier tech companies.
          </p>

          <div className="flex gap-5 mt-15">
            <div className="bg-[#01cbf8] py-2 hover:bg-[#4ddeff] cursor-pointer px-5 rounded-md ">
              <p className="font-['space_grotesk'] flex gap-3  text-md  text-black font-bold ">
                Explore 
              </p>
            </div>
            <div className="bg-slate-950 border rounded-md border-white py-2 px-5 hover:bg-slate-800 cursor-pointer">
              <p className="text-md font-extrabold font-['space_grotesk'] ">
                View Curriculum
              </p>
            </div>
          </div>
        </div>
        <div className="text-white">
          <div className="mb-40">
            <img className="w-[70%] mt-55 brightness-80 saturate-200 rounded-md border-8  border-slate-700"
              src={code}
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
