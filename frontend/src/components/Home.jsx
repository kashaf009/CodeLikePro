import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const user = useSelector((store)=>store.user)
  const navigate = useNavigate()

  useEffect(() => {
   if(!user){
    navigate("/signup")
   }
  }, [])
  

  return (
    <div>Home</div>
  )
}

export default Home