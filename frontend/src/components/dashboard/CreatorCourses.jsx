import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreatorCourses = () => {
    const navigate = useNavigate();
  return (
    <div className="p-4 px-30 pt-15 bg-slate-900 min-h-screen text-white">

        <div onClick={()=> navigate('/dashboard/create-course')} className="absolute text-white text-xl flex items-center cursor-pointer hover:bg-blue-700 gap-2 bg-blue-900 px-3 rounded-md py-1  top-16 right-31">
                <div><AiOutlinePlus className="text-md" /></div>
            <p> Create course</p>
            </div>

        <h1 className="text-3xl font-bold mb-1">Your Courses</h1>
        <table className="w-full  border border-gray-700 mt-5">
            <thead>
                <tr>
                    <th className="border border-gray-700 px-4 py-2">thumbnail</th>
                    <th className="border border-gray-700 px-4 py-2">Course Title</th>
                    <th className="border border-gray-700 px-4 py-2">Status</th>
                    <th className="border border-gray-700 px-4 py-2">Action</th>
                </tr>
            </thead>
           <tbody>
                {<tr>
                    <td className="border border-gray-700 w-1/4 px-4 py-2">
                        <img src="course-thumbnail.jpg" alt="Course Thumbnail" className="w-full h-full object-cover" />
                    </td>
                    <td className="border border-gray-700 px-4 py-2">Course 1</td>
                    <td className="border border-gray-700 px-4 py-2">0</td>
                    <td  className="border border-gray-700 px-4 py-2">edit</td>
                </tr>}
                {/* Add more courses as needed */}
            </tbody>
        </table>
        
    </div>
  )
}

export default CreatorCourses