import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid'; 

const REGION = process.env.NEXTLENSE_AWS_REGION!;
const BUCKET_NAME = process.env.NEXTLENSE_AWS_BUCKET_NAME!;

const s3Client = new S3Client({ 
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXTLENSE_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEXTLENSE_AWS_SECRET_KEY!,
  }
});

type FileBody = string | Uint8Array | Buffer | Readable; 


const uploadFile = async (file: FileBody, fileExtension: string ): Promise<string> => {
  const fileName = `images/${uuidv4()}.${fileExtension}`; 
  const uploadParams: PutObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: fileName, 
    Body: file,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("File uploaded successfully");
    // Create and return the URL of the uploaded object
    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileName}`;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};

export default uploadFile;
