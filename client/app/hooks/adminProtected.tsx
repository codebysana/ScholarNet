"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

interface User {
  role?: string;
}

interface AuthState {
  user: User | null;
}

interface RootState {
  auth: AuthState;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || user?.role !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
}
