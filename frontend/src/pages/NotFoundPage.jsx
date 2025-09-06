import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
      {/* 404 big text */}
      <h1 className="text-[120px] md:text-[200px] lg:text-[260px] font-extrabold text-gray-300 leading-none">
        404
      </h1>

      {/* Message box */}
      <div className="flex flex-col items-center gap-6 mt-[-40px]">
        <p className="text-lg md:text-xl text-gray-700 text-center">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-medium shadow-lg hover:bg-blue-700 transition-all duration-200"
        >
          Back to Homepage <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
}
