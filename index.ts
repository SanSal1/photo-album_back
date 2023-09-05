import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (_req, res) => {
  res.send("Home");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
