import {S3} from 'aws-sdk';
import {
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
} from '@env';

export const DeleteFileHandler = async (fileKey, setPreview) => {
  try {
    const bucketName = AWS_BUCKET_NAME;
    const s3 = new S3({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: AWS_REGION,
    });

    const deleteParams = {
      Bucket: bucketName,
      Key: fileKey,
    };
    const deleteResponse = s3.deleteObject(deleteParams, (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        console.log(data);
        setPreview(false);
      }
    });
    //console.log('delete response => ', deleteResponse);
  } catch (error) {
    console.log(error);
  }
};
