import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Email Validation
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Phone Validation (10 digit)
  function isValidPhone(value) {
    return /^[0-9]{10}$/.test(value);
  }

  async function handleLogin(e) {
    e.preventDefault();

    if (!identifier || !password) {
      toast.error("Please fill all fields ❌");
      return;
    }

    if (!isValidEmail(identifier) && !isValidPhone(identifier)) {
      toast.error("Enter valid email or phone number ❌");
      return;
    }

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters ⚠️");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/v1/login",
        { identifier: identifier.trim(), password },
        { withCredentials: true }
      );

      setLoading(false);

      toast.success(`Welcome ${res.data.name}! 🎉`);
      localStorage.setItem("token", res.data.token);

      // Clear form
      setIdentifier("");
      setPassword("");
    } catch (err) {
      setLoading(false);

      if (err.response) {
        toast.error(
          err.response.data?.message || `Error: ${err.response.status}`
        );
      } else if (err.request) {
        toast.error("Too many requests. Please try again later ❌");
      } else {
        toast.error("Something went wrong ❌");
      }
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-md flex flex-col items-center justify-center bg-white p-6 sm:p-8 rounded-lg shadow-lg gap-6">
        <h1 className="text-2xl sm:text-3xl font-semibold">Login Now</h1>

        {/* Email / Phone */}
        <label
          htmlFor="identifier"
          className="text-base sm:text-lg font-normal w-full"
        >
          Email / Phone <sup className="text-red-600">*</sup>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter email or phone number"
            className="border w-full rounded-md p-3 sm:p-4 placeholder:text-sm border-gray-400 outline-none mt-2 focus:border-blue-600"
          />
        </label>

        {/* Password */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-base sm:text-lg font-normal"
            >
              Password <sup className="text-red-600">*</sup>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="border w-full rounded-md p-3 sm:p-4 placeholder:text-sm border-gray-400 outline-none focus:border-blue-600 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-lg sm:text-xl right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full h-12 sm:h-14 text-white rounded-md text-center text-lg sm:text-xl ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-800"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
