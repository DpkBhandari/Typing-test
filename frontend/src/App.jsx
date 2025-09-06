import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <div className="selection:bg-yellow-300 selection:text-black">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>

        {/* Toast container should be outside of Routes */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop={true}
          pauseOnHover
        />
      </div>
    </>
  );
}
