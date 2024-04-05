import { IoIosClose } from "react-icons/io";

const TaskView = ({ closeTaskView, task }) => {
  return (
    <>
      <div className=" bg-white rounded-md top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] absolute shadow-2xl w-screen sm:w-[600px]">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center justify-between gap-2">
            <div
              className={` rounded-md p-1 text-white ${
                task.priority == "High"
                  ? "bg-red-500"
                  : task.priority == "Low"
                  ? "bg-red-400"
                  : "bg-red-300"
              }`}
            >
              {task.priority}
            </div>
            <div
              className={`rounded-md p-1 text-white ${
                task.category == "Pending"
                  ? "bg-blue-500"
                  : task.category == "In Progress"
                  ? "bg-green-300"
                  : "bg-green-500"
              }`}
            >
              {task.category}
            </div>
          </div>
          <IoIosClose
            onClick={closeTaskView}
            className="w-8 h-8 cursor-pointer hover:bg-red-500 rounded-full"
          />
        </div>

        <div className="p-2">
          <div className="text-5xl font-bold font-['cursive']">{task.title}</div>
          <div className="text-l py-2 font-['Georgia, serif']">{task.description}</div>
        </div>
      </div>
    </>
  );
};

export default TaskView;
