import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../redux/taskSlice";
import { MdDelete } from "react-icons/md";

// TaskList component to display tasks
const TaskList = () => {
  // Get tasks from Redux store
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-5 mt-6 w-full max-w-3xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Your Tasks</h2>

      {/* Show message if there are no tasks */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center italic">No tasks added yet.</p>
      ) : (
        <ul className="space-y-4">
          {/* Loop through tasks and display each one */}
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div>
                {/* Task description */}
                <p className="text-lg font-medium text-gray-900">{task.text}</p>
                
                {/* Task priority */}
                <p className="text-sm text-gray-500">{task.priority} Priority</p>

                {/* Show weather info if the task is outdoor */}
                {task.isOutdoor && task.weather !== null && (
                  <span className="text-sm text-blue-600">🌤️ {task.weather}°C</span>
                )}
              </div>

              {/* Delete button to remove a task */}
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="text-gray-600 hover:text-red-500 transition"
              >
                <MdDelete size={22} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
