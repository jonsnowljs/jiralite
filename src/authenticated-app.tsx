import { useAuth } from "context/AuthContext";
import { ProjectListScreen } from "screens/ProjectList";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <ProjectListScreen />
    </div>
  );
};
