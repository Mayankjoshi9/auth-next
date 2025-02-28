"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/reducer/Store";

interface OpenRouteProps {
  children: ReactNode;
}

const OpenRoute: React.FC<OpenRouteProps> = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (token) {
      router.replace("/"); 
    } else {
      setIsChecking(false); 
    }
  }, [token, router]);

  if (isChecking) {
    return <div className="w-full h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return <>{children}</>;
};

export default OpenRoute;
