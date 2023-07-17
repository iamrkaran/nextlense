import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid'; 
import { getUsername } from "@/utils/session";

// const fetchuser = async () => {
//   var username = await getUsername();
//   console.log(username);
// }
// fetchuser();

 
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
  const username = await getUsername();
  // console.log(username);
  const fileName = `images/${username}/${uuidv4()}.${fileExtension}`; 
  const uploadParams: PutObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: fileName, 
    Body: file,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("File uploaded successfully");
    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileName}`;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};

export default uploadFile;
