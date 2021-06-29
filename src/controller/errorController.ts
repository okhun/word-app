const AppError3 = require("./../utils/appError");
const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError3(message, 400);
};
const handleDuplicateFieldsDB = (err: any) => {
  const message = `Duplicate field value: ${err.keyValue.name}, Please use another value!`;
  return new AppError3(message, 400);
};
const handleJWTError = (err: any) => {
  return new AppError3("Access token is missing or invalid", 401);
};
const handleJWTExpiredError = (err: any) => {
  return new AppError3("Access token is missing or invalid", 401);
};
const handleValError = () => {
  return new AppError3("Incorrect e-mail or password", 422);
};
const sendErrorDev = (err: any, res: any) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err: any, res: any) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({ status: err.status, message: err.msg });
  } else {
    //1) Log error
    // console.error("Error", err);
    //2) send error to client
    res
      .status(500)
      .json({ status: "error", message: "Some thing went very wrong" });
  }
};
module.exports = (err: any, req: any, res: any, next: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError(error);
    if (error?.errors?.email || error?.errors?.password)
      error = handleValError();

    sendErrorProd(error, res);
  }
};
