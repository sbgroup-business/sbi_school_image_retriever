import {
  GetObjectCommand,
  HeadObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.REGION,
});

export async function imageExists(path) {
  const command = new HeadObjectCommand({
    Bucket: process.env.BUCKET,
    Key: path,
  });

  try {
    await client.send(command);

    return true;
  } catch (error) {
    if (error.$metadata.httpStatusCode === 404) {
      return false;
    }

    return false;
  }
}

export async function getImage(path) {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET,
    Key: path,
  });

  const response = await client.send(command);

  return response.Body.transformToString('base64');
}
