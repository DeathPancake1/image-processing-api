import express from "express";
import fs from "fs";
import path from "path";
import processImg from "../../processing";

const images: express.Router = express.Router();

interface Query {
  filename?: string;
  width?: string;
  height?: string;
}
const validate = async (query: Query): Promise<null | string> => {
  const fullPath = path.join(__dirname, "../../../full/");
  if (!query.filename) {
    return "enter a valid file name";
  }
  if (await !fs.existsSync(fullPath + query.filename + ".jpg")) {
    return "enter a valid file name";
  }
  if (!query.width || !query.height) {
    return "missing arguments";
  }
  const width: number = parseInt(query.width || "");
  if (Number.isNaN(width) || width < 1) {
    return "Please provide a positive numerical value for the 'width' query segment.";
  }

  const height: number = parseInt(query.height || "");
  if (Number.isNaN(height) || height < 1) {
    return "Please provide a positive numerical value for the 'height' query segment.";
  }
  return null;
};

images.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const validateMessage: null | string = await validate(req.query);
    if (validateMessage) {
      res.status(400).send(validateMessage);
      return;
    }
    const thumbPath = path.join(__dirname, "../../../thumb/");
    const fullPath = path.join(__dirname, "../../../full/");
    const param = {
      src: fullPath + req.query.filename + ".jpg",
      target:
        thumbPath +
        req.query.filename +
        "-" +
        req.query.width +
        "-" +
        req.query.height +
        ".jpg",
      width: parseInt(req.query.width as string),
      height: parseInt(req.query.height as string),
    };
    const thumbLocation: string = path.join(
      thumbPath,
      (req.query.filename as string) +
        "-" +
        req.query.width +
        "-" +
        req.query.height +
        ".jpg"
    );
    if (fs.existsSync(thumbLocation)) {
      res.sendFile(thumbLocation);
    } else {
      processImg(param).then((Response) => {
        if (!Response) {
          res
            .status(200)
            .sendFile(
              thumbPath +
                req.query.filename +
                "-" +
                req.query.width +
                "-" +
                req.query.height +
                ".jpg"
            );
        } else {
          res.status(400).send(Response);
        }
      });
    }
  }
);
export default images;
