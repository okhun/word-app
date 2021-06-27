const sendErrorDev = (err: any, res: any) => {
  console.log(err.name);

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
  res
    .status(500)
    .json({ status: "error", message: "Some thing went very wrong" });
};
module.exports = (
  err: {
    statusCode: number;
    status: string;
    message: string;
    stack: any;
    isOperational: Boolean;
  },
  req: any,
  res: any,
  next: any
) => {
  console.log(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};
