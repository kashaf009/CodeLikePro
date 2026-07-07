import { createSlice } from "@reduxjs/toolkit";


const lectureSlice = createSlice({
    name: "lecture",
    initialState:{
        lectureData:[]
    },
    reducers: {
        addLecture:(state,action)=>{
             state.lectureData = action.payload
        }

}})

export const { addLecture} = lectureSlice.actions;
export default lectureSlice.reducer;