import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import mongoose from "mongoose";
import app from "./app";

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );
const DB = `mongodb+srv://word:UfXi81NKOR7xcMP3DkVt@cluster0.xbhyy.mongodb.net/wordsapp?retryWrites=true&w=majority`;

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("DB connection successfully"));

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log("app running on " + port + " ...");
});
