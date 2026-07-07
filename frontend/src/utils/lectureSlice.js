import { createSlice } from "@reduxjs/toolkit";


const lectureSlice = createSlice({
    name: "course",
    initialState:{
        lectureDate:[]
    },
    reducers: {
        addLecture:(state,action)=>{
             state.lectureDate = action.payload
        }

}})

export const { addLecture} = lectureSlice.actions;
export default lectureSlice.reducer;