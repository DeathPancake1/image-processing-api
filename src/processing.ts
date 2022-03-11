import path from "path";
import sharp from "sharp";
import fs from "fs";

interface resizeParams {
  src: string;
  target: string;
  width: number;
  height: number;
}
const processImg = async (params: resizeParams): Promise<null | string> => {
  try {
    const thumbPath = path.join(__dirname, "../thumb/");
    if (!fs.existsSync(thumbPath)) {
      fs.mkdirSync(thumbPath);
    }
    console.log(path.resolve(params.target));
    await sharp(params.src)
      .resize(params.width, params.height)
      .toFormat("jpg")
      .toFile(params.target);
    return null;
  } catch (err) {
    console.log(err);
    return "Error processing image";
  }
};

export default processImg;
