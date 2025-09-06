import { Outlet, useLocation } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

export default function AuthLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      {currentPath === "/login" ? (
        <AuthNavbar page="login" />
      ) : (
        <AuthNavbar page="register" />
      )}
      <Outlet />
    </div>
  );
}
