import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import APIException from '../exceptions/api-exception.js';

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.REGION,
});

export async function getImage(path) {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET,
      Key: path,
    });

    const response = await client.send(command);

    return response.Body.transformToString('base64');
  } catch (error) {
    throw new APIException(
      'Error getting image',
      error.$metadata.httpStatusCode || 500
    );
  }
}
