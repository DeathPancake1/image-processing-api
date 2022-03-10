import express from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const images: express.Router = express.Router();

images.get(
    '/',
    async (
        req : express.Request,
        res : express.Response
     ) =>{
        if (
            req.query.filename &&
            !isNaN(parseInt(req.query.width as string)) &&
            !isNaN(parseInt(req.query.height as string)) &&
            parseInt(req.query.width as string) > 1 &&
            parseInt(req.query.height as string) > 1
          ) {
            try {
              let thumbPath = path.join(__dirname, "../../../thumb/");
              let fullPath = path.join(__dirname, "../../../full/");
              if (fs.existsSync(fullPath + req.query.filename + ".jpg")) {
                try {
                  if(!fs.existsSync(thumbPath)){
                    fs.mkdirSync(thumbPath);
                  }
                  let thumbLocation: string=path.join(thumbPath, (req.query.filename as string) + "-"+req.query.width + "-" + req.query.height + ".jpg");
                  if(fs.existsSync(thumbLocation)){
                    res.sendFile(
                        thumbLocation
                      );
                  }
                  else{
                    sharp(fullPath + req.query.filename + ".jpg")
                    .resize(
                      parseInt(req.query.width as string),
                      parseInt(req.query.height as string)
                    )
                    .toFormat("jpg")
                    .toFile(thumbLocation).then(()=>{
                        res.sendFile(
                            thumbLocation
                          );
                    });
                  }
                } catch (err) {
                  console.log(err);
                  res.status(405).send("image couldn't be prcessed");
                }
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
    }
)
export default images;