import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password regex same as backend Joi
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,18}$/;

  async function handleRegister(e) {
    e.preventDefault();

    // Basic field validation
    if (!fullName || !email || !password || !confirmPassword || !phone) {
      toast.error("Please fill all fields ❌");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number, special character and 8-18 chars ❌"
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      toast.error("Phone must be 10 digits ❌");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/register",
        { fullName, email, password, confirmPassword, phone },
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success("Account created successfully! 🎉");

        // Clear form
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhone("");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      className="flex items-center h-screen w-auto justify-center"
    >
      <div className="h-auto w-140 flex flex-col items-center justify-center p-6 m-4 gap-8 text-xl">
        <h1 className="text-3xl font-semibold">Start for free</h1>
        <p className="text-2xl font-medium text-gray-500">
          No credit card required
        </p>

        {/* Full Name */}
        <label htmlFor="name" className="text-xl font-normal w-full">
          Full Name <sup className="text-red-600 text-xl">*</sup>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="border w-full rounded-sm p-4 placeholder:text-sm border-gray-400 outline-none mt-2 focus:border-red-600"
          />
        </label>

        {/* Email */}
        <label htmlFor="email" className="text-xl font-normal w-full">
          Business Mail <sup className="text-red-600 text-xl">*</sup>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@work-email.com"
            className="border w-full rounded-sm p-4 placeholder:text-sm border-gray-400 outline-none mt-2 focus:border-red-600"
          />
        </label>

        {/* Password */}
        <label
          htmlFor="password"
          className="text-xl font-normal w-full relative"
        >
          Password <sup className="text-red-600 text-xl">*</sup>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8-18 chars with uppercase, lowercase, number, special char"
            className="border w-full rounded-sm p-4 placeholder:text-sm border-gray-400 outline-none mt-2 focus:border-red-600 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-xl right-10 top-[50%] transform -translate-y-1/2 text-gray-600 hover:text-black"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>

        {/* Confirm Password */}
        <label
          htmlFor="confirmPassword"
          className="text-xl font-normal w-full relative"
        >
          Confirm Password <sup className="text-red-600 text-xl">*</sup>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="border w-full rounded-sm p-4 placeholder:text-sm border-gray-400 outline-none mt-2 focus:border-red-600 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute text-xl right-10 top-[50%] transform -translate-y-1/2 text-gray-600 hover:text-black"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>

        {/* Phone */}
        <label htmlFor="phone" className="text-xl font-normal w-full">
          Mobile phone number <sup className="text-red-600 text-xl">*</sup>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="8082309239"
            className="border w-full rounded-sm p-4 placeholder:text-sm border-gray-400 outline-none mt-2 focus:border-red-600"
          />
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 h-16 text-white rounded-md hover:bg-red-800 text-center"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
