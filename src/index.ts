import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app: Application = express();
app.use(morgan("dev"));
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`);
});
app.get("/images", (req: Request, res: Response) => {
  if (req.query.filename && req.query.width && req.query.height) {
    try {
      if (fs.existsSync("./full/" + req.query.filename + ".jpg")) {
        res.send("hello");
      } else {
        res.status(404).send("file doesn't exist");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    const message = "Parameter error";
    res.status(400).send(message);
  }
});
export default app;
