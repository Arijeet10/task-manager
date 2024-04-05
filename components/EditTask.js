"use client";

import { updateTask } from "@/app/requests/request";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

const EditTask = ({ apiTaskData, taskID, closeEditTask }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("Pending");

  const task = apiTaskData.filter((item, i) => {
    return taskID == item._id;
  });
  const updationTask = task[0];



  const handleSubmit = async () => {
    await updateTask({
      _id: taskID,
      title,
      description: desc,
      priority,
      category,
    });
    alert("Task Updated");
    setTitle("");
    setDesc("");
    setPriority("");
    setCategory("");
  };

  return (
    <>
      <div className="top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] absolute shadow-2xl font-bold w-screen sm:w-[400px] ">
        <div className=" rounded-t-lg bg-blue-500  flex items-center justify-between p-4 ">
          <div className="">Edit Task</div>
          <IoIosClose
            onClick={closeEditTask}
            className=" hover:bg-red-500 w-8 h-8 rounded-full"
          />
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white flex flex-col p-4"
        >
          <div className="flex flex-col py-2">
            <span>Title:</span>
            <input
              defaultValue={updationTask.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-black font-normal"
            />
          </div>
          <div className="flex flex-col py-2">
            <span>Description:</span>
            <textarea
              defaultValue={updationTask.description}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border-black border font-normal"
              rows="8"
            />
          </div>
          <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between py-2">
            <div className="flex items-center justify-center gap-2">
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                defaultValue={updationTask.priority}
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
                defaultValue={updationTask.category}
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
            Update Task
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTask;
