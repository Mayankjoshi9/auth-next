"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/reducer/Store";
import { logout } from "@/reducer/Slices/authSlice";
import { CiLogout } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setIsHydrated(true); 
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${apiUrl}/api/v1/auth/logout`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(logout());
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="flex justify-between items-center h-15 pt-3 text-white relative shadow-sm font-mono">
        <Link href="/" className="pl-8">
          Logo
        </Link>
        <div className="flex gap-10 mr-10">
          {isHydrated && !token && (
            <Link href="/login" className="px-4 cursor-pointer">
              Login
            </Link>
          )}
          {isHydrated && !token && (
            <Link href="/signup" className="">
              Signup
            </Link>
          )}

          {isHydrated && token && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 p-2 text-white rounded-lg transition"
            >
              <FaRegUserCircle size="24" color="blue" />
              {isHydrated && user && <span>{user.name}</span>}
            </button>
          )}

          {isOpen && (
            <div className="absolute right-12 top-9 mt-2 w-40 bg-white border rounded-lg shadow-lg">
              <Link
                href="/edit-profile"
                onClick={() => setIsOpen(!isOpen)}
                className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-left"
              >
                Edit Profile
              </Link>
            </div>
          )}

          {isHydrated && token && (
            <button onClick={handleLogout} className="px-4 cursor-pointer">
              <CiLogout className="w-8 h-8 text-red-500" />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
