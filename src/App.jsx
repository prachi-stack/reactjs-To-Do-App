import { useSelector, useDispatch } from "react-redux";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import { logout } from "./redux/authSlice";

const App = () => {

  // Get the logged-in user from Redux store
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-900">
      {/*  App Header */}
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold text-white  bg-gray-900 shadow-md py-4 fixed top-0 left-0 w-full z-10">
        To-Do App
      </h1>

      {/*  Main Content Area */}
      <div className="pt-20 flex justify-center items-center">

        {/*  If user is logged in, show task management UI */}
        {user ? (
          <div className="w-full max-w-2xl p-4">
            <TaskInput />
            <TaskList />
            <div className="text-center">
              <button
                className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Login /> // If user is not logged in, show login form
        )}
      </div>
    </div>
  );
};

export default App;
