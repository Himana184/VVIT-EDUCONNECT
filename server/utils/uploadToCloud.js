import { Storage } from "@google-cloud/storage";
import multer from "multer";

const storage = new Storage({
  projectId: "way-vaaradhi",
  keyFilename: "keyfile.json",
});

const bucketName = "vvit-educonnect-testing";
const bucket = storage.bucket(bucketName);

// Set up multer middleware for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// Route for handling file uploads
const uploadFiles = async (req, res) => {
  console.log(req.body);
  const files = req.files;

  if (!files) {
    return res.status(400).json({ message: "Files not received !" });
  }

  const fileUrls = [];
  try {
    // Loop through each file and upload it to Cloud Storage
    for (const file of files) {
      const fileName = `activities/${Date.now()}-${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file.");
      });

      stream.on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        fileUrls.push(publicUrl);
        // Once all files are uploaded, send back the list of public URLs
        if (fileUrls.length === files.length) {
          res.status(200).send(fileUrls);
        }
      });

      stream.end(file.buffer);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default uploadFiles;
