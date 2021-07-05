import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import mongoose from "mongoose";
import app from "./app";
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION. Shutting down...");
  process.exit(1);
});
// const DBt:any = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );
const db = process.env.DATA;
const DB = `mongodb+srv://word:UfXi81NKOR7xcMP3DkVt@cluster0.xbhyy.mongodb.net/wordsapp?retryWrites=true&w=majority`;

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((con) => console.log("DB connection successfully"));

const port = process.env.PORT || 3000;
const server = app.listen(3000, () => {
  console.log("app running on " + port + " ...");
});
process.on("unhandledRejection", (err: any) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION. Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
