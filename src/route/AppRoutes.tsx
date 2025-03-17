import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "lucide-react";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = ({ authUser }: any) => {
  console.log({ authUser });
  const Loadable =
    (Component: React.LazyExoticComponent<React.FC>) => (props: any) =>
      (
        <Suspense fallback={<Loader className="animate-spin" />}>
          <Component {...props} />
        </Suspense>
      );
  const LoginPage = Loadable(lazy(() => import("@/pages/auth/LoginPage")));
  const SignUpPage = Loadable(lazy(() => import("@/pages/auth/SignUpPage")));
  const HomePage = Loadable(lazy(() => import("@/pages/app/HomePage")));
  const ChatPage = Loadable(lazy(() => import("@/pages/app/ChatPage")));
  const NotificationsPage = Loadable(
    lazy(() => import("@/pages/app/NotificationsPage"))
  );
  const SettingsPage = Loadable(lazy(() => import("@/pages/app/SettingsPage")));

  const routes: RouteObject[] = [
    { path: "/", element: <Navigate to="/auth" /> },
    {
      path: "auth/login",
      element: <LoginPage />,
    },
    {
      path: "auth/signup",
      element: <SignUpPage />,
    },
    {
      path: "app",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Navigate to="home" />,
        },
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "chat",
          element: <ChatPage />,
        },
        {
          path: "notifications",
          element: <NotificationsPage />,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
      ],
    },
  ];
  return useRoutes(routes);
};

export default AppRoutes;
