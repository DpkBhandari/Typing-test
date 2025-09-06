import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields ❌");
      return;
    }

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters ⚠️");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/login",
        { email, password },
        { withCredentials: true } // only needed if backend sets cookies
      );

      if (res.status === 200) {
        toast.success(`Welcome ${res.data.name}! 🎉`);

        // Optionally save token for authenticated routes
        localStorage.setItem("token", res.data.token);

        // Clear form
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex items-center h-screen w-auto justify-center "
    >
      <div className="h-auto w-140 flex flex-col items-center justify-center p-6 m-4 gap-8 text-xl">
        <h1 className="text-3xl font-semibold">Login Now</h1>

        {/* Email */}
        <label htmlFor="email" className="text-xl font-normal w-full">
          Business Mail <sup className="text-red-600 text-xl">*</sup>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@work-email.com"
            className="border w-full rounded-sm p-4 placeholder:text-sm border-gray-400 outline-none mt-2 focus:border-blue-600"
          />
        </label>

        {/* Password */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-xl font-normal">
              Password <sup className="text-red-600 text-xl">*</sup>
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
              className="border w-full rounded-sm p-4 placeholder:text-sm border-gray-400 outline-none focus:border-blue-600 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 h-16 text-white rounded-md hover:bg-blue-800 text-center"
        >
          Login
        </button>
      </div>
    </form>
  );
}
