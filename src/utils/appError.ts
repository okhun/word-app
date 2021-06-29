class AppError extends Error {
  statusCode: any;
  isOperational: boolean;
  status: any;
  msg: any;
  constructor(message: string | undefined, statusCode: any) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.msg = message;
    // console.log(message);

    Error.captureStackTrace(AppError, this.constructor);
  }
}
module.exports = AppError;
