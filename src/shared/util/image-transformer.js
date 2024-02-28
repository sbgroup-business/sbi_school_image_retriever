import sharp from 'sharp';

export default async function resizeImage(
  inputBuffer,
  x1,
  y1,
  x2,
  y2,
  size = 50
) {
  const width = x2 - x1;
  const height = y2 - y1;
  const zoom = 0.1;

  const image = sharp(inputBuffer);

  const zoomedX1 = Math.max(Math.floor(x1 - width * zoom), 0);
  const zoomedY1 = Math.max(Math.floor(y1 - height * zoom), 0);

  return image
    .extract({ left: zoomedX1, top: zoomedY1, width, height })
    .resize({ width: size })
    .toBuffer();
}
