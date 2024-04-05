"use client";

import AddTask from "@/components/AddTask";
import ViewTasks from "@/components/ViewTasks";
import { useState } from "react";

const Home = () => {
  const [popUp, setPopUp] = useState(false); //for add task component
  const [backdrop,setBackdrop]=useState(false);

  //open add task component
  const handleAddTask = () => {
    setPopUp(true);
    setBackdrop(true);
  };
  //close add task component
  const closeAddTask = () => {
    setPopUp(false);
    setBackdrop(false);
  };

  //background backdrop open
  const openBackdrop=()=>{
    setBackdrop(true);
  }
  //background backdrop close
  const closeBackdrop=()=>{
    setBackdrop(false);
  }

  return (
    <>
      <div className="relative h-screen">
        <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between font-bold w-full">
          <div className="p-2 text-4xl text-center sm:text-7xl font-['cursive'] ">Task Manager</div>
          <button
            onClick={() => {
              handleAddTask();
            }}
            className={`fixed z-50 bottom-0 w-full sm:w-auto sm:static px-8 py-2  rounded-lg bg-black hover:bg-blue-500 text-white`}
          >
            New Task
          </button>
        </div>
        <div className="my-2 w-full border-t-2 border-black" />
        <div className="p-2">
        <ViewTasks />
        </div>
      </div>
      {backdrop && <div className="modal-backdrop" onClick={()=>closeBackdrop()} /> }
      {popUp && <AddTask closeAddTask={closeAddTask} />}
    </>
  );
};

export default Home;
