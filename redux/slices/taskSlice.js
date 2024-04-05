import { createAsyncThunk, createSlice,nanoid } from "@reduxjs/toolkit";

//declaring initial state for redux slice
const initialState={
    isloading:false,
    apiTaskData:[],
    isError:false,
};



//GET API request
export const getAPITask=createAsyncThunk("getAPITask",async()=>{
  try {
    const res=await fetch("http://localhost:3000/api/",{
      cache:"no-store",
    })
    .then(res=>res.json())
    .catch(error=>console.log("Error in GET API request",error));
    if(res.ok){
      console.log("GET API request succesful.",res);
    } 
    return res;
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
