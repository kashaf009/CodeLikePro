import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Home = () => {
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
  }, [user]);

  return <div>Home</div>;
};

export default Home;
