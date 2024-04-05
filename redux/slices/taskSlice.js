import { createAsyncThunk, createSlice,nanoid } from "@reduxjs/toolkit";

//declaring initial state for redux slice
const initialState={
    apiTaskData:[],
    tasks:[]
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
  reducers: {
    saveTask: (state, action) => {
        //console.log(action.payload.title);
      const data = {
        id:nanoid(),
        title: action.payload.title,
        description:action.payload.desc
      };
      //console.log(data);
      state.tasks.push(data);
    },
    removeTask:(state,action)=>{
        const data=state.tasks.filter(item=>{
            return (action.payload!==item.id)
        })
        //console.log(data);
        state.tasks=data;
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(getAPITask.fulfilled,(state,action)=>{
      console.log(action)
      state.isloading=false,
      state.apiTaskData=action.payload
    })
  }
});

export const { saveTask,removeTask } = TaskSlice.actions;
export default TaskSlice.reducer;
