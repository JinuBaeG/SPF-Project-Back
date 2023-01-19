import * as AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const uploadToAWS = async (files, userId, folderName) => {
  const promises = [];
  for (let i = 0; i < files.length; i++) {
    promises.push(await uploadToS3(files[i], userId, folderName));
  }

  return promises.map((imagePath) => ({
    where: { imagePath },
    create: { imagePath },
  }));
};

export const uploadToS3 = async (file, userId, folderName) => {
  try {
    const { filename, mimeType, encoding, createReadStream } = await file;
    const readStream = await createReadStream();
    const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const { Location } = await new AWS.S3()
      .upload({
        Bucket: "songym-uploads",
        Key: objectName,
        ACL: "public-read-write",
        Body: readStream,
      })
      .promise();
    return Location;
  } catch (e) {
    console.log(e);
  }
};
