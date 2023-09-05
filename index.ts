import * as Express from "express";
import * as Dotenv from "dotenv";

Dotenv.config();

const app: Express.Express = Express();
const port = process.env.PORT;

app.get("/", (_req, res) => {
  res.send("Home");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
