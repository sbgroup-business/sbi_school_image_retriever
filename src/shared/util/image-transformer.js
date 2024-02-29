import sharp from 'sharp';

export default async function resizeImage(
  inputBuffer,
  x1,
  y1,
  x2,
  y2,
  faceWidth
) {
  const width = x2 - x1;
  const height = y2 - y1;

  const image = sharp(inputBuffer);

  return image
    .extract({ left: x1, top: y1, width, height })
    .resize({ width: faceWidth })
    .toBuffer();
}
