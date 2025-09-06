import config from "../config/config.js";

function globalErrorHandler(error, req, res, next) {
  const statusCode = error.status || 500;
  const errMessage = error.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errMessage,
    stack:
      config.phase?.toLowerCase() === "development" ? error.stack : undefined,
  });
}

export default globalErrorHandler;
