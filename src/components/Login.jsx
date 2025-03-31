import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import {
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    CircularProgress
} from "@mui/material";

// Login component for user authentication
const Login = () => {
    // State for email, password, error messages, and loading status
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // Handle login form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Validate input fields
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);

        // Simulate API request delay
        setTimeout(() => {
            dispatch(login({ email })); // Dispatch login action
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            {/* Card container for login form */}
            <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg shadow-lg">
                <CardContent className="p-6">
                    {/* Login heading */}
                    <Typography variant="h5" className="text-center font-semibold text-gray-800 mb-4">
                        Login
                    </Typography>

                    {/* Display error message if any */}
                    {error && <Typography className="text-red-500 text-sm text-center mb-2">{error}</Typography>}

                    {/* Login form */}
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        {/* Email input field */}
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white rounded"
                        />

                        {/* Password input field */}
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white rounded"
                        />

                        {/* Submit button with loading indicator */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="py-2"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
