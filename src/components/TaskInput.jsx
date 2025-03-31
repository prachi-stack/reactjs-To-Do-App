import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, fetchWeatherRequest } from "../redux/taskSlice";

// TaskInput component for adding new tasks
const TaskInput = () => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [shouldAddTask, setShouldAddTask] = useState(false); // Flag to track task addition

  const dispatch = useDispatch();
  const { loading, weather } = useSelector((state) => state.tasks);

  const handleAddTask = () => {
    if (text.trim() === "") return;

    if (isOutdoor) {
      dispatch(fetchWeatherRequest());
      setShouldAddTask(true); // Wait for weather data
    } else {
      addNewTask(null);
    }
  };

  // Wait for weather data and then add the task
  useEffect(() => {
    if (shouldAddTask && !loading && weather !== null) {
      addNewTask(weather);
      setShouldAddTask(false); // Reset flag
    }
  }, [weather, loading, shouldAddTask]);

  const addNewTask = (weatherData) => {
    dispatch(
      addTask({
        id: Date.now(),
        text,
        priority,
        isOutdoor,
        weather: weatherData,
      })
    );

    setText("");
    setPriority("Medium");
    setIsOutdoor(false);
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-200 rounded-lg shadow-md mt-5 md:mt-9">
      <input
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 border rounded-md"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="High">High Priority 🔴</option>
        <option value="Medium">Medium Priority 🟡</option>
        <option value="Low">Low Priority 🟢</option>
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isOutdoor}
          onChange={(e) => setIsOutdoor(e.target.checked)}
        />
        Outdoor Activity
      </label>

      <button
        onClick={handleAddTask}
        className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        {loading ? "Fetching Weather..." : "Add Task"}
      </button>
    </div>
  );
};

export default TaskInput;
