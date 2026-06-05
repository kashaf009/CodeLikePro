import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((store)=>store.user)
    console.log(user);
    
  return (
    <div className="flex justify-center  min-h-screen bg-slate-950 items-center">


        <section className=" pt-20 rounded-xl border border-gray-400 bg-slate-900 w-[40%] ">
            <div><img className="w-20 rounded-full mx-auto"  src={user?.photoUrl} alt="" /></div>
            <p className="text-2xl font-bold text-white text-center">{user?.name}</p>

        </section>

    </div>
  )
}

export default Profile