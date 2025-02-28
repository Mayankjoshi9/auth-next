"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/reducer/Store.ts";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!token) {
      router.replace("/login"); 
    } else {
      setIsChecking(false); 
    }
  }, [token, router]);

  if (isChecking) {
    return <div className="w-full h-screen flex items-center justify-center text-white">Loading...</div>; // Prevent flash
  }

  return <>{children}</>;
};

export default ProtectedRoute;
