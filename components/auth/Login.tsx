"use client";
import axios from "axios";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { setToken, setUser } from "@/reducer/Slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please fill in all the fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post<{ user: { id: string; name: string; email: string }; token: string }>(
        `${apiUrl}/api/v1/auth/login`,
        {
          username,
          password,
        }
      );
      
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-4">Login</h1>
        <p className="text-gray-400 text-center mb-6">
          Welcome back! Please enter your credentials.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-gray-300 mb-2">User Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
          
          <label className="text-gray-300 mt-4 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          
          <button
            type="submit"
            className={`mt-6 bg-blue-600 hover:bg-blue-700 transition duration-300 p-3 rounded-md font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          
          <p className="mt-4 text-center text-gray-400">
            Don&apos;t have an account? 
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 ml-1">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
