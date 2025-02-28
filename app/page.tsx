import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Home from "@/components/common/Home";

export default function page() {
  return (
    <>
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    </>
  );
}
