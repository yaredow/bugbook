"use client";

import { User, Session } from "lucia";
import { createContext, useContext } from "react";

type SessionContextProps = {
  user: User;
  session: Session;
};

const SessionContext = createContext<SessionContextProps | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContextProps }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within the session provider");
  }

  return context;
};
