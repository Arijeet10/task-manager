import { createAsyncThunk, createSlice,nanoid } from "@reduxjs/toolkit";

//declaring initial state for redux slice
const initialState={
    isloading:false,
    apiTaskData:[],
    isError:false,
};

const url = process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/api";

//GET API request
export const getAPITask=createAsyncThunk("getAPITask",async()=>{
  try {
    const res=await fetch(url,{
      headers:{
        accept:"application/json"
      },
      cache:"no-store"
    })
    const data=res.ok ? await res.json() : Promise.reject(res);
    return data;
    
  } catch (error) {
    console.log("failed to perform FETCH API",error)
  }
});


export const TaskSlice = createSlice({
  name: "addTaskSlice",
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(getAPITask.pending,(state,action)=>{
      state.isloading=true;
    }),
    builder.addCase(getAPITask.fulfilled,(state,action)=>{
      //console.log(action)
      state.isloading=false,
      state.apiTaskData=action.payload
    }),
    builder.addCase(getAPITask.rejected,(state,action)=>{
      console.log("Error",action.payload);
      state.isError(true);
    })
  }
});

export const { saveTask,removeTask } = TaskSlice.actions;
export default TaskSlice.reducer;
