"use client";
import { ReactNode, useEffect, useState } from "react";
import { UserContext, UserContextProps, UserProps } from "./UserContext";

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const storedCurrentUser = JSON.parse(currentUser);
      setUser(storedCurrentUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
