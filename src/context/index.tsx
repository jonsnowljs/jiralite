import React, { ReactNode } from "react";
import { AuthProvider } from "context/AuthContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
