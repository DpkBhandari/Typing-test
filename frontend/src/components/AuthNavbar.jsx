import { Link } from "react-router-dom";
import Logo from "../assets/react.svg";

export default function AuthNavbar({ page }) {
  return (
    <div className="flex items-center justify-between p-6">
      <img src={Logo} alt="deepak logo" className="h-10" />

      {page === "login" ? (
        <Link
          to="/register"
          className="px-6 py-2 border border-gray-400 rounded-md font-semibold text-xl hover:bg-gray-100"
        >
          Register
        </Link>
      ) : (
        <Link
          to="/login"
          className="px-6 py-2 border border-gray-400 rounded-md font-semibold text-xl hover:bg-gray-100"
        >
          Login
        </Link>
      )}
    </div>
  );
}
