 import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../redux/taskSlice";
import { MdDelete } from "react-icons/md";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  // Function to get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600"; // Red for High priority
      case "Medium":
        return "text-yellow-500"; // Yellow for Medium priority
      case "Low":
        return "text-green-600"; // Green for Low priority
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-5 mt-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Your Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center italic">No tasks added yet.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">{task.text}</p>
                
                {/* Task Priority with Color */}
                <p className={`text-sm font-semibold ${getPriorityColor(task.priority)}`}>
                  {task.priority} Priority
                </p>

                {/* Weather Info for Outdoor Tasks */}
                {task.isOutdoor && task.weather !== null && (
                  <span className="text-sm text-blue-600">🌤️ {task.weather}°C</span>
                )}
              </div>

              {/* Delete Task Button */}
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
