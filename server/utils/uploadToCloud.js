import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
dotenv.config();
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: "keyfile.json",
});

const bucketName = process.env.GCP_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

// Route for handling file uploads
const uploadSingleFile = async (file, folderName, fileName) => {
  const filePath = `${folderName}/${fileName}`;
  const blob = bucket.file(filePath);
  const blobStream = blob.createWriteStream();

  return new Promise((resolve, reject) => {
    blobStream.on("error", (err) => {
      console.log(err);
      reject({ status: false, err });
    });
    blobStream.on("finish", async () => {
      const url = `https://storage.googleapis.com/${bucketName}/${filePath}`;
      resolve({ status: true, url });
    });
    blobStream.end(file.buffer);
  });
};

export default uploadSingleFile;
