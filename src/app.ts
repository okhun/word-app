import express from "express";
import bodyParser from "body-parser";
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const app = express();

const wordRoutes = require("./routes/wordRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(bodyParser.json());
app.use("/api/v1/words", wordRoutes);
app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
export default app;
