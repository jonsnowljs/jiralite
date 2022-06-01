import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuth } from "context/AuthContext";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
import { ErrorBoundary } from "components/ErrorBoundary";
import { FullPageErrorFallback } from "components/lib";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        <ReactQueryDevtools initialIsOpen={false} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
