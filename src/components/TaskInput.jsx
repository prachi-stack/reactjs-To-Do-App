import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, fetchWeatherRequest } from "../redux/taskSlice";

// TaskInput component for adding new tasks
const TaskInput = () => {
  // State for task text, priority, and outdoor status
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [isOutdoor, setIsOutdoor] = useState(false);
  const dispatch = useDispatch();
  const { loading, weather } = useSelector((state) => state.tasks);

  // Handle adding a new task
  const handleAddTask = () => {
    if (text.trim() === "") return; // Prevent empty task submission

    if (isOutdoor) {
      // Fetch weather before adding task
      dispatch(fetchWeatherRequest());
      setTimeout(() => {
        dispatch(
          addTask({
            id: Date.now(), // Unique task ID
            text,
            priority,
            isOutdoor,
            weather, // Assign fetched weather data
          })
        );
      }, 1000); // Delay to allow async weather update
    } else {
      dispatch(
        addTask({
          id: Date.now(),
          text,
          priority,
          isOutdoor,
          weather: null, // No weather data for indoor tasks
        })
      );
    }

    // Reset input fields after adding task
    setText("");
    setPriority("Medium");
    setIsOutdoor(false);
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-200 rounded-lg shadow-md mt-5 md:mt-9">
      {/* Input field for task text */}
      <input
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 border rounded-md"
      />

      {/* Dropdown for selecting priority */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="High">High Priority 🔴</option>
        <option value="Medium">Medium Priority 🟡</option>
        <option value="Low">Low Priority 🟢</option>
      </select>

      {/* Checkbox for marking as an outdoor activity */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isOutdoor}
          onChange={(e) => setIsOutdoor(e.target.checked)}
        />
        Outdoor Activity
      </label>

      {/* Button to add task, disabled while fetching weather */}
      <button
        onClick={handleAddTask}
        className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ${loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        disabled={loading}
      >
        {loading ? "Fetching Weather..." : "Add Task"}
      </button>
    </div>
  );
};

export default TaskInput;
