import { createSlice } from "@reduxjs/toolkit";


const courseSlice = createSlice({
    name: "course",
    initialState: [],
    reducers: {
        addCourses:(state,action)=>{
            return [...state, ...action.payload];
        }

}})

export const { addCourses} = courseSlice.actions;
export default courseSlice.reducer;