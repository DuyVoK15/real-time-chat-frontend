import { useEffect } from "react";
import AppRoutes from "./route/AppRoutes";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

function App() {
  const { checkAuth, authUser, isCheckingAuth, onlineUsers } = useAuthStore();
  console.log({ onlineUsers });
  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <AppRoutes authUser={authUser} />
    </div>
  );
}

export default App;
