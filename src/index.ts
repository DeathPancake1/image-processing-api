import express, { Application, Request, response, Response } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import routes from "./routes/index";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app: Application = express();
app.use(morgan("dev"));
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`);
});
app.use(routes);
export default app;
