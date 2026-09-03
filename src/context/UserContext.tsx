import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface UserProps {
  email: string;
  password: string;
}

export interface UserContextProps {
  user: UserProps | null;
  setUser: Dispatch<SetStateAction<UserProps | null>>;
}

export const UserContext = createContext<UserContextProps | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Sign in");
  }

  return context;
};
