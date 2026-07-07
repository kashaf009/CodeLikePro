import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import courseReducer from "./courseSlice";
import lectureReducer from  "./lectureSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    lecture:lectureReducer
  },
});

export default store;
