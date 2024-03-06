import { getImage, listSubdirectoriesInDirectory } from './shared/network/s3.js';
import resizeImage from './shared/util/image-transformer.js';

export default class Controller {
  static async getImage(req, res) {
    const { key, contentType } = req.query;

    const encodedImage = await getImage(key);
    const image = Buffer.from(encodedImage, 'base64');

    res.writeHead(200, {
      'Content-Type': contentType || 'image/png',
      'Content-Disposition': 'inline',
      'Content-Length': image.length,
    });

    res.end(image);
  }

  static async getResizedImage(req, res) {
    const { key, x1, y1, x2, y2, face_width: faceWidth, zoom } = req.query;

    

    const encodedImage = await getImage(key);
    const image = Buffer.from(encodedImage, 'base64');
    const resizedImage = await resizeImage(
      image,
      Number(x1),
      Number(y1),
      Number(x2),
      Number(y2),
      Number(zoom || 0),
      Number(faceWidth) || +process.env.FACE_WIDTH,
    );

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline',
      'Content-Length': resizedImage.length,
    });

    res.end(resizedImage);
  }

  static async downloadImage(req, res) {
    const { key } = req.query;

    const encodedImage = await getImage(key);
    const image = Buffer.from(encodedImage, 'base64');

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': image.length,
    });

    res.end(image);
  }

  static async getSubdirs(req, res) {
    const { key, bucket } = req.query;

    const subdirs = await listSubdirectoriesInDirectory(key, bucket);

    return res.status(200).json(subdirs);
  }
}
