import "@fontsource/inter";
import "@fontsource/space-grotesk";
import "@fontsource/jetbrains-mono";
import "@fontsource/ibm-plex-mono";
import { FaCode } from "react-icons/fa";

const Signup = () => {
  return (
    <div className="grid grid-cols-2">
      {/* left side  */}
      <div className="pl-20 pt-30 w-full min-h-screen  bg-[radial-gradient(circle_at_top_left,rgba(76,215,246,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(109,40,255,0.15),transparent_40%),linear-gradient(180deg,#102A43_0%,#07192E_100%)]">
        <h1 className="font-['inter'] flex items-center gap-2 text-4xl text-[#A8B3C7] tracking-tight font-extrabold mb-10">
          CodeLikePro
          <span className="">
            <FaCode />
          </span>
        </h1>
        <p className="font-['inter'] mb-3 text-5xl font-extrabold tracking-tight text-[#dfe9f6]">
          Engineer your
        </p>
        <p className="font-['inter'] text-5xl font-extrabold tracking-tight text-[#5BE7FF]">
          career trajectory.
        </p>

        <p className="font-['inter'] text-[17px] text-[#a2adbd] w-[70%] mt-10">
          Join an elite cohort of developers mastering{" "}
          <span className="text-[]">backend</span>,{" "}
          <span className="text-[]">Agentic ai</span> ,{" "}
          <span className="text-[]">system design</span>,{" "}
          <span className="text-[]">performance engineering</span>, and the{" "}
          <span className="text-[]">architectural patterns</span> used by the
          world's top tech teams.
        </p>

        <div className="w-[55%] mt-15 flex justify-between">
          <div className="font-['inter'] text-3xl text-[#dfe9f6] font-bold ">
            {" "}
            5k+
            <br />
            <p className="text-[12px] mt-1 font-extrabold text-[#9ba6bb]">
              ACTIVE STUDENTS
            </p>
          </div>
          <div className="font-['inter'] text-3xl text-[#dfe9f6] font-bold ">
            {" "}
            20+
            <br />
            <p className="text-[12px] mt-1 font-extrabold text-[#9ba6bb]">
              PRO BOOTCAMP
            </p>
          </div>
        </div>
        {/* testimonial */}
          <div className="bg-[#132339] rounded-md border border-gray-700 mt-10 h-40 w-[60%]">
            <div className="pl-5 pt-4 pr-5">
              <p className="text-[#eaf0fa]">Marcus Chen</p>
              <p className="text-xs mb-3 text-[#BFC7D5]">L6 Engineer @ CloudStack</p>
                <p className="text-[#BFC7D5]">"The curriculum didn't just teach me syntax; it taught me how to think like a staff engineer. The Code Sandbox is a game changer."</p>
            </div>


          </div>


      </div>

      {/* signup side */}
      <div className="p-20 pt-25 bg-[linear-gradient(180deg,#051424_0%,#020817_100%)]">
        <h1 className="text-white">Start Your Journey.</h1>
      </div>
    </div>
  );
};

export default Signup;
