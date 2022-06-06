import { createContext } from "react";

interface UserDataProps {
  userId: string;
  email: string;
  name: string;
  role: string;
  token: string;
}

const UserContext = createContext({
  userData: { userId: "", email: "", name: "", role: "", token: "" },
  setUserData: ({ userId, email, name, role, token }: UserDataProps) => {},
});

export default UserContext;
