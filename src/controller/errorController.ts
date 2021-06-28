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
  return new AppError3("", 400);
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
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    //1) Log error
    console.error("Error", err);
    //2) send error to client
    res
      .status(500)
      .json({ status: "error", message: "Some thing went very wrong" });
  }
};
module.exports = (
  err: {
    statusCode: number;
    status: string;
    message: string;
    stack: any;
    isOperational: Boolean;
    name: string;
    value: string;
    path: string;
    code: number;
    errmsg: string;
  },
  req: any,
  res: any,
  next: any
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    sendErrorProd(error, res);
  }
};
