"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/reducer/Store";
import { setUser } from "@/reducer/Slices/authSlice"; // Redux action to update user
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const EditProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    birthday: user?.birthday.slice(0, 10) || "2009-11-12",
    gender: user?.gender || "Other",
    description: user?.description || "",
    email: user?.email || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/api/v1/user/profile",
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.success) {
       
        dispatch(setUser(response.data.user));
        toast.success("Profile updated successfully!");
        router.push("/");
      } else {
        toast("Failed to update profile!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setLoading(false);
  };

  return (
    
    <div className="w-full h-full flex justify-center items-center bg-gray-900 text-white overflow-y-auto">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 1000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 2000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-96 h-[750px] m-12">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 text-black rounded-md"
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 text-black rounded-md"
          disabled
        />

        <label className="block mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 text-black rounded-md"
          disabled
        />

        <label className="block mb-2">Birthday</label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          className="w-full p-2 mb-4 text-black rounded-md"
        />

        <label className="block mb-2">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 mb-4 text-black rounded-md"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 mb-4 text-black rounded-md"
          rows={3}
        />

        {token && (
          <button
            onClick={handleSave}
            className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded-md mb-4"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
