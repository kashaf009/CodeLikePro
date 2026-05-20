import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import axios from "axios";
import { BASE_URL } from "./utils/constants.js";
import { addUser } from "./utils/userSlice.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    if (user) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      // console.log(res.data.user);
      dispatch(addUser(res.data.user));

      //
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/signup");
      }
      console.log(error.message);
    }
  };
  useEffect(() => {
    if(!user){
    fetchUser();
    }
  }, []);
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>  
      <Route path="/login" element={<Login/>}/>

     
    </Routes>

    </>
  )
}

export default App