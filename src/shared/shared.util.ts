import * as AWS from "aws-sdk";
import { createWriteStream } from "fs";
import path from "path";
import { Request } from "express";
import multer from "multer";

// AWS S3 설정
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
});

// multer 설정 (로컬 파일 임시 저장)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// AWS S3에 파일 업로드 함수
export const uploadToAWS = async (
  files: Express.Multer.File[],
  userId: string,
  folderName: string
): Promise<string[]> => {
  const promises: Promise<string>[] = [];

  for (const file of files) {
    promises.push(uploadToS3(file, userId, folderName));
  }

  const imagePaths = await Promise.all(promises);

  return imagePaths; // imagePath만 반환
};



// AWS S3로 업로드 처리
export const uploadToS3 = async (
  file: Express.Multer.File,
  userId: string,
  folderName: string
): Promise<string> => {
  try {
    const objectName = `${folderName}/${userId}-${Date.now()}-${file.originalname}`;
    
    const { Location } = await new AWS.S3()
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: objectName,
        ACL: "public-read-write",
        Body: file.buffer, // buffer 사용
      })
      .promise();

    return Location;
  } catch (e) {
    console.error("Error uploading to S3:", e);
    throw new Error("Failed to upload file to S3");
  }
};

// 로컬 파일 저장 함수
export const uploadToLocals = async (
  files: Express.Multer.File[],
  sortation: string
): Promise<string[]> => {
  const promises: Promise<string>[] = [];

  for (const file of files) {
    promises.push(uploadToLocal(file, sortation));
  }

  return Promise.all(promises);
};

// 로컬 파일 저장 처리
export const uploadToLocal = async (
  file: Express.Multer.File,
  sortation: string
): Promise<string> => {
  try {
    const newFilename = `${Date.now()}-${file.originalname}`;
    const uploadPath = path.join(process.cwd(), "/uploads", sortation, newFilename);

    const writeStream = createWriteStream(uploadPath);
    writeStream.write(file.buffer); // buffer 사용
    writeStream.end();

    return `http://localhost:4000/uploads/${sortation}/${newFilename}`;
  } catch (e) {
    console.error("Error uploading to local:", e);
    throw new Error("Failed to upload file to local storage");
  }
};
