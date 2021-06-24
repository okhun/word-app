import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Salom Okhunjon");
});

app.listen(3000, () => console.log("app runining on port 3000"));
