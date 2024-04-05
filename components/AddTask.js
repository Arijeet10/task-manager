"use client";

import { addNewTask } from "@/app/requests/request";
//import { saveTask } from "@/redux/slices/taskSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoIosClose } from "react-icons/io";

const AddTask = ({ closeAddTask }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [taskData, setTaskData] = useState();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    await e.preventDefault();
    //dispatch(saveTask({ title, desc }));
    const res = await addNewTask({ title: title, description: desc });
    alert("Task submitted");
    setTitle("");
    setDesc("");
  };

  return (
    <>
      <div className=" top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] absolute shadow-2xl font-bold w-screen sm:w-[400px]">
        <div className=" rounded-t-lg bg-blue-400  flex items-center justify-between p-4 ">
          <div className="">Create a Task</div>
          <IoIosClose
            onClick={closeAddTask}
            className=" hover:bg-red-500 w-8 h-8 rounded-full"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-b-lg flex flex-col justify-center gap-4 p-4"
        >
          <div className="flex flex-col ">
            <label htmlFor="title">Title:</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              type="text"
              className="border border-black font-normal"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="desc">Description:</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              id="desc"
              type="text"
              className="border border-black font-normal"
              rows="8"
            />
          </div>
          <button className="bg-black hover:bg-green-500 hover:text-black text-white rounded-lg p-4">
            SAVE
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTask;
