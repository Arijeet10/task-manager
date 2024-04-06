"use client";

import { updateTask } from "@/app/requests/request";
import { getAPITask } from "@/redux/slices/taskSlice";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";


const AssignTask = ({ apiTaskData, taskID, closeAssignTask }) => {

  const dispatch = useDispatch();


  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("Pending");

  const task = apiTaskData.filter((item, i) => {
    return taskID == item._id;
  });
  const updationTask = task[0];



  const handleSubmit = async () => {
    await updateTask({ _id: taskID, priority, category });
    alert("Task Updated");
    setPriority("");
    setCategory("");
    dispatch(getAPITask());
  };

  return (
    <>
      <div className="top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] absolute shadow-2xl font-bold w-screen sm:w-[400px]">
        <div className=" rounded-t-lg bg-blue-500  flex items-center justify-between p-4 ">
          <div className="text-3xl font-[cursive] text-white">Edit Task</div>
          <IoIosClose
            onClick={closeAssignTask}
            className=" hover:bg-red-500 w-8 h-8 rounded-full"
          />
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white flex flex-col p-4"
        >
          <div className="flex flex-col py-2">
            {/* <span>Title:</span> */}
            <input
              value={updationTask.title}
              readOnly
              className="border-b focus:outline-none border-black font-bold"
            />
          </div>
          <div className="flex flex-col py-2">
            {/* <span>Description:</span> */}
            <textarea
              value={updationTask.description}
              readOnly
              className="p-1 focus:outline-none rounded-lg overflow-scroll hide-scrollbar italic border-black border font-normal"
              rows="8"
            />
          </div>
          <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between py-2">
            <div className="flex items-center justify-center gap-2">
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                onChange={(e) => setPriority(e.target.value)}
                className=" bg-yellow-300 hover:bg-white hover:border border-black rounded-md font-normal"
              >
                <option disabled>Choose</option>

                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex items-center justify-center gap-2">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                onChange={(e) => setCategory(e.target.value)}
                className=" bg-yellow-300 hover:bg-white hover:border border-black rounded-md font-normal"
              >
                <option disabled>Choose</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => handleSubmit()}
            className="bg-black text-white hover:bg-green-500 hover:text-white rounded-lg p-4"
          >
            Assign Task
          </button>
        </form>
      </div>
    </>
  );
};

export default AssignTask;
