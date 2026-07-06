import { useSelector } from "react-redux";

type AuthState = { auth: { user: unknown | null } };

export default function useUserAuth() {
  const { user } = useSelector((state: AuthState) => state.auth);

  return Boolean(user);
}
