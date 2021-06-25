import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log("app running on " + port + " ...");
});
