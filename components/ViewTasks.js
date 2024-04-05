"use client";

import { getAPITask, removeTask } from "@/redux/slices/taskSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditTask from "./EditTask";
import { deleteTask } from "@/app/requests/request";
import { FaEllipsisV } from "react-icons/fa";
import AssignTask from "./AssignTask";
import TaskView from "./TaskView";
import { MdOutlineDownloading } from "react-icons/md";

const ViewTasks = () => {
  const dispatch = useDispatch();

  const [taskID, setTaskID] = useState();
  const [editPopUp, setEditPopUp] = useState(false); //for edit task component
  const [assignPopUp, setAssignPopUp] = useState(false); //for assign task component
  const [editDel, setEditDel] = useState(false); //for edit delete option
  const [delPopUp, setDelPopUp] = useState(false); //for delete confirmation
  const [taskView, setTaskView] = useState(false); //view task data
  const [task, setTask] = useState({});

  const data = useSelector((data) => data.apiTaskData);
  const apiTaskData=data.tasks;
  console.log(apiTaskData);

  //open task view panel
  const handleTaskView = (task) => {
    setTask(task);
    setTaskView(true);
  };

  //close task view panel
  const closeTaskView = () => {
    setTask({});
    setTaskView(false);
  };

  //reset everything when background backdrop is clicked
  const handleBackdrop = () => {
    setEditDel(false);
    setAssignPopUp(false);
    setEditPopUp(false);
    setTaskView(false);
  };

  //open assign task component
  const handleAssignTask = (_id) => {
    setTaskID(_id);
    setAssignPopUp(true);
  };

  //close assign task component
  const closeAssignTask = () => {
    setTaskID("");
    setAssignPopUp(false);
  };

  //show edit delete option
  const handleEditDel = (_id) => {
    if (editDel) {
      setEditDel(false);
    } else {
      setTaskID(_id); //assign task id for edit or delete option
      setEditDel(true);
    }
  };

  //close the delete confirmation
  const closeDelete = () => {
    setDelPopUp(false);
  };

  //open delete task confirmation
  const handleDelete = (taskID) => {
    setTaskID(taskID);
    setEditDel(false);
    setDelPopUp(true);
  };

  //delete the task
  const confirmDelete = async (_id) => {
    setEditDel(false);
    await deleteTask({ _id });
    alert("Task Deleted");
    dispatch(getAPITask());
  };

  //opens edit task component
  const handleEdit = (taskID) => {
    setEditDel(false);
    if (taskID) {
      setEditPopUp(true);
    }
  };
  //closes edit task component
  const closeEditTask = () => {
    setTaskID("");
    setEditPopUp(false);
  };

  useEffect(() => {
    dispatch(getAPITask());
  }, []);

  return (
    <>
      <div className="">
        <div className="text-5xl p-4 text-center font-bold font-['cursive']">
          Saved Tasks
        </div>
        <div className=" grid grid-flow-row sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-4 ">
          {!apiTaskData ? (
            <MdOutlineDownloading 
              className="w-20 h-20 absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]"
            />
          ) : (
            apiTaskData.map((item, i) => {
              return (
                <div
                  key={i}
                  className="relative border border-black rounded-lg  flex flex-col justify-between max-h-96  p-4"
                >
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className={` rounded-md p-1 text-white ${
                          item.priority == "High"
                            ? "bg-red-500"
                            : item.priority == "Low"
                            ? "bg-red-400"
                            : "bg-red-300"
                        }`}
                      >
                        {item.priority}
                      </div>
                      <div
                        className={`rounded-md p-1 text-white ${
                          item.category == "Pending"
                            ? "bg-blue-500"
                            : item.category == "In Progress"
                            ? "bg-green-300"
                            : "bg-green-500"
                        }`}
                      >
                        {item.category}
                      </div>
                    </div>
                    <div className="">
                      <FaEllipsisV
                        className=" hover:bg-blue-300 rounded-lg p-1 w-5 h-5"
                        onClick={() => handleEditDel(item._id)}
                      />
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50">
                    <div className="text-2xl font-bold py-2">{item.title}</div>
                    <div className=" overflow-scroll hide-scrollbar max-h-28">
                      {item.description}
                    </div>
                  </div>
                  <div className="flex item-center justify-center gap-2">
                    <button
                      className="hover:bg-blue-500 bg-black text-white rounded-md w-full p-1"
                      onClick={() => handleAssignTask(item._id)}
                    >
                      Assign
                    </button>
                    <button
                      className="hover:bg-green-500 bg-black text-white rounded-md w-full p-1"
                      onClick={() => {
                        handleTaskView(item);
                      }}
                    >
                      View
                    </button>
                  </div>
                  {editDel && taskID == item._id && (
                    <div className="z-50 shadow-2xl absolute top-10 right-1 flex flex-col font-bold">
                      <button
                        onClick={() => handleEdit(taskID)}
                        className="bg-yellow-200 hover:bg-yellow-500 hover:text-white rounded-t-sm p-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(taskID)}
                        className="bg-red-200 hover:bg-red-500 hover:text-white rounded-b-sm p-2"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      {(editPopUp || assignPopUp || editDel || delPopUp || taskView) && (
        <div className="modal-backdrop" onClick={() => handleBackdrop()} />
      )}

      {taskView && <TaskView task={task} closeTaskView={closeTaskView} />}

      {editPopUp && (
        <EditTask
          apiTaskData={apiTaskData}
          taskID={taskID}
          closeEditTask={closeEditTask}
        />
      )}
      {assignPopUp && (
        <AssignTask
          apiTaskData={apiTaskData}
          taskID={taskID}
          closeAssignTask={closeAssignTask}
        />
      )}
      {delPopUp && (
        <div className="top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] absolute shadow-2xl w-screen sm:w-[500px] flex flex-col font-bold">
          <div className="rounded-t-lg  bg-blue-400 text-3xl  p-4 ">
            Delete Task
          </div>
          <div className="bg-white rounded-b-lg p-4">
            <div className="text-l font-normal my-4">
              Are you sure, you want to delete the task?
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => confirmDelete(taskID)}
                className="bg-black hover:bg-red-500 text-white rounded-md p-2 w-full"
              >
                Yes
              </button>
              <button
                onClick={() => closeDelete()}
                className="bg-black hover:bg-blue-500 text-white rounded-md p-2 w-full"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewTasks;
