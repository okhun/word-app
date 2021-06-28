"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var AppError = require("./utils/appError");
var globalErrorHandler = require("./controller/errorController");
var app = express_1.default();
var wordRoutes = require("./routes/wordRoutes");
var userRoutes = require("./routes/userRoutes");
app.use(body_parser_1.default.json());
app.use("/api/v1/words", wordRoutes);
app.use("/api/v1/users", userRoutes);
app.all("*", function (req, res, next) {
  next(new AppError("Can't find " + req.originalUrl + " on this server", 404));
});
app.use(globalErrorHandler);
exports.default = app;
