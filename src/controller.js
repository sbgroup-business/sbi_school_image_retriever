import { getImage, imageExists } from './shared/network/s3.js';
import NotFoundException from './shared/exceptions/not-found.exception.js';

export default class Controller {
  static async getImage(req, res) {
    const { key, contentType } = req.query;

    const exists = await imageExists(key);

    if (!exists) throw new NotFoundException('Image not found.');

    const encodedImage = await getImage(key);
    const image = Buffer.from(encodedImage, 'base64');

    res.writeHead(200, {
      'Content-Type': contentType || 'image/png',
      'Content-Length': image.length,
    });

    res.end(image);
  }

  static async downloadImage(req, res) {
    const { key } = req.query;

    const exists = await imageExists(key);

    if (!exists) throw new NotFoundException('Image not found.');

    const encodedImage = await getImage(key);
    const image = Buffer.from(encodedImage, 'base64');

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': image.length,
    });

    res.end(image);
  }
}
