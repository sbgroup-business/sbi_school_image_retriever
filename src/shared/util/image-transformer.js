import sharp from 'sharp';

export default async function resizeImage(
  inputBuffer,
  x1,
  y1,
  x2,
  y2,
  zoom,
  faceWidth
) {
  const width = x2 - x1;
  const height = y2 - y1;

  const image = sharp(inputBuffer);
  const { width: originalWidth, height: originalHeight } =
    await image.metadata();

  const zoomedX1 = Math.max(Math.floor(x1 - width * zoom), 0);
  const zoomedY1 = Math.max(Math.floor(y1 - height * zoom), 0);
  const zoomedX2 = Math.min(Math.floor(x2 + width * zoom), originalWidth);
  const zoomedY2 = Math.min(Math.floor(y2 + height * zoom), originalHeight);

  return image
    .rotate()
    .extract({
      left: zoomedX1,
      top: zoomedY1,
      width: zoomedX2 - zoomedX1,
      height: zoomedY2 - zoomedY1,
    })
    .resize({ width: faceWidth })
    .toBuffer();
}
