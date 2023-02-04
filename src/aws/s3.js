import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import {
  AWS_BUCKET_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_BUCKET_NAME,
} from "../config.js";
import fs from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

export async function uploadFile(file) {
  const stream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream,
  };
  const command = new PutObjectCommand(uploadParams);
  await client.send(command);
  return await getFileURL(uploadParams.Key);
}

export async function getFiles() {
  const command = new ListObjectsCommand({
    Bucket: AWS_BUCKET_NAME,
  });
  return await client.send(command);
}

export async function getFile(filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  return await client.send(command);
}

export async function downloadFile(filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  const result = await client.send(command);
  console.log(result);
  result.Body.pipe(fs.createWriteStream(`./images/${filename}`));
}

export async function getFileURL(filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  return await getSignedUrl(client, command, { expiresIn: 33600 });
}
