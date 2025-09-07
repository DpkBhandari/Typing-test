import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* 404 big text */}
      <h1 className="text-[100px] sm:text-[160px] md:text-[200px] lg:text-[260px] font-extrabold text-gray-400 leading-none animate-pulse">
        404
      </h1>

      {/* Message box */}
      <div className="flex flex-col items-center gap-6 mt-8 sm:mt-12 text-center">
        <p className="text-base sm:text-lg md:text-xl text-black max-w-md">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <p className="text-sm font-normal text-gray-700">
          Don’t worry, let’s get you back on track!
        </p>

        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-blue-600 text-white text-base sm:text-lg font-medium shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Back to Homepage <FaArrowRightLong className="animate-bounce" />
        </Link>
      </div>
    </div>
  );
}
