import express from "express";
import bodyParser from "body-parser";
const app = express();
const wordRoutes = require("./routes/wordRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(bodyParser.json());
app.use("/api/v1/words", wordRoutes);
app.use("/api/v1/users", userRoutes);
export default app;
