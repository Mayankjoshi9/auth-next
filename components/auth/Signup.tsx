"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const validate = () => {
    
    const missingFields = [];
    if (!username) missingFields.push("Username");
    if (!name) missingFields.push("Full Name");
    if (!email) missingFields.push("Email");
    if (!gender) missingFields.push("Gender");
    if (!password) missingFields.push("Password");
    if (!birthDate) missingFields.push("Birth Date");

    if (missingFields.length > 0) {
      setErrorMessage(`Missing fields: ${missingFields.join(", ")}`);
      return false;
    }
    

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return false;
    }

    if (!/(?=.*[A-Z])(?=.*[\W_])/.test(password)){
        setErrorMessage("Password must contain at least one uppercase letter and one special character");
        return false;
    }
    
      
    //  birthday should in past
    if (new Date(birthDate) >= new Date()) {
      setErrorMessage("Birth date must be in the past.");
      return false;
    }

    setErrorMessage("");

    return true;
  };


  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validate()) return;
   

    try {
      const response=await axios({
        method: 'post',
        url: "http://localhost:4000/api/v1/auth/signup",
        data: {
          username:username,
          name:name,
          email:email,
          password:password,
          gender:gender,
          birthday:birthDate,
          description:description,
        }
      });

      localStorage.setItem("token", response.data.token);
      router.push("/login");
    } catch (error) {
      console.log(error);
      setErrorMessage("Signup failed. Please try again.");
    }
  };


  
  return (
    <div className="w-full flex justify-center items-center bg-gray-900 overflow-y-auto">
      <div className="w-[90%] max-w-lg px-6 py-2  bg-gray-800 text-white rounded-lg shadow-lg h-full">
        <h1 className="text-xl font-bold text-gray-200 text-center mb-3">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-[16px]">
          {/* Two-Column Layout */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="text-gray-300">Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                className="p-2 w-full rounded-md border border-gray-600 bg-gray-700 text-white"
                placeholder="Username"
              />
            </div>
            <div className="w-1/2">
              <label className="text-gray-300">Full Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="p-2 w-full rounded-md border border-gray-600 bg-gray-700 text-white"
                placeholder="Full Name"
              />
            </div>
          </div>

          <label className="text-gray-300">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
            placeholder="Email"
          />

          <label className="text-gray-300">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
            placeholder="Password"
          />

          <label className="text-gray-300">Birth Date:</label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          />

          <label className="text-gray-300">Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="text-gray-300">Description (Optional):</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white max-h-[80px] h-[50px]"
            placeholder="Tell us about yourself"
          ></textarea>

          {errorMessage && (
            <p className="text-red-500 text-center text-sm -mb-3">{errorMessage}</p>
          )}

          <button type="submit" className="mt-3 bg-blue-600 hover:bg-blue-700 transition p-2 rounded-md text-white font-semibold">
            Sign Up
          </button>

          <p className="mt-2 text-gray-300 text-center">
            Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
